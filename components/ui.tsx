import Image from "next/image";
import Link from "next/link";
import { Children, cloneElement, Fragment, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from "react";
import Icon, { Arrow } from "./Icon";
import { partners, partnerWords, services, site, svc, type Service } from "@/lib/site";
import type { Insight } from "@/lib/insights";

/** Headline whose words rise in on reveal. Works with plain text and inline <em>. */
export function Split({ as: Tag = "h2", className, id, children }: { as?: "h1" | "h2"; className?: string; id?: string; children: ReactNode }) {
  let i = 0;
  const word = (w: ReactNode, key: string) => (
    <span key={key} className="split-line" aria-hidden="true">
      <span style={{ "--d": `${i++ * 60}ms` } as CSSProperties}>{w}</span>
    </span>
  );
  const out: ReactNode[] = [];
  const label: string[] = [];
  const flat = (nodes: ReactNode): ReactNode[] => Children.toArray(nodes).flatMap((n) =>
    isValidElement(n) && n.type === Fragment ? flat((n as ReactElement<{ children?: ReactNode }>).props.children) : [n]);
  flat(children).forEach((child, ci) => {
    if (typeof child === "string") {
      child.split(/\s+/).filter(Boolean).forEach((w, wi) => { out.push(word(w, `${ci}-${wi}`), " "); label.push(w); });
    } else if (isValidElement(child)) {
      const el = child as ReactElement<{ children?: ReactNode }>;
      String(el.props.children ?? "").split(/\s+/).filter(Boolean).forEach((w, wi) => {
        out.push(word(cloneElement(el, { key: `e${ci}-${wi}` }, w), `${ci}-e${wi}`), " ");
        label.push(w);
      });
    }
  });
  return <Tag className={`${className ?? ""} reveal-split`} id={id} aria-label={label.join(" ")}>{out}</Tag>;
}

export const Serif = ({ children }: { children: string }) => <em className="serif">{children}</em>;

export function HeroBg({ orbs = 1 }: { orbs?: number }) {
  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="grid-lines" /><div className="orb orb-1" />{orbs > 1 && <div className="orb orb-2" />}<div className="noise" />
    </div>
  );
}

export function PageHero({ title, lead, crumbs, eyebrow, actions, aside }: {
  title: ReactNode; lead: ReactNode; crumbs: { label: string; href?: string }[];
  eyebrow?: ReactNode; actions?: ReactNode; aside?: ReactNode;
}) {
  const body = (
    <div>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <Split as="h1" className="hero-title">{title}</Split>
      <div className="hero-row">
        <p className="lead reveal" style={{ "--d": "300ms" } as CSSProperties}>{lead}</p>
        {actions && <div className="hero-actions">{actions}</div>}
      </div>
    </div>
  );
  return (
    <section className="hero page-hero">
      <HeroBg />
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className="crumbs">
            <li><Link href="/">Home</Link></li>
            {crumbs.map((c) => <li key={c.label} aria-current={c.href ? undefined : "page"}>{c.href ? <Link href={c.href}>{c.label}</Link> : c.label}</li>)}
          </ol>
        </nav>
        {aside ? <div className="split split--even">{body}<div className="reveal" style={{ "--d": "200ms" } as CSSProperties}>{aside}</div></div> : body}
      </div>
    </section>
  );
}

export function CtaBand({ title = <>Ready to <Serif>architect</Serif> what&apos;s next?</>,
  lead = "Tell us where you want to be. We'll map the infrastructure, security and people to get you there.",
  primary = { label: "Book a Free Consultation", href: "/consultation" } }: { title?: ReactNode; lead?: string; primary?: { label: string; href: string } }) {
  return (
    <section className="section hero cta-band">
      <HeroBg orbs={2} />
      <div className="container">
        <p className="eyebrow">Let&apos;s talk strategy</p>
        <Split className="h-display">{title}</Split>
        <p className="lead mx-auto reveal">{lead}</p>
        <div className="hero-actions reveal">
          <Link className="btn btn--light" href={primary.href} data-magnetic>{primary.label} <Arrow /></Link>
          <Link className="btn btn--outline-light" href="/demo">Book a Demo</Link>
        </div>
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, id, aside }: { eyebrow: ReactNode; title: ReactNode; id?: string; aside?: ReactNode }) {
  return (
    <div className="section-head">
      <div><p className="eyebrow">{eyebrow}</p><Split className="h2" id={id}>{title}</Split></div>
      {aside}
    </div>
  );
}

export const WaChannelButton = ({ className = "" }: { className?: string }) => (
  <a className={`btn btn--wa ${className}`} href={site.social.whatsappChannel} target="_blank" rel="noopener noreferrer">
    <Icon name="whatsapp" /> Join Our WhatsApp TV Channel<span className="sr-only"> (opens in new tab)</span>
  </a>
);

export const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function SvcCards({ slugs }: { slugs?: string[] }) {
  const list: Service[] = slugs ? slugs.map(svc) : services.filter((s) => s.slug !== "software");
  return (
    <div className="svc-grid">
      {list.map((s, i) => (
        <article className="svc-card reveal" style={d((i % 4) * 70)} key={s.slug}>
          <span className="num">{String(i + 1).padStart(2, "0")}</span>
          <span className="svc-icon"><Icon name={s.icon} /></span>
          <h3>{s.name.split(" (")[0]}{s.isNew && <> <span className="badge-new">New</span></>}</h3>
          <p>{s.short}</p>
          <Link className="link-arrow" href={s.href}>Learn More<span className="sr-only"> about {s.name}</span> <Icon name="arrow" /></Link>
        </article>
      ))}
    </div>
  );
}

