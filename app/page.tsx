import Link from "next/link";
import Icon, { Arrow } from "@/components/Icon";
import Newsletter from "@/components/Newsletter";
import { AiVisual, d, HeroBg, LogoWall, PartnersMarquee, PostCard, QrCard, SectionHead, Serif, Split, SvcCards } from "@/components/ui";
import { insights } from "@/lib/insights";
import { processSteps, site, socials } from "@/lib/site";

const capabilities: [string, string][] = [
  ["End-to-end infrastructure design & management", "Data centre, network, cloud and end-user computing."],
  ["Strategic IT consulting & digital roadmaps", "Technology aligned to measurable business goals."],
  ["Cybersecurity frameworks & compliance", "Proactive threat management and continuous audit."],
  ["Managed services & outsourcing", "Predictable, SLA-backed support that scales."],
  ["In-house platforms", "NerveHUB, NerveMedi, NerveVending and NervePOS."],
  ["Learning Academy", "Certification and leadership programmes for IT teams."],
];
const words = ["Infrastructure", "Cybersecurity", "Consulting", "Agentic AI", "Managed Services", "Phlyp Pay", "Training"];

export default function Home() {
  return (
    <>
      {/* 4.1 Hero */}
      <section className="hero" aria-labelledby="hero-h">
        <HeroBg orbs={2} />
        <div className="container">
          <Link className="hero-kicker reveal" href="/agentic-ai">
            <span className="badge-new">New</span> Introducing Agentic AI for your business <Icon name="arrow" className="chev" />
          </Link>
          <Split as="h1" className="hero-title" id="hero-h">Empowering Businesses Through <Serif>Strategic</Serif> Technology</Split>
          <div className="hero-row">
            <p className="lead reveal" style={d(400)}>
              EBSL delivers end-to-end IT infrastructure, consulting, cybersecurity, AI solutions, and training, built for the modern Nigerian and African enterprise.
            </p>
            <div className="hero-actions reveal" style={d(500)}>
              <Link className="btn" href="/services" data-magnetic>Explore Our Services <Arrow /></Link>
              <Link className="btn btn--outline-light" href="/consultation">Book a Free Consultation</Link>
            </div>
          </div>
          <div className="stats" role="list" aria-label="EBSL in numbers">
            {site.stats.map((s, i) => (
              <div className="stat reveal" role="listitem" key={s.label} style={d(600 + i * 80)}>
                <span className="stat-num"><span data-count={s.value}>{s.value}</span><sup>{s.suffix}</sup></span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="word-marquee" aria-hidden="true">
        <div className="marquee" style={{ maskImage: "none", WebkitMaskImage: "none", ["--marquee-dur" as string]: "35s" }}>
          <div className="marquee-track">
            {[0, 1].map((g) => (
              <div className="marquee-group" key={g}>
                {words.map((w) => <span key={w} style={{ display: "contents" }}><span>{w}</span><Icon name="spark" className="star" /></span>)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4.2 Services overview */}
      <section className="section" aria-labelledby="svc-h">
        <div className="container">
          <SectionHead eyebrow="What we offer" id="svc-h" title="Comprehensive IT solutions for your business."
            aside={<Link className="btn btn--outline reveal" href="/services">All services <Arrow /></Link>} />
          <SvcCards />
        </div>
      </section>

      {/* 4.3 What we do */}
      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="wwd-h">
        <div className="container split">
          <div>
            <p className="eyebrow">What we do</p>
            <Split className="h2" id="wwd-h">Strategy, infrastructure and execution, <Serif>under one roof.</Serif></Split>
            <ol className="cap-list reveal">{capabilities.map(([a, b]) => <li key={a}>{a}<span>{b}</span></li>)}</ol>
            <Link className="btn reveal" href="/about">More about EBSL <Arrow /></Link>
          </div>
          <div className="reveal" style={d(150)}>
            <p className="eyebrow" style={{ marginTop: 8 }}>Certified OEM partners</p>
            <LogoWall />
          </div>
        </div>
      </section>

      {/* 4.4 Process */}
      <section className="section section--tint" aria-labelledby="proc-h">
        <div className="container process-wrap">
          <div className="process-intro">
            <p className="eyebrow">Our process</p>
            <Split className="h2" id="proc-h">We architect transformation.</Split>
            <p className="lead reveal">Not guesswork. Every engagement is anchored in globally recognised frameworks, so outcomes are measurable, repeatable and audited.</p>
            <Link className="btn btn--outline mt-m reveal" href="/process">Explore our methodology <Arrow /></Link>
          </div>
          <div className="process-stack">
            {processSteps.map((p, i) => (
              <article className="process-card" style={{ ["--i" as string]: i }} key={p.slug}>
                <span className="step" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div><h3 className="h3">{p.title}</h3><p>{p.short}</p></div>
                <Link className="go" href={`/process#${p.slug}`} aria-label={`${p.title}: learn more`}><Icon name="arrow" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5 Agentic AI spotlight */}
      <section className="section spot-ai" aria-labelledby="ai-h">
        <div className="hero-bg" aria-hidden="true"><div className="grid-lines" /><div className="noise" /></div>
        <div className="container split split--even">
          <div className="on-dark">
            <p className="eyebrow"><span className="badge-new">New</span>&nbsp; Agentic AI</p>
            <Split className="h2" id="ai-h">Introducing Agentic AI, <Serif>now available</Serif> for your business.</Split>
            <p className="lead reveal">
              Grace AI is the agentic platform EBSL has brought to market for African enterprises. Unlike chatbots that only answer, its agents plan,
              decide and complete multi-step work across your systems, with people in control.
            </p>
            <ul className="benefits reveal">
              <li><Icon name="workflow" /> Automate complex workflows</li>
              <li><Icon name="target" /> Intelligent decision-making</li>
              <li><Icon name="zap" /> Deploy in days, not months</li>
            </ul>
            <div className="hero-actions reveal">
              <Link className="btn btn--light" href="/agentic-ai" data-magnetic>Discover Agentic AI <Arrow /></Link>
              <Link className="btn btn--outline-light" href="/demo?product=Agentic%20AI">Book Demo</Link>
            </div>
          </div>
          <div className="reveal" style={d(200)}><AiVisual /></div>
        </div>
      </section>

      {/* 4.6 Phlyp Pay spotlight */}
      <section className="section spot-pay" aria-labelledby="pay-h">
        <div className="container split split--even">
          <div className="reveal" style={{ padding: 24 }}><QrCard /></div>
          <div>
            <p className="eyebrow"><span className="badge-new">New</span>&nbsp; Phlyp Pay</p>
            <Split className="h2" id="pay-h">Phlyp Pay: <Serif>seamless</Serif> QR-powered payments for your business.</Split>
            <p className="lead reveal">
              Fast, secure, scan-to-pay business payment infrastructure. Customers scan with any phone camera, pay in seconds, and you&apos;re notified instantly.
              No POS terminal, no app download.
            </p>
            <ul className="feature-list reveal mt-m">
              <li><Icon name="check-circle" /> Instant payment notifications</li>
              <li><Icon name="check-circle" /> Works on any device</li>
              <li><Icon name="check-circle" /> Bank-level encryption</li>
            </ul>
            <div className="hero-actions mt-m reveal">
              <Link className="btn" href="/phlyp-pay" data-magnetic>Get Phlyp Pay <Arrow /></Link>
              <Link className="btn btn--outline" href="/service-request?product=phlyp-pay">Request Access</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4.7 Partners strip */}
      <section className="section section--tight" aria-labelledby="partners-h">
        <div className="container">
          <h2 className="eyebrow" id="partners-h" style={{ display: "flex", justifyContent: "center" }}>Trusted technology partners &amp; OEM brands</h2>
          <PartnersMarquee />
        </div>
      </section>

      {/* 4.8 Insights */}
      <section className="section section--tint" aria-labelledby="ins-h">
        <div className="container">
          <SectionHead eyebrow="Insights & case studies" id="ins-h" title="Thinking out loud about what works."
            aside={<Link className="btn btn--outline reveal" href="/insights">View All Insights <Arrow /></Link>} />
          <div className="grid grid-3">{insights.map((p) => <PostCard key={p.slug} p={p} />)}</div>
        </div>
      </section>

      {/* 4.9 Community */}
      <section className="section section--dark" aria-labelledby="comm-h">
        <div className="container">
          <SectionHead eyebrow="Community" id="comm-h" title="Join our community."
            aside={<p className="lead reveal" style={{ maxWidth: "44ch" }}>Event photos, product drops, tech explainers and job alerts, wherever you already are.</p>} />
          <div className="community reveal">
            <a className="soc-tile soc-tile--wa" href={site.social.whatsappChannel} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" /><strong>Join Our WhatsApp TV Channel</strong>
              <span>Follow the channel <Icon name="arrow-ur" /></span><span className="sr-only">(opens in new tab)</span>
            </a>
            {socials.map((s) => (
              <a key={s.key} className="soc-tile" href={site.social[s.key]} target="_blank" rel="noopener noreferrer">
                <Icon name={s.key} /><span>{s.name} <Icon name="arrow-ur" /></span><span className="sr-only">(opens in new tab)</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4.10 Newsletter */}
      <Newsletter />
    </>
  );
}
