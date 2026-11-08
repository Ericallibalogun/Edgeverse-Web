import { servicesHero } from "@/lib/generated";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "@/components/IntentLink";
import Icon from "@/components/Icon";
import { CtaBand, d } from "@/components/ui";
import { services, site } from "@/lib/site";

const stat = (i: number) => site.stats[i];

export const metadata: Metadata = {
  title: "IT Services: Infrastructure, Consulting, Cybersecurity, AI & More",
  description: "Nine practices, one accountable partner: infrastructure, consulting, cybersecurity, managed services, procurement, training, software, Agentic AI and Phlyp Pay.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <>
      {/* Centred hero filling the first screen: headline, then a photo with stat cards and service tags cut into its corners */}
      <section className="hero svc-hero" aria-labelledby="svc-hero-h">
        <div className="container">
          <h1 className="hero-title intro" id="svc-hero-h">Every capability your technology needs.</h1>
          <p className="lead intro" style={d(80)}>Nine practices, one accountable partner. Pick a starting point, or tell us the problem and we&apos;ll assemble the team.</p>
          <div className="svc-stage intro" style={d(200)}>
            <figure className="svc-photo" data-parallax="">
              <Image src={servicesHero.src} alt={servicesHero.alt} fill priority sizes="(max-width: 900px) 100vw, 80vw" style={{ objectFit: "cover" }} />
            </figure>
            <div className="svc-card svc-card--tl"><b>{stat(1).value}{stat(1).suffix}</b><span>{stat(1).label}</span></div>
            <div className="svc-card svc-card--tr"><b>{stat(3).value}{stat(3).suffix}</b><span>{stat(3).label}</span></div>
            <div className="svc-card svc-card--bl"><b>{stat(2).value}{stat(2).suffix}</b><span>{stat(2).label}</span></div>
            <ul className="svc-card svc-tags" aria-label="Our services">
              {services.map((s) => <li key={s.slug}><Link href={s.href}>{s.name.split(" (")[0].replace(" & Advisory", "").replace(" Solutions", "").replace(" QR Payments", "").replace(" & Learning Academy", "")}</Link></li>)}
            </ul>
          </div>
        </div>
      </section>
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
