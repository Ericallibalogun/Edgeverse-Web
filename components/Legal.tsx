import type { ReactNode } from "react";
import { PageHero } from "./ui";

export default function Legal({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero title={title} lead={`Last updated ${updated}.`} crumbs={[{ label: title }]} />
      <section className="section"><div className="container"><div className="prose mx-auto">{children}</div></div></section>
    </>
  );
}
