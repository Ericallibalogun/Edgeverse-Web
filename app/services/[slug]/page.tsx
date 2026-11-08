import { servicesHero } from "@/lib/generated";
import type { Metadata } from "next";
import Link from "@/components/IntentLink";
import { notFound } from "next/navigation";
import Icon, { Arrow } from "@/components/Icon";
import { CtaBand, d, Faq, FeatureList, PageHero, SectionHead, Split, SvcCards } from "@/components/ui";
import { serviceDetail } from "@/lib/service-detail";
import { site, svc, waChat } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(serviceDetail).map((slug) => ({ slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = svc(slug);
  return { title: `${s.name} in Lagos, Nigeria`, description: `${s.short} ${serviceDetail[slug].lead}`.slice(0, 158), alternates: { canonical: s.href } };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const det = serviceDetail[slug];
  if (!det) notFound();
  const s = svc(slug);
  const others = ["infrastructure", "consulting", "cybersecurity", "outsourcing", "procurement", "training", "software", "agentic-ai"].filter((k) => k !== slug).slice(0, 4);
  const ld = { "@context": "https://schema.org", "@type": "Service", name: s.name, description: s.short, provider: { "@type": "Organization", name: site.name }, areaServed: "NG" };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero media={{ ...servicesHero, tag: { title: s.name, sub: "EBSL service" }, tags: ["Lekki, Lagos"] }} title={det.title} lead={det.lead} eyebrow={s.name} crumbs={[{ label: "Services", href: "/services" }, { label: s.name }]}
        actions={<>
          <Link className="btn" href={det.cta.href}>{det.cta.label} <Arrow /></Link>
          <a className="btn btn--outline-light" href={waChat} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" /> WhatsApp us</a>
        </>} />

      <section className="section" aria-labelledby="off-h">
        <div className="container">
          <SectionHead eyebrow="What's included" id="off-h" title="What we deliver." />
          <div className="grid grid-3">
            {det.offer.map((o, i) => (
              <article className="card reveal" style={d((i % 3) * 80)} key={o.title}>
                <span className="svc-icon"><Icon name={o.icon} /></span><h3>{o.title}</h3><p className="mb-0">{o.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="out-h">
        <div className="container split split--even">
          <div>
            <Split className="h2" id="out-h">What changes for you.</Split>
            <div className="mt-m reveal"><FeatureList items={det.outcomes} /></div>
            <Link className="btn mt-m reveal" href={det.cta.href}>{det.cta.label} <Arrow /></Link>
          </div>
          <div className="reveal">
            <h2 className="h3">Frequently asked</h2>
            <Faq items={det.faq} />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="more-h">
        <div className="container">
          <SectionHead eyebrow="Related" id="more-h" title="Explore more services."
            aside={<Link className="btn btn--outline" href="/services">All services <Arrow /></Link>} />
          <SvcCards slugs={others} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
