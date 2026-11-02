import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/Icon";
import { CtaBand, PageHero, PostCard } from "@/components/ui";
import { insights } from "@/lib/insights";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export const generateStaticParams = () => insights.map((i) => ({ slug: i.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = insights.find((i) => i.slug === slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, alternates: { canonical: `/insights/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.summary, publishedTime: p.date } };
}

export default async function Article({ params }: Props) {
  const { slug } = await params;
  const p = insights.find((i) => i.slug === slug);
  if (!p) notFound();
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: p.title, description: p.summary, datePublished: p.date,
    author: { "@type": "Organization", name: site.name }, publisher: { "@type": "Organization", name: site.name } };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <PageHero title={p.title} lead={p.summary} eyebrow={`${p.tag} · ${p.read} read`}
        crumbs={[{ label: "Insights", href: "/insights" }, { label: p.tag }]} />
      <article className="section">
        <div className="container">
          <div className="prose mx-auto">
            <p className="post-meta"><time dateTime={p.date}>{new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time></p>
            {p.body.map((b, i) =>
              b.h ? <h2 key={i}>{b.h}</h2>
              : b.list ? <ul key={i}>{b.list.map((l) => <li key={l}>{l}</li>)}</ul>
              : b.quote ? <blockquote key={i}>{b.quote}</blockquote>
              : <p key={i}>{b.p}</p>)}
            <div className="row mt-m">
              <Link className="btn" href="/consultation">Book a Free Consultation <Arrow /></Link>
              <Link className="btn btn--outline" href="/insights">All insights</Link>
            </div>
          </div>
        </div>
      </article>
      <section className="section section--tint" aria-labelledby="more-h">
        <div className="container">
          <h2 className="h2" id="more-h">Keep reading</h2>
          <div className="grid grid-2 mt-m">{insights.filter((i) => i.slug !== slug).map((x) => <PostCard key={x.slug} p={x} />)}</div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
