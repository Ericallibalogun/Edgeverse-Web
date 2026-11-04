import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import Icon, { Arrow } from "./Icon";
import { partners, partnerWords, services, site, svc, type Service } from "@/lib/site";
import type { Insight } from "@/lib/insights";

/** Section or page headline. One face, one colour; it fades in with its section. */
export function Split({ as: Tag = "h2", className, id, children }: { as?: "h1" | "h2"; className?: string; id?: string; children: ReactNode }) {
  return <Tag className={`${className ?? ""} reveal`} id={id}>{children}</Tag>;
}

/** Kept for existing call sites: emphasis now comes from the words, not a second typeface. */
export const Serif = ({ children }: { children: string }) => <>{children}</>;

/** Former decorative hero background (orbs, grid, noise). Intentionally renders nothing now. */
export function HeroBg(_: { orbs?: number }) {
  return null;
}

export const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export type HeroMedia = {
  /** Photo for the frame, or `node` for a live product fragment on a navy field. */
  src?: string; alt?: string; node?: ReactNode;
  /** Product fragment laid over the photo, bottom-right. */
  overlay?: ReactNode;
  /** Notched tab in the frame's top-left corner, and small tags notched into the top-right. */
  tag?: { title: string; sub?: string }; tags?: string[];
  size?: "tall" | "band" | "auto"; position?: string; priority?: boolean;
};

/** Large round-cornered picture with a label tab and tags cut into its top corners. */
export function HeroFrame({ media }: { media: HeroMedia }) {
  const { src, alt = "", node, overlay, tag, tags = [], size = "tall", position, priority } = media;
  return (
    <figure className={`hero-frame hero-frame--${size}${node ? " hero-frame--ui" : ""} reveal`} style={d(200)}>
      {src && <Image src={src} alt={alt} fill priority={priority} sizes="100vw" style={{ objectFit: "cover", objectPosition: position }} />}
      {node && <div className="hero-frame-ui">{node}</div>}
      {overlay && <div className="hero-frame-ui--corner">{overlay}</div>}
      {tag && (
        <figcaption className="frame-tab frame-tab--tl">
          <span className="frame-mark" aria-hidden="true"><Image src="/img/favicon.png" alt="" width={22} height={22} /></span>
          <span><b>{tag.title}</b>{tag.sub && <small>{tag.sub}</small>}</span>
        </figcaption>
      )}
      {tags.length > 0 && (
        <ul className="frame-tab frame-tab--tr" aria-label="Tags">
          {tags.map((t) => <li key={t}>{t}</li>)}
        </ul>
      )}
    </figure>
  );
}

export function HeroTop({ title, lead, actions, crumbs, id }: {
  title: ReactNode; lead: ReactNode; actions?: ReactNode; crumbs?: { label: string; href?: string }[]; id?: string;
}) {
  return (
    <>
      {crumbs && (
        <nav aria-label="Breadcrumb" className="crumbs-pill reveal">
          <ol className="crumbs">
            <li><Link href="/">Home</Link></li>
            {crumbs.map((c) => <li key={c.label} aria-current={c.href ? undefined : "page"}>{c.href ? <Link href={c.href}>{c.label}</Link> : c.label}</li>)}
          </ol>
        </nav>
      )}
      <div className="hero-top">
        <Split as="h1" className="hero-title" id={id}>{title}</Split>
        <div className="hero-side">
          <p className="lead reveal" style={d(80)}>{lead}</p>
          {actions && <div className="hero-actions reveal" style={d(160)}>{actions}</div>}
        </div>
      </div>
    </>
  );
}

export function PageHero({ title, lead, crumbs, actions, media }: {
  title: ReactNode; lead: ReactNode; crumbs: { label: string; href?: string }[];
  eyebrow?: ReactNode; actions?: ReactNode; aside?: ReactNode; media?: HeroMedia;
}) {
  return (
    <section className={`hero page-hero${media && !media.node ? " hero-fill" : ""}`}>
      <div className="container">
        <HeroTop title={title} lead={lead} actions={actions} crumbs={crumbs} />
        {media && <HeroFrame media={{ priority: true, ...media }} />}
      </div>
    </section>
  );
}

