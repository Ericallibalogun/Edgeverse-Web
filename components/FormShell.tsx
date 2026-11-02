import type { ReactNode } from "react";
import Icon from "./Icon";
import { PageHero } from "./ui";
import { site, waChat } from "@/lib/site";

/** Shared layout for form pages: hero, reassurance column, form card. */
export default function FormShell({ title, lead, crumb, eyebrow, points, children }: {
  title: ReactNode; lead: string; crumb: string; eyebrow: string; points: string[]; children: ReactNode;
}) {
  return (
    <>
      <PageHero title={title} lead={lead} eyebrow={eyebrow} crumbs={[{ label: crumb }]} />
      <section className="section section--tint" style={{ paddingTop: "clamp(48px, 6vw, 80px)" }}>
        <div className="container split">
          <aside className="reveal" aria-label="What happens next">
            <h2 className="h3">What happens next</h2>
            <ol className="cap-list" style={{ marginTop: 16 }}>{points.map((p) => <li key={p}>{p}</li>)}</ol>
            <div className="contact-tiles">
              <a className="contact-tile" href={waChat} target="_blank" rel="noopener noreferrer">
                <span className="svc-icon" style={{ background: "#DCFCE7", color: "var(--wa-dark)" }}><Icon name="whatsapp" /></span>
                <span><small>Prefer to chat?</small><strong>WhatsApp {site.phone}</strong></span>
              </a>
              <a className="contact-tile" href={`mailto:${site.email}`}>
                <span className="svc-icon"><Icon name="mail" /></span><span><small>Email us</small><strong>{site.email}</strong></span>
              </a>
            </div>
          </aside>
          <div className="form-card reveal" style={{ ["--d" as string]: "120ms" }}>{children}</div>
        </div>
      </section>
    </>
  );
}
