/**
 * Unified form handler for every site form (spec §7).
 * Sends a structured notification to the EBSL team and a branded confirmation to the user.
 * Transport: ZeptoMail (ZEPTO_TOKEN) or Resend (RESEND_API_KEY). Newsletter also syncs to Brevo when configured.
 */
import { NextResponse } from "next/server";
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
const FROM = () => env("MAIL_FROM", "no-reply@edgevervebs.org");
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
    `<table width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #E2E8F0;border-radius:12px;border-collapse:separate">${rows}</table>`);
  const userIntro = kind === "newsletter"
    ? "You're subscribed to EBSL insights. Expect practical notes on infrastructure, security and AI, and no spam."
    : `Hi ${esc(data.full_name)}, thanks for reaching out. Our team has received your <strong>${form.title.toLowerCase()}</strong> and will respond within one business day.`;
  const userHtml = template("We've received your request", userIntro,
    `<p style="margin:0;color:#5A6577;font-size:14px">Need us sooner? Chat with us on WhatsApp: <a href="https://wa.me/${site.whatsappNumber}" style="color:#0066CC">${site.phone}</a></p>`);

  const to = kind === "careers" ? env("HR_EMAIL", TEAM()) : TEAM();
  const sent = await sendMail({ to, subject: `[Website] ${form.title}${data.full_name ? `: ${data.full_name}` : ""}`, html: teamHtml, replyTo: data.email, attachment });
  if (!sent) return fail(502, "We couldn't send your request right now.");
  await sendMail({ to: data.email, subject: `EBSL: ${form.title} received`, html: userHtml, replyTo: TEAM() });
  return NextResponse.json({ ok: true });
}

async function sendMail({ to, subject, html, replyTo, attachment }: { to: string; subject: string; html: string; replyTo: string; attachment?: Attachment }) {
  try {
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
    console.error("[forms] No email provider configured (set ZEPTO_TOKEN or RESEND_API_KEY).");
    return false;
  } catch (e) {
    console.error("[forms] send failed", e);
    return false;
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

function template(heading: string, intro: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#F4F8FC;font-family:Segoe UI,Helvetica,Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F8FC;padding:32px 12px"><tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden">
<tr><td style="background:#001A33;padding:28px 32px"><img src="${site.url}/img/logo-light.png" alt="Edgeverve Business Solutions" height="36" style="display:block;height:36px"></td></tr>
<tr><td style="padding:32px"><h1 style="margin:0 0 12px;font-size:22px;color:#0B1526">${heading}</h1><p style="margin:0 0 24px;color:#333B48;font-size:15px;line-height:1.6">${intro}</p>${body}</td></tr>
<tr><td style="background:#E8F4FF;padding:20px 32px;color:#5A6577;font-size:12px">${esc(site.address)} · ${site.email}</td></tr>
</table></td></tr></table></body></html>`;
}
