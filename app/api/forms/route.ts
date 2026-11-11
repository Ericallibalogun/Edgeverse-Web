/**
 * Unified form handler for every site form (spec §7).
 * Sends a structured notification to the EBSL team and a branded confirmation to the user.
 * Transport, first one configured wins: SMTP (the company mailbox, e.g. on Reinhost), ZeptoMail (ZEPTO_TOKEN)
 * or Resend (RESEND_API_KEY). Newsletter also syncs to Brevo when configured.
 */
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const FORMS = {
  "service-request": { title: "Service Request", fields: ["service", "full_name", "company", "email", "phone", "contact_method", "message"] },
  demo: { title: "Demo Booking", fields: ["product", "full_name", "email", "phone", "company", "industry", "date", "time", "message"] },
  consultation: { title: "Consultation Booking", fields: ["type", "full_name", "company", "email", "phone", "availability", "message"] },
  training: { title: "Training Enrolment", fields: ["course", "full_name", "email", "phone", "company", "level", "candidates", "training_type"] },
  careers: { title: "Job Application", fields: ["full_name", "email", "phone", "position", "cover_letter"] },
  contact: { title: "Contact Enquiry", fields: ["full_name", "email", "phone", "subject", "message"] },
  "phlyp-access": { title: "Phlyp Pay Access Request", fields: ["business_name", "full_name", "email", "phone", "business_type", "message"] },
  newsletter: { title: "Newsletter Subscription", fields: ["email"] },
} as const;
type Kind = keyof typeof FORMS;

const env = (k: string, d = "") => process.env[k] || d;
const TEAM = () => env("TEAM_EMAIL", site.email);
// With SMTP the sender must be the mailbox that logs in, so it defaults to SMTP_USER.
const FROM = () => env("MAIL_FROM", env("SMTP_USER", "no-reply@edgevervebs.org"));
const FROM_NAME = () => env("MAIL_FROM_NAME", "EBSL");

// Best-effort in-memory rate limit (per server instance): 5 submissions / 10 min / IP
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => t > now - 600_000);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

const fail = (status: number, error: string) => NextResponse.json({ ok: false, error }, { status });
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type Attachment = { name: string; mime: string; content: string };

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  let fd: FormData;
  try { fd = await req.formData(); } catch { return fail(400, "Invalid submission."); }

  // Anti-spam: honeypot + minimum fill time; pretend success to bots
  if (String(fd.get("company_website") ?? "")) return NextResponse.json({ ok: true });
  const t = Number(fd.get("_t") ?? 0);
  if (t && Date.now() - t < 3000) return NextResponse.json({ ok: true });
  if (limited(ip)) return fail(429, "Too many submissions. Please try again shortly.");

  // Images in the emails load from the site that sent them (Vercel today, edgevervebs.org later).
  const origin = new URL(req.url).origin;
  const kind = String(fd.get("_form") ?? "") as Kind;
  const form = FORMS[kind];
  if (!form) return fail(400, "Unknown form.");

  const data: Record<string, string> = {};
  for (const f of form.fields) {
    const max = f === "message" || f === "cover_letter" ? 5000 : 300;
    data[f] = String(fd.get(f) ?? "").trim().slice(0, max);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) return fail(422, "Please provide a valid email address.");
  if (kind !== "newsletter" && !data.full_name) return fail(422, "Please provide your name.");

  let attachment: Attachment | undefined;
  if (kind === "careers") {
    const file = fd.get("cv");
    if (!(file instanceof File) || file.size === 0) return fail(422, "Please attach your CV.");
    if (file.size > 5 * 1024 * 1024) return fail(422, "CV must be 5MB or smaller.");
    const ok = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!ok.includes(file.type) || !/\.(pdf|docx?)$/i.test(file.name)) return fail(422, "CV must be a PDF or Word document.");
    attachment = { name: file.name.replace(/[^\w.\-]/g, "_"), mime: file.type, content: Buffer.from(await file.arrayBuffer()).toString("base64") };
  }

  if (kind === "newsletter") await brevoSubscribe(data.email);

  const rows = Object.entries(data).filter(([, v]) => v).map(([k, v]) =>
    `<tr><td style="padding:10px 14px;border-bottom:1px solid #E2E8F0;color:#5A6577;font-size:13px;text-transform:capitalize;width:38%">${esc(k.replace(/_/g, " "))}</td>` +
    `<td style="padding:10px 14px;border-bottom:1px solid #E2E8F0;color:#0B1526;font-size:14px">${esc(v).replace(/\n/g, "<br>")}</td></tr>`).join("");
  const teamHtml = template(`New ${form.title}`, `A new <strong>${form.title}</strong> was submitted on ${site.url.replace("https://", "")}.`,
    `<table width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #E2E8F0;border-radius:12px;border-collapse:separate">${rows}</table>`, origin);
  const note = confirmation(kind, data);
  const steps = note.steps.length
    ? `<p style="margin:0 0 8px;color:#0B1526;font-size:14px;font-weight:600">What happens next</p><ol style="margin:0 0 24px;padding-left:20px;color:#333B48;font-size:14px;line-height:1.7">${note.steps.map((x) => `<li>${x}</li>`).join("")}</ol>`
    : "";
  const userHtml = template(note.heading, note.intro,
    `${steps}<p style="margin:0;color:#5A6577;font-size:14px">Need us sooner? Chat with us on WhatsApp: <a href="https://wa.me/${site.whatsappNumber}" style="color:#0066CC">${site.phone}</a></p>`, origin);

  const to = kind === "careers" ? env("HR_EMAIL", TEAM()) : TEAM();
  const sent = await sendMail({ to, subject: `[Website] ${form.title}${data.full_name ? `: ${data.full_name}` : ""}`, html: teamHtml, replyTo: data.email, attachment });
  if (!sent) return fail(502, "We couldn't send your request right now.");
  await sendMail({ to: data.email, subject: note.subject, html: userHtml, replyTo: TEAM() });
  return NextResponse.json({ ok: true });
}

