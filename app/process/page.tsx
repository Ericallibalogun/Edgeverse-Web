import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import { CtaBand, d, PageHero, Serif } from "@/components/ui";
import { processSteps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Process: ITIL, Lean Six Sigma, MOF & Balanced Scorecard",
  description: "The six globally recognised frameworks under every EBSL engagement, and what each one does for your business.",
  alternates: { canonical: "/process" },
};

export default function Process() {
  return (
    <>
      <PageHero title={<>Our process: we <Serif>architect</Serif> transformation.</>} eyebrow="Methodology"
        lead="Six globally recognised frameworks sit underneath every EBSL engagement. Here's what each one does for you."
        crumbs={[{ label: "Services", href: "/services" }, { label: "Our process" }]} />
      <section className="section">
        <div className="container grid grid-2">
          {processSteps.map((p, i) => (
            <article className="card reveal" id={p.slug} style={{ ...d((i % 2) * 80), scrollMarginTop: 120 }} key={p.slug}>
              <span className="svc-icon"><Icon name={p.icon} /></span>
              <h2 className="h3">{p.title}</h2>
              <p>{p.body}</p>
              <Link className="link-arrow" href="/consultation">Discuss with a consultant <Icon name="arrow" /></Link>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
