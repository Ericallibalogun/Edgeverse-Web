import Image from "next/image";
import Link from "next/link";
import Icon, { Arrow } from "@/components/Icon";
import Newsletter from "@/components/Newsletter";
import { AgentRunDemo, PhlypDemo } from "@/components/ProductUI";
import { d, HeroFrame, HeroTop, LogoWall, PartnersMarquee, PostCard, SectionHead, Split, SvcCards, TrustedBy } from "@/components/ui";
import { insights } from "@/lib/insights";
import { processSteps, site, socials } from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* 4.1 Hero: what EBSL does, the proof in numbers, and its products on screen */}
      <section className="hero home-hero hero-fill" aria-labelledby="hero-h">
        <div className="container">
          <HeroTop id="hero-h" title="Your IT, running and secure."
            lead="EBSL delivers end-to-end IT infrastructure, consulting, cybersecurity, AI solutions, and training, built for the modern Nigerian and African enterprise."
            actions={<>
              <Link className="btn" href="/services">Explore Our Services <Arrow /></Link>
              <Link className="btn btn--outline" href="/consultation">Book a Free Consultation</Link>
            </>} />
          <HeroFrame media={{
            src: "/img/photos/victoria-island.webp", alt: "Aerial view of Victoria Island, Lagos, and the lagoon", priority: true,
            tag: { title: "EBSL, Lagos", sub: "IT for Nigerian and African enterprise" }, tags: ["Infrastructure", "Security", "AI"],
          }} />
        </div>
      </section>

      {/* Company numbers: the first thing after the full-screen hero */}
      <section className="stats-band" aria-label="EBSL in numbers">
        <div className="container">
          <dl className="stats reveal">
            {site.stats.map((s) => (
              <div className="stat" key={s.label}>
                <dt className="stat-label">{s.label}</dt>
                <dd className="stat-num"><span data-count={s.value}>{s.value}</span>{s.suffix}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <TrustedBy />

      {/* 4.2 Services */}
      <section className="section" aria-labelledby="svc-h">
        <div className="container split">
          <div className="sticky-head">
            <Split className="h2" id="svc-h">Everything your IT needs.</Split>
            <p className="lead reveal" style={d(80)}>Pick a starting point, or tell us the problem and we&apos;ll assemble the team for it.</p>
            <Link className="btn btn--outline reveal" style={d(160)} href="/services">All services <Arrow /></Link>
          </div>
          <SvcCards />
        </div>
      </section>

      {/* 4.3 What we do */}
      <section className="section section--tint" aria-labelledby="wwd-h">
        <div className="container">
          <SectionHead id="wwd-h" title="Why teams pick EBSL."
            lead="Strategy, infrastructure and execution under one roof, from a team that is in Lagos when something breaks." />
          <div className="bento">
            <figure className="bento-cell bento-photo reveal">
              <Image src="/img/photos/ikoyi-lagos.webp" alt="Aerial view of Ikoyi, Lagos, with Victoria Island across the lagoon" fill unoptimized sizes="(max-width: 900px) 100vw, 66vw" style={{ objectFit: "cover" }} />
              <figcaption>
                <h3>On the ground in Lagos</h3>
                <p>Engineers based at EBSL Towers, Lekki, for on-site support across the city.</p>
              </figcaption>
            </figure>
            <div className="bento-cell bento-navy reveal" style={d(60)}>
              <h3>Our own platforms</h3>
              <p>We build the tools we run your estate on.</p>
              <ul className="plain-list">
                <li><b>NerveHUB</b> monitoring and service desk</li>
                <li><b>NerveMedi</b> for clinics</li>
                <li><b>NerveVending</b> and <b>NervePOS</b> for retail</li>
              </ul>
            </div>
            <div className="bento-cell bento-partners reveal" style={d(120)}>
              <h3>Certified with the platforms you run</h3>
              <LogoWall />
            </div>
            <div className="bento-cell bento-blue reveal" style={d(180)}>
              <h3>Managed services with SLAs</h3>
              <p>Helpdesk, monitoring and maintenance on agreed response times, with monthly reporting you can read in five minutes.</p>
              <Link className="link-arrow" href="/services/outsourcing">Managed services <Icon name="arrow" /></Link>
            </div>
            <div className="bento-cell bento-light reveal" style={d(240)}>
              <h3>A Learning Academy for your people</h3>
              <p>Cisco, Microsoft, CompTIA, ITIL and security certification tracks, on-site or virtual.</p>
              <Link className="link-arrow" href="/services/training">Training &amp; Learning Academy <Icon name="arrow" /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4.4 Process */}
      <section className="section" aria-labelledby="proc-h">
        <div className="container split">
          <div className="sticky-head">
            <Split className="h2" id="proc-h">Proven frameworks.</Split>
            <p className="lead reveal" style={d(80)}>Every engagement is anchored in globally recognised methods, so outcomes are measurable, repeatable and audited.</p>
            <Link className="btn btn--outline reveal" style={d(160)} href="/process">Explore our methodology <Arrow /></Link>
          </div>
          <ul className="framework-list">
            {processSteps.map((p, i) => (
              <li className="reveal" style={d((i % 3) * 60)} key={p.slug}>
                <Link href={`/process#${p.slug}`}>
                  <h3>{p.title}</h3>
                  <p>{p.short}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4.5 Agentic AI */}
      <section className="section spot-ai" aria-labelledby="ai-h">
        <div className="container split split--even">
          <div>
            <Split className="h2" id="ai-h">Agentic AI for your business.</Split>
            <p className="lead reveal" style={d(80)}>
              Grace AI agents take a goal, work through your systems step by step, and stop for a person whenever a decision needs one. EBSL installs it, secures it and trains your team.
            </p>
            <div className="hero-actions reveal" style={d(160)}>
              <Link className="btn btn--light" href="/agentic-ai">Discover Agentic AI <Arrow /></Link>
              <Link className="btn btn--outline-light" href="/demo?product=Agentic%20AI">Book Demo</Link>
            </div>
          </div>
          <div className="reveal" style={d(200)}><AgentRunDemo /></div>
        </div>
      </section>

      {/* 4.6 Phlyp Pay, with the live amount demo */}
      <section className="section spot-pay" aria-labelledby="pay-h">
        <div className="container split">
          <div>
            <Split className="h2" id="pay-h">Phlyp Pay: scan, pay, done.</Split>
            <p className="lead reveal" style={d(80)}>
              Fast, secure scan-to-pay. Customers scan with any phone camera, pay in seconds, and you&apos;re notified instantly. No POS terminal, no app download.
            </p>
            <div className="hero-actions reveal" style={d(160)}>
              <Link className="btn" href="/phlyp-pay">Get Phlyp Pay <Arrow /></Link>
              <Link className="btn btn--outline" href="/service-request?product=phlyp-pay">Request Access</Link>
            </div>
          </div>
          <div className="reveal" style={d(200)}><PhlypDemo /></div>
        </div>
      </section>

      {/* 4.7 Partners */}
      <section className="section section--tight" aria-labelledby="partners-h">
        <div className="container">
          <h2 className="h3 center reveal" id="partners-h">Trusted technology partners and OEM brands</h2>
          <div className="reveal" style={d(80)}><PartnersMarquee /></div>
        </div>
      </section>

      {/* 4.8 Insights */}
      <section className="section section--tint" aria-labelledby="ins-h">
        <div className="container">
          <SectionHead id="ins-h" title="Insights and case studies."
            aside={<Link className="btn btn--outline reveal" href="/insights">View All Insights <Arrow /></Link>} />
          <div className="grid grid-3">{insights.map((p) => <PostCard key={p.slug} p={p} />)}</div>
        </div>
      </section>

      {/* 4.9 Community */}
      <section className="section section--dark" aria-labelledby="comm-h">
        <div className="container">
          <SectionHead id="comm-h" title="Join our community."
            aside={<p className="lead reveal" style={{ maxWidth: "44ch" }}>Event photos, product drops, tech explainers and job alerts, wherever you already are.</p>} />
          <div className="community reveal">
            <a className="soc-tile soc-tile--wa" href={site.social.whatsappChannel} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" /><span className="soc-name">Join Our WhatsApp TV Channel</span>
              <Icon name="arrow-ur" /><span className="sr-only">(opens in new tab)</span>
            </a>
            {socials.map((s) => (
              <a key={s.key} className="soc-tile" href={site.social[s.key]} target="_blank" rel="noopener noreferrer">
                <Icon name={s.key} /><span className="soc-name">{s.name}</span><Icon name="arrow-ur" /><span className="sr-only">(opens in new tab)</span>
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
