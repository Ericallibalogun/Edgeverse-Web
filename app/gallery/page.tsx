import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import Filter from "@/components/Filter";
import { PageHero, Serif, WaChannelButton } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery: Photos & Video",
  description: "Photos and video from EBSL events, projects, training sessions and offices.",
  alternates: { canonical: "/gallery" },
};

// TODO(EBSL): add real photos to public/img/gallery and list them here (spec §11).
const items: { cat: string; caption: string; src?: string; art?: "a" | "b" | "c" }[] = [
  { cat: "Projects", caption: "Client working session", src: "/img/team-meeting.webp" },
  { cat: "Events", caption: "Event photos coming soon", art: "a" },
  { cat: "Training", caption: "Learning Academy cohort (coming soon)", art: "c" },
  { cat: "Offices", caption: "EBSL Towers, Lekki (coming soon)", art: "b" },
  { cat: "Projects", caption: "Infrastructure deployment (coming soon)", art: "a" },
  { cat: "Events", caption: "Product launch (coming soon)", art: "b" },
];

export default function Gallery() {
  return (
    <>
      <PageHero title={<>Inside <Serif>EBSL.</Serif></>} eyebrow="Gallery" crumbs={[{ label: "Media", href: "/insights" }, { label: "Gallery" }]}
        lead="Events, projects, training and the team. Follow along for the latest photos and video."
        actions={<>
          <WaChannelButton />
          <a className="btn btn--outline-light" href={site.social.instagram} target="_blank" rel="noopener noreferrer"><Icon name="instagram" /> Instagram</a>
          <a className="btn btn--outline-light" href={site.social.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="linkedin" /> LinkedIn</a>
        </>} />
      <section className="section">
        <div className="container">
          <Filter label="Filter gallery" options={["Events", "Projects", "Training", "Offices"]} className="gallery">
            {items.map((it, i) => (
              <figure key={i} data-cat={it.cat.toLowerCase()} className="reveal">
                {it.src
                  ? <Image src={it.src} alt={it.caption} width={488} height={624} sizes="(max-width: 640px) 100vw, 33vw" />
                  : <div className={`art art--${it.art}`} role="img" aria-label={it.caption} />}
                <figcaption>{it.caption}</figcaption>
              </figure>
            ))}
          </Filter>
        </div>
      </section>
    </>
  );
}
