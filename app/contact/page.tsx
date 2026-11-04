import { photo } from "@/lib/photos";
import type { Metadata } from "next";
import Icon from "@/components/Icon";
import { EbslForm, Field } from "@/components/Form";
import { PageHero, Serif } from "@/components/ui";
import { site, waChat } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact EBSL | Lekki, Lagos",
  description: `Contact EBSL at ${site.address}. Call ${site.phone}, email ${site.email} or chat on WhatsApp.`,
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  const tiles = [
    { icon: "phone" as const, small: "Call us", strong: site.phone, href: `tel:${site.phoneHref}` },
    { icon: "mail" as const, small: "Email us", strong: site.email, href: `mailto:${site.email}` },
    { icon: "whatsapp" as const, small: "WhatsApp", strong: "Chat with our team", href: waChat, ext: true },
    { icon: "pin" as const, small: "Visit us", strong: site.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`, ext: true },
  ];
  return (
    <>
      <PageHero media={{ ...photo("lekki-bridge"), size: "band", tag: { title: "EBSL Towers", sub: "17C Saliu Aina Lawal Way, Lekki" }, tags: [site.phone] }} title={<>Let&apos;s <Serif>talk.</Serif></>} eyebrow="Contact" crumbs={[{ label: "Contact" }]}
        lead="Questions, partnerships or a project in mind: reach us however suits you. We reply within one business day." />
      <section className="section section--tint" style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="container split">
          <div className="reveal">
            <div className="contact-tiles">
              {tiles.map((t) => (
                <a key={t.small} className="contact-tile" href={t.href} {...(t.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  <span className="svc-icon"><Icon name={t.icon} /></span><span><small>{t.small}</small><strong>{t.strong}</strong></span>
                </a>
              ))}
            </div>
            <iframe className="map-embed mt-m" title="Map showing EBSL Towers, Lekki, Lagos" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`} />
          </div>
          <div className="form-card reveal">
            <h2 className="h3">Send us a message</h2>
            <EbslForm kind="contact" submitLabel="Send Message" prefill={{ subject: "subject" }}
              success="Message received. We've emailed you a confirmation and will reply within one business day.">
              <Field name="full_name" label="Full name" auto="name" />
              <Field name="email" label="Email" type="email" auto="email" />
              <Field name="phone" label="Phone" type="tel" auto="tel" required={false} />
              <Field name="subject" label="Subject" options={["General enquiry", "Partnership", "Support", "Media", "Other"]} />
              <Field name="message" label="Message" type="textarea" full />
            </EbslForm>
          </div>
        </div>
      </section>
    </>
  );
}