async function sendMail({ to, subject, html, replyTo, attachment }: { to: string; subject: string; html: string; replyTo: string; attachment?: Attachment }) {
  try {
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const port = Number(env("SMTP_PORT", "465"));
      const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST, port, secure: port === 465,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transport.sendMail({
        from: { name: FROM_NAME(), address: FROM() }, to, replyTo, subject, html,
        ...(attachment && { attachments: [{ filename: attachment.name, contentType: attachment.mime, content: attachment.content, encoding: "base64" }] }),
      });
      return true;
    }
    if (process.env.ZEPTO_TOKEN) {
      const r = await fetch("https://api.zeptomail.com/v1.1/email", {
        method: "POST",
        headers: { Authorization: process.env.ZEPTO_TOKEN, "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          from: { address: FROM(), name: FROM_NAME() }, to: [{ email_address: { address: to } }], reply_to: [{ address: replyTo }],
          subject, htmlbody: html, ...(attachment && { attachments: [{ name: attachment.name, mime_type: attachment.mime, content: attachment.content }] }),
        }),
      });
      return r.ok;
    }
    if (process.env.RESEND_API_KEY) {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: `${FROM_NAME()} <${FROM()}>`, to: [to], reply_to: replyTo, subject, html,
          ...(attachment && { attachments: [{ filename: attachment.name, content: attachment.content }] }),
        }),
      });
      return r.ok;
    }
    // No transport configured: log in development so forms are testable locally.
    if (process.env.NODE_ENV !== "production") { console.info(`[forms] (no email provider) → ${to}: ${subject}`); return true; }
    console.error("[forms] No email provider configured (set SMTP_HOST/SMTP_USER/SMTP_PASS, ZEPTO_TOKEN or RESEND_API_KEY).");
    return false;
  } catch (e) {
    console.error("[forms] send failed", e);
    return false;
  }
}

