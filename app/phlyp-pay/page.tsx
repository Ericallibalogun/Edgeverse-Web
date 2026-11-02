import type { Metadata } from "next";
import Icon, { Arrow, type IconName } from "@/components/Icon";
import { EbslForm, Field } from "@/components/Form";
import { d, PageHero, QrCard, SectionHead, Serif, Split } from "@/components/ui";

export const metadata: Metadata = {
  title: "Phlyp Pay: Fast, Secure, QR-Powered Payments",
  description: "Accept payments instantly with a simple QR scan. No POS terminal, no app download. Request early access to Phlyp Pay by EBSL.",
  alternates: { canonical: "/phlyp-pay" },
};

const features: [IconName, string][] = [
  ["bell", "Instant Payment Notification"], ["phone-dev", "Works on Any Device"], ["x", "No App Download Needed"],
  ["lock", "Bank-Level Encryption"], ["dashboard", "Business Dashboard"], ["chart", "Real-Time Reporting"],
];
const steps = [
  ["Generate your Phlyp Pay QR code", "Sign up, verify your business and get a unique code for your counter, table or invoice."],
  ["Customer scans with any phone camera", "No app to install. The camera opens a secure checkout in the browser."],
  ["Payment confirmed instantly", "You and your customer both receive a notification with a unique reference."],
];

export default function PhlypPay() {
  return (
    <>
      <PageHero title={<>Phlyp Pay: <Serif>fast, secure,</Serif> QR-powered payments.</>}
        eyebrow={<><span className="badge-new">New</span>&nbsp; Phlyp Pay</>}
        lead="Accept payments instantly with a simple QR scan. No POS terminal needed."
        crumbs={[{ label: "Services", href: "/services" }, { label: "Phlyp Pay" }]}
        actions={<>
          <a className="btn" href="#access" data-magnetic>Request Access <Arrow /></a>
          <a className="btn btn--outline-light" href="#how">How it works</a>
        </>} />

      <section className="section" id="how" aria-labelledby="how-h">
        <div className="container">
          <SectionHead eyebrow="How it works" id="how-h" title="Three steps. Zero hardware." />
          <div className="steps">
            {steps.map(([t, x], i) => <article className="card reveal" style={d(i * 80)} key={t}><h3>{t}</h3><p className="mb-0">{x}</p></article>)}
          </div>
        </div>
      </section>

      <section className="section spot-pay" aria-labelledby="qr-h">
        <div className="container split split--even">
          <div>
            <p className="eyebrow">Try it</p>
            <Split className="h2" id="qr-h">Try a test scan.</Split>
            <p className="lead reveal">Point your phone camera at the code to see the Phlyp Pay flow. The production EBSL code will appear here at launch.</p>
            <p className="notice reveal">QR payment portal currently in final development. Request early access below.</p>
          </div>
          {/* TODO(EBSL): swap the sample pattern for the real Phlyp Pay QR image (spec §6.2). */}
          <div className="reveal" style={{ padding: 24 }}><QrCard label="Try a Test Scan" note="Sample code shown. Final EBSL code coming soon." /></div>
        </div>
      </section>

      <section className="section" aria-labelledby="feat-h">
        <div className="container">
          <SectionHead eyebrow="Features" id="feat-h" title="Built for businesses that move fast." />
          <div className="grid grid-3">
            {features.map(([ic, t], i) => (
              <article className="card reveal" style={d((i % 3) * 80)} key={t}><span className="svc-icon"><Icon name={ic} /></span><h3 className="mb-0">{t}</h3></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" id="access" aria-labelledby="acc-h" style={{ scrollMarginTop: 96 }}>
        <div className="container split">
          <div>
            <p className="eyebrow">Early access</p>
            <Split className="h2" id="acc-h">Request access.</Split>
            <p className="lead reveal">Join the first businesses accepting payments with Phlyp Pay. We&apos;ll confirm by email and get you onboarded.</p>
          </div>
          <div className="form-card reveal">
            <EbslForm kind="phlyp-access" submitLabel="Request Access"
              success="Thanks, you're on the Phlyp Pay early-access list. Check your email for confirmation.">
              <Field name="business_name" label="Business name" auto="organization" />
              <Field name="full_name" label="Contact name" auto="name" />
              <Field name="email" label="Email" type="email" auto="email" />
              <Field name="phone" label="Phone" type="tel" auto="tel" />
              <Field name="business_type" label="Business type" full
                options={["Restaurant / Hospitality", "Retail", "School / Education", "NGO / Non-profit", "Healthcare", "Events", "Other"]} />
              <Field name="message" label="Message" type="textarea" required={false} full placeholder="Expected monthly volume, locations, anything we should know" />
            </EbslForm>
          </div>
        </div>
      </section>
    </>
  );
}
