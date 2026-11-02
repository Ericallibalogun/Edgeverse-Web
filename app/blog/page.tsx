import type { Metadata } from "next";
import Newsletter from "@/components/Newsletter";
import { PageHero, PostCard, Serif, WaChannelButton } from "@/components/ui";
import { insights } from "@/lib/insights";

export const metadata: Metadata = {
  title: "Blog & News",
  description: "News, announcements and blog posts from EBSL (Edgeverve Business Solutions), Lagos.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  const posts = [...insights].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero title={<>Blog &amp; <Serif>news.</Serif></>} eyebrow="Media" crumbs={[{ label: "Media", href: "/insights" }, { label: "Blog & News" }]}
        lead="Announcements, product launches and stories from the EBSL team." actions={<WaChannelButton />} />
      <section className="section"><div className="container grid grid-3">{posts.map((p) => <PostCard key={p.slug} p={p} h="h2" />)}</div></section>
      <Newsletter />
    </>
  );
}