/** The confirmation each person receives, worded for the form they filled in. Values are escaped. */
function confirmation(kind: Kind, d: Record<string, string>) {
  const v = (k: string, fallback = "") => (d[k] ? esc(d[k]) : fallback);
  const hi = d.full_name ? `Hi ${esc(d.full_name.split(" ")[0])}, ` : "";
  const by = d.contact_method ? ` by ${esc(d.contact_method.toLowerCase())}` : "";
  switch (kind) {
    case "contact": return {
      subject: "We've received your message | EBSL", heading: "Thanks for getting in touch",
      intro: `${hi}we've received your message${d.subject ? ` about <strong>${v("subject")}</strong>` : ""}. A member of our team will reply within one business day.`,
      steps: [] };
    case "service-request": return {
      subject: `Your ${d.service ? `${d.service} ` : ""}request is in | EBSL`, heading: "Your service request is in",
      intro: `${hi}thank you for choosing EBSL. We've received your request${d.service ? ` for <strong>${v("service")}</strong>` : ""}.`,
      steps: ["A specialist reviews your requirements.", `We contact you${by} within one business day to scope the work.`, "You receive a clear proposal and quote, with no obligation."] };
    case "consultation": return {
      subject: "Your free consultation request | EBSL", heading: "Your consultation request is in",
      intro: `${hi}thanks for booking a free consultation${d.type ? ` (<strong>${v("type")}</strong>)` : ""}. It's free and there's no obligation.`,
      steps: [`We confirm a time${d.availability ? ` based on your availability (${v("availability")})` : ""} within one business day.`, "A consultant reviews your notes before the call.", "On the call, we map where your IT is and where it needs to be."] };
    case "demo": return {
      subject: `Your ${d.product ? `${d.product} ` : ""}demo request | EBSL`, heading: `Your ${d.product ? `${v("product")} ` : ""}demo request is in`,
      intro: `${hi}thanks for booking a demo${d.date ? ` for <strong>${v("date")}${d.time ? `, ${v("time")}` : ""}</strong>` : ""}.`,
      steps: ["We confirm the date and time with you by email.", `We tailor the demo to ${d.industry ? `the <strong>${v("industry")}</strong> industry` : "your industry"} and your workflows.`, "You see it running live and can ask anything."] };
    case "training": return {
      subject: `Your enrolment${d.course ? ` for ${d.course}` : ""} | EBSL Learning Academy`, heading: "Your enrolment is received",
      intro: `${hi}thanks for enrolling${d.course ? ` in <strong>${v("course")}</strong>` : ""} with the EBSL Learning Academy${d.candidates ? ` for ${v("candidates")} candidate(s)` : ""}.`,
      steps: ["Our Learning Academy team reviews your enrolment.", `We send the schedule, fees and joining details${d.training_type ? ` for ${v("training_type").toLowerCase()} training` : ""}.`, "You confirm your place and get ready to start."] };
    case "careers": return {
      subject: `Your application${d.position ? ` for ${d.position}` : ""} | EBSL Careers`, heading: "Thanks for applying",
      intro: `${hi}thank you for your interest in EBSL. We've received your application${d.position ? ` for <strong>${v("position")}</strong>` : ""} and your CV.`,
      steps: ["Our HR team reviews every application.", "If your profile matches the role, we contact you to arrange next steps.", "We keep your CV on file for suitable future roles."] };
    case "phlyp-access": return {
      subject: "Your Phlyp Pay access request | EBSL", heading: "Your Phlyp Pay request is in",
      intro: `${hi}thanks for your interest in Phlyp Pay${d.business_name ? ` for <strong>${v("business_name")}</strong>` : ""}.`,
      steps: ["Our payments team reviews your business details.", "We contact you to verify your business and set up your account.", "You start accepting QR payments, with no POS terminal needed."] };
    case "newsletter": return {
      subject: "You're subscribed to EBSL insights", heading: "You're subscribed",
      intro: "Thanks for subscribing. Expect one email a month with practical notes on infrastructure, security and AI, and no spam.",
      steps: [] };
  }
}

async function brevoSubscribe(email: string) {
  const key = process.env.BREVO_API_KEY, list = process.env.BREVO_LIST_ID;
  if (!key || !list) return;
  await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "api-key": key, "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ email, listIds: [Number(list)], updateEnabled: true }),
  }).catch((e) => console.error("[forms] brevo failed", e));
}

function template(heading: string, intro: string, body: string, origin: string) {
  return `<!doctype html><html><body style="margin:0;background:#F4F8FC;font-family:Segoe UI,Helvetica,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F8FC;padding:32px 12px"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden">
<tr><td style="background:#001A33;padding:28px 32px"><img src="${origin}/img/logo-light.png" alt="Edgeverve Business Solutions" height="36" style="display:block;height:36px"></td></tr>
<tr><td style="padding:32px"><h1 style="margin:0 0 12px;font-size:22px;color:#0B1526">${heading}</h1><p style="margin:0 0 24px;color:#333B48;font-size:15px;line-height:1.6">${intro}</p>${body}</td></tr>
<tr><td style="background:#E8F4FF;padding:20px 32px;color:#5A6577;font-size:12px">${esc(site.address)} · ${site.email}</td></tr>
</table></td></tr></table></body></html>`;
}
