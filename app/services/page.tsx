import { photo } from "@/lib/photos";
import type { Metadata } from "next";
import Link from "next/link";
import Icon, { Arrow } from "@/components/Icon";
import { CtaBand, d, PageHero, Serif } from "@/components/ui";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "IT Services: Infrastructure, Consulting, Cybersecurity, AI & More",
  description: "Nine practices, one accountable partner: infrastructure, consulting, cybersecurity, managed services, procurement, training, software, Agentic AI and Phlyp Pay.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <>
      <PageHero media={{ ...photo("datacentre-engineers"), tag: { title: "Nine practices", sub: "One accountable team" }, tags: ["Infrastructure", "Security", "AI"] }} title={<>Every capability your <Serif>technology</Serif> needs.</>} eyebrow="Services" crumbs={[{ label: "Services" }]}
        lead="Nine practices, one accountable partner. Pick a starting point, or tell us the problem and we'll assemble the team."
        actions={<Link className="btn" href="/service-request">Get Started <Arrow /></Link>} />
      <section className="section" aria-label="Service catalogue">
        <div className="container grid grid-3">
          {services.map((s, i) => (
            <article className="card reveal" style={d((i % 3) * 80)} key={s.slug}>
              <span className="svc-icon"><Icon name={s.icon} /></span>
              <h2 className="h3">{s.name}{s.isNew && <> <span className="badge-new">New</span></>}</h2>
              <p>{s.short}</p>
              <div className="row" style={{ marginTop: "auto", justifyContent: "space-between" }}>
                <Link className="link-arrow" href={s.href}>Learn More<span className="sr-only"> about {s.name}</span> <Icon name="arrow" /></Link>
                <Link className="btn btn--sm" href={`/service-request?service=${encodeURIComponent(s.name.split(" (")[0])}`}>
                  Get Started<span className="sr-only"> with {s.name}</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