export function PartnersMarquee() {
  const group = (hidden: boolean) => (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {partners.map((p) => <Image key={p.key} className="logo-item" src={`/img/${p.key}.webp`} alt={hidden ? "" : p.name} width={163} height={52} />)}
      {partnerWords.map((w) => <span key={w} className="logo-text">{w}</span>)}
    </div>
  );
  return (
    <div style={{ position: "relative" }}>
      <div className="marquee" style={{ "--marquee-dur": "55s" } as CSSProperties}>
        <div className="marquee-track">{group(false)}{group(true)}</div>
      </div>
      <button className="btn btn--outline btn--sm marquee-toggle marquee-pause" type="button" aria-pressed="false"
        style={{ width: 44, padding: 0, background: "#fff" }}>
        <Icon name="pause" /><span className="sr-only">Pause logo carousel</span>
      </button>
    </div>
  );
}

export function LogoWall() {
  return (
    <div className="logo-wall">
      {partners.map((p) => (
        <figure key={p.key}><Image src={`/img/${p.key}.webp`} alt={`${p.name} logo`} width={163} height={52} /><figcaption>{p.name} partner</figcaption></figure>
      ))}
      {["Huawei", "Kaspersky", "Palo Alto", "Check Point"].map((w) => (
        <figure key={w}><span className="logo-word">{w}</span><figcaption>OEM partner</figcaption></figure>
      ))}
    </div>
  );
}

export function AiVisual() {
  const nodes: [number, number, string][] = [[260, 70, "Plan"], [440, 190, "Decide"], [420, 380, "Act"], [260, 450, "Verify"], [100, 380, "Learn"], [80, 190, "Report"]];
  const font = "Plus Jakarta Sans, sans-serif";
  return (
    <div className="ai-visual" aria-hidden="true">
      <svg viewBox="0 0 520 520">
        <defs>
          <radialGradient id="core" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#00AAFF" /><stop offset=".6" stopColor="#0066CC" /><stop offset="1" stopColor="#003366" />
          </radialGradient>
        </defs>
        <circle className="ring spin" cx="260" cy="260" r="240" />
        <circle className="ring spin-rev" cx="260" cy="260" r="190" />
        <g className="spin-rev">
          {nodes.map(([x, y]) => <line key={x + "-" + y} x1="260" y1="260" x2={x} y2={y} stroke="rgba(0,170,255,.35)" />)}
          <circle cx="260" cy="20" r="5" fill="#FFB81C" />
        </g>
        {nodes.map(([x, y, l]) => (
          <g key={l}>
            <circle cx={x} cy={y} r="30" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.25)" />
            <text x={x} y={y + 4} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily={font}>{l}</text>
          </g>
        ))}
        <g className="pulse">
          <circle cx="260" cy="260" r="78" fill="url(#core)" />
          <circle cx="260" cy="260" r="94" fill="none" stroke="rgba(0,170,255,.4)" />
        </g>
        <text x="260" y="256" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800" fontFamily={font}>GRACE AI</text>
        <text x="260" y="276" textAnchor="middle" fill="#A9B8CC" fontSize="11" fontFamily={font}>agent loop</text>
      </svg>
    </div>
  );
}

/** Deterministic placeholder QR pattern. Replace with the real Phlyp Pay code (public/img/phlyp-qr.png) when supplied. */
function QrPattern() {
  const n = 25;
  let seed = 7;
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
      <rect x="10" y="10" width="5" height="5" rx="1" fill="#0066CC" />
    </svg>
  );
}

export function QrCard({ label = "Scan to Pay EBSL", note = "QR payment portal currently in final development. Request early access below." }) {
  return (
    <div className="qr-card" data-tilt>
      <div className="qr-top"><span>Phlyp Pay</span><span style={{ color: "var(--blue-400)", fontSize: ".85rem" }}>● Live preview</span></div>
      <div className="qr-box"><QrPattern /><span className="scanline" aria-hidden="true" /></div>
      <p className="qr-label">{label}</p>
      <p className="qr-note">{note}</p>
      <span className="qr-chip qr-chip--a" aria-hidden="true"><Icon name="check-circle" /> ₦25,000 received</span>
      <span className="qr-chip qr-chip--b" aria-hidden="true"><Icon name="zap" /> Paid in 3s</span>
    </div>
  );
}

export function PostCard({ p, h = "h3" }: { p: Insight; h?: "h2" | "h3" }) {
  const H = h;
  const [y, m, day] = p.date.split("-");
  return (
    <article className="card post-card reveal" data-cat={p.tag.toLowerCase().replace(/\s+/g, "-")}>
      <div className="thumb"><div className={`art art--${p.art}`} role="img" aria-label={`Illustration for: ${p.title}`}><span className="art-label">{p.tag}</span></div></div>
      <div className="body">
        <div className="post-meta"><span className="tag">{p.tag}</span><time dateTime={p.date}>{`${day}.${m}.${y}`}</time><span>{p.read}</span></div>
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