export function CtaBand({ title = "Tell us where you want your IT to be.",
  lead = "We'll map the infrastructure, security and people to get you there, and quote it plainly.",
  primary = { label: "Book a Free Consultation", href: "/consultation" } }: { title?: ReactNode; lead?: string; primary?: { label: string; href: string } }) {
  return (
    <section className="section section--tight">
      <div className="container">
        <div className="cta-band">
          <div>
            <Split className="h2">{title}</Split>
            <p className="lead reveal" style={d(80)}>{lead}</p>
          </div>
          <div className="hero-actions reveal" style={d(160)}>
            <Link className="btn btn--light" href={primary.href}>{primary.label} <Arrow /></Link>
            <Link className="btn btn--outline-light" href="/demo">Book a Demo</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHead({ title, id, aside, lead }: { eyebrow?: ReactNode; title: ReactNode; id?: string; aside?: ReactNode; lead?: ReactNode }) {
  return (
    <div className="section-head">
      <div>
        <Split className="h2" id={id}>{title}</Split>
        {lead && <p className="lead reveal" style={d(80)}>{lead}</p>}
      </div>
      {aside}
    </div>
  );
}

export const WaChannelButton = ({ className = "" }: { className?: string }) => (
  <a className={`btn btn--wa ${className}`} href={site.social.whatsappChannel} target="_blank" rel="noopener noreferrer">
    <Icon name="whatsapp" /> Join Our WhatsApp TV Channel<span className="sr-only"> (opens in new tab)</span>
  </a>
);

/** Services as a list set in large type: name, one line, and the whole row links to the page. */
export function SvcCards({ slugs }: { slugs?: string[] }) {
  const list: Service[] = slugs ? slugs.map(svc) : services.filter((s) => s.slug !== "software");
  return (
    <ul className="svc-list">
      {list.map((s, i) => (
        <li className="reveal" style={d((i % 4) * 60)} key={s.slug}>
          <Link className="svc-row" href={s.href}>
            <span className="svc-name">{s.name.split(" (")[0]}{s.isNew && <span className="new-tag"> New</span>}</span>
            <span className="svc-short">{s.short}</span>
            <span className="svc-go" aria-hidden="true"><Icon name="arrow" /></span>
            <span className="sr-only">Learn more about {s.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Static row of OEM partner logos (spec §4.7), with names for those not yet supplied as files. */
export function PartnersMarquee() {
  return (
    <ul className="partner-row" aria-label="OEM partners">
      {partners.map((p) => (
        <li key={p.key}><Image className="logo-item" src={`/img/${p.key}.webp`} alt={p.name} width={163} height={52} /></li>
      ))}
      {partnerWords.map((w) => <li key={w}><span className="logo-text">{w}</span></li>)}
    </ul>
  );
}

export function LogoWall() {
  return (
    <ul className="logo-wall" aria-label="OEM partners">
      {partners.map((p) => (
        <li key={p.key}><Image src={`/img/${p.key}.webp`} alt={`${p.name} logo`} width={163} height={52} /></li>
      ))}
      {["Huawei", "Kaspersky", "Palo Alto", "Check Point"].map((w) => (
        <li key={w}><span className="logo-word">{w}</span></li>
      ))}
    </ul>
  );
}

/** Client logos (supplied with EBSL's go-ahead). Shown on a navy field: the files are the light versions. */
export const clients = [
  { key: "unilag", name: "University of Lagos", w: 274 },
  { key: "meristem", name: "Meristem Securities", w: 484 },
  { key: "elizade", name: "Elizade Nigeria", w: 364 },
];

export function TrustedBy() {
  return (
    <section className="trusted" aria-labelledby="trusted-h">
      <div className="container trusted-inner">
        <h2 className="trusted-title reveal" id="trusted-h">Trusted by teams at University of Lagos, Meristem and Elizade.</h2>
        <ul className="client-row reveal" style={d(80)}>
          {clients.map((c) => (
            <li key={c.key} className={`client-${c.key}`}><Image src={`/img/clients/${c.key}.webp`} alt={c.name} width={c.w} height={120} /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AiVisual() {
  const nodes: [number, number, string][] = [[260, 70, "Plan"], [440, 190, "Decide"], [420, 380, "Act"], [260, 450, "Verify"], [100, 380, "Learn"], [80, 190, "Report"]];
  const font = "Plus Jakarta Sans, sans-serif";
  return (
    <div className="ai-visual" aria-hidden="true">
      <svg viewBox="0 0 520 520">
        <circle className="ring" cx="260" cy="260" r="200" />
        <g className="spin-rev">
          {nodes.map(([x, y]) => <line key={x + "-" + y} x1="260" y1="260" x2={x} y2={y} stroke="rgba(255,255,255,.22)" />)}
        </g>
        {nodes.map(([x, y, l]) => (
          <g key={l}>
            <circle cx={x} cy={y} r="34" fill="#0A2F57" />
            <text x={x} y={y + 4} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="600" fontFamily={font}>{l}</text>
          </g>
        ))}
        <circle className="pulse" cx="260" cy="260" r="82" fill="#0066CC" />
        <text x="260" y="256" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="700" fontFamily={font}>Grace AI</text>
        <text x="260" y="278" textAnchor="middle" fill="#CFE3F7" fontSize="12" fontFamily={font}>agent loop</text>
      </svg>
    </div>
  );
}

/** Deterministic QR-style pattern. `seed` changes the pattern (the amount demo uses it). */
export function QrPattern({ seed: s0 = 7 }: { seed?: number }) {
  const n = 25;
  let seed = s0 || 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const cells: ReactNode[] = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const inFinder = (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
    if (!inFinder && rnd() < 0.48) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />);
  }
  const finder = (x: number, y: number) => (
    <g key={`f${x}${y}`}>
      <rect x={x} y={y} width="7" height="7" fill="#001A33" /><rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="#001A33" />
    </g>
  );
  return (
    <svg viewBox={`0 0 ${n} ${n}`} shapeRendering="crispEdges" role="img" aria-label="Sample Phlyp Pay QR code">
      <g fill="#001A33">{cells}</g>{finder(0, 0)}{finder(n - 7, 0)}{finder(0, n - 7)}
      <rect x="10" y="10" width="5" height="5" fill="#0066CC" />
    </svg>
  );
}

export function QrCard({ label = "Scan to Pay EBSL", note = "QR payment portal currently in final development. Request early access below." }) {
  return (
    <div className="qr-card" data-ui>
      <div className="qr-top"><span>Phlyp Pay</span><span className="qr-live">Sample code</span></div>
      <div className="qr-box"><QrPattern /></div>
      <p className="qr-label">{label}</p>
      <p className="qr-note">{note}</p>
    </div>
  );
}

export function PostCard({ p, h = "h3" }: { p: Insight; h?: "h2" | "h3" }) {
  const H = h;
  const [y, m, day] = p.date.split("-");
  return (
    <article className="post-card reveal" data-cat={p.tag.toLowerCase().replace(/\s+/g, "-")}>
      <div className="thumb">
        <Image src={p.image} alt={p.imageAlt} fill sizes="(max-width: 640px) 100vw, 33vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="body">
        <p className="post-meta"><span className="tag">{p.tag}</span> · <time dateTime={p.date}>{`${day}.${m}.${y}`}</time> · {p.read} read</p>
        <H className="h3">{p.title}</H>
        <p>{p.summary}</p>
        <Link className="link-arrow card-link" href={`/insights/${p.slug}`}>Read More<span className="sr-only">: {p.title}</span> <Icon name="arrow" /></Link>
      </div>
    </article>
  );
}

export function FeatureList({ items, icon = "check-circle" }: { items: string[]; icon?: "check-circle" | "check" }) {
  return <ul className="feature-list">{items.map((t) => <li key={t}><Icon name={icon} /><span>{t}</span></li>)}</ul>;
}

export function Faq({ items }: { items: [string, string][] }) {
  return (
    <div className="faq">
      {items.map(([q, a]) => (
        <details key={q}><summary>{q}<span className="plus"><Icon name="plus" /></span></summary><p>{a}</p></details>
      ))}
    </div>
  );
}
