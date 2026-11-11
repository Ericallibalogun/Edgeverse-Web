import { photo } from "@/lib/photos";
import type { Metadata } from "next";
import Filter from "@/components/Filter";
import Newsletter from "@/components/Newsletter";
import { PageHero, PostCard, Serif, WaChatButton } from "@/components/ui";
import { insights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Insights & Case Studies",
  description: "Case studies, insights and news from EBSL on infrastructure, cybersecurity, IT service management and agentic AI in Nigeria.",
  alternates: { canonical: "/insights" },
};

export default function Insights() {
  return (
    <>
      <PageHero media={{ ...photo("optic-fibre"), size: "band", tag: { title: "Insights", sub: "Case studies, notes and news" } }} title={<>Insights &amp; <Serif>case studies.</Serif></>} eyebrow="Media" crumbs={[{ label: "Insights" }]}
        lead="What we're learning from the field: practical notes on infrastructure, security, service management and AI." actions={<WaChatButton />} />
      <section className="section">
        <div className="container">
          <Filter label="Filter insights" options={["Case study", "Insight", "News"]}>
            {insights.map((p) => <PostCard key={p.slug} p={p} h="h2" />)}
          </Filter>
        </div>
      </section>
      <Newsletter />
    </>
  );
}
