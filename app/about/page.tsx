import { aboutHero } from "@/lib/generated";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Icon, { Arrow, type IconName } from "@/components/Icon";
import Newsletter from "@/components/Newsletter";
import { CtaBand, d, LogoWall, PageHero, SectionHead, Serif, Split, WaChannelButton } from "@/components/ui";
import { team } from "@/lib/people";

export const metadata: Metadata = {
  title: "About EBSL: Who We Are, Mission, Team & Partners",
  description: "Edgeverve Business Solutions (EBSL) is a Lagos-based technology partner delivering infrastructure, consulting, cybersecurity, AI and training across Africa.",
  alternates: { canonical: "/about" },
};

const dna: [string, string, string][] = [
  ["Foundation", "Infrastructure first", "EBSL began by designing and running dependable infrastructure for Nigerian businesses: networks, servers and support."],
  ["Expansion", "Security & consulting", "Clients asked for more than uptime. We added a Cyber Security Framework and strategic IT consulting anchored in ITIL, Lean and Six Sigma."],
  ["Platforms", "NerveHUB & in-house products", "We built our own platforms (NerveHUB, NerveMedi, NerveVending and NervePOS) to give clients visibility and control."],
  ["People", "Learning Academy", "To close the local skills gap we launched the EBSL Learning Academy for certification and leadership training."],
  ["Today", "Agentic AI & Phlyp Pay", "We're bringing autonomous AI agents and QR-powered payments to African enterprises."],
];
const values: [IconName, string, string][] = [
  ["target", "Outcomes over output", "We measure success by your results, not our hours."],
  ["shield", "Trust by design", "Security, transparency and audited methods in everything we deliver."],
  ["users", "Local, accountable", "A Lagos team that answers the phone and owns the outcome."],
  ["refresh", "Always improving", "Continuous audit and assessment, long after go-live."],
];

export default function About() {
  return (
    <>
      <PageHero media={{ ...aboutHero, position: "50% 46%", priority: true, tag: { title: "Built in Lagos", sub: "Strategy, engineering and support" }, tags: ["Lekki, Lagos"] }} title={<>Your technology partner in Lagos.</>} eyebrow="About EBSL"
        lead="We architect enduring transformation, not just implementation, for businesses across Nigeria and Africa."
        crumbs={[{ label: "About" }]}
        actions={<><Link className="btn" href="/contact?subject=Partnership">Partner With Us <Arrow /></Link><Link className="btn btn--outline-light" href="/services">Our Services</Link></>} />

      <section className="section" id="who-we-are" aria-labelledby="who-h">
        <div className="container who-split">
          <Split className="h2" id="who-h">Strategy, engineering and people, <Serif>in one team.</Serif></Split>
          <div>
            <p className="lead reveal" style={{ color: "var(--body)" }}>
              Edgeverve Business Solutions Ltd (EBSL) is a technology-driven provider headquartered at EBSL Towers in Lekki, Lagos. We deliver the strategic innovation,
              robust infrastructure and reliable execution that organisations need to future-proof their digital landscape.
            </p>
            <p className="reveal" style={d(80)}>
              Our methodology is built on trust and deep expertise, anchored in globally recognised frameworks (ITIL, Lean &amp; Six Sigma, MOF and the Balanced Scorecard),
              so outcomes are scalable, sustainable and measurable.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--dark" id="mission" aria-labelledby="mis-h">
        <div className="container">
          <div className="grid grid-2">
            <div className="reveal">
              <h2 className="h3" id="mis-h">Our mission</h2>
              <p className="statement">To empower businesses through strategic technology that is secure, scalable and built to last.</p>
            </div>
            <div className="reveal" style={d(120)}>
              <h2 className="h3">Our vision</h2>
              <p className="statement">To be Africa&apos;s most trusted partner for digital transformation.</p>
            </div>
          </div>
          <div className="grid grid-4 mt-l">
            {values.map(([ic, t, x], i) => (
              <div className="card reveal" style={d(i * 80)} key={t}><span className="svc-icon"><Icon name={ic} /></span><h3>{t}</h3><p className="mb-0">{x}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="dna" aria-labelledby="dna-h">
        <div className="container process-wrap">
          <div className="process-intro">
            <Split className="h2" id="dna-h">How we got here.</Split>
            <p className="lead reveal">Each chapter added a capability our clients asked for. The thread through all of it: dependable execution.</p>
          </div>
          <ol className="stack-list">
            {dna.map(([k, t, x], i) => (
              <li className="reveal" style={d(i * 60)} key={t}>
                <h3 className="h3">{k}: {t.charAt(0).toLowerCase() + t.slice(1)}</h3><p>{x}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--tint" id="team" aria-labelledby="team-h">
        <div className="container">
          <SectionHead eyebrow="Our team" id="team-h" title="The people behind the work."
            aside={<Link className="btn btn--outline reveal" href="/careers">Join the team <Arrow /></Link>} />
          {team.length ? (
            <div className="grid grid-4">
              {team.map((m, i) => (
                <article className="card team-card reveal" style={d(i * 80)} key={m.name}>
                  {m.photo ? <Image src={m.photo} alt={m.name} width={400} height={500} /> : <div className="avatar" aria-hidden="true">{m.name.split(" ").map((p) => p[0]).join("")}</div>}
                  <div className="body"><h3>{m.name}</h3><p>{m.role}</p></div>
                </article>
              ))}
            </div>
          ) : (
            <p className="lead reveal">
              Our consultants, engineers and trainers hold certifications across Cisco, Microsoft, AWS, Fortinet, ITIL and more. Leadership profiles are coming soon.
            </p>
          )}
        </div>
      </section>

      <section className="section" id="partners" aria-labelledby="pt-h">
        <div className="container split">
          <div>
            <Split className="h2" id="pt-h">Certified with the platforms you run.</Split>
            <p className="lead reveal">Authorised partnerships mean genuine products, manufacturer warranties and engineers trained on the technology they deploy.</p>
            <div className="hero-actions mt-m reveal">
              <Link className="btn" href="/contact?subject=Partnership">Partner With Us <Arrow /></Link>
              <WaChannelButton />
            </div>
          </div>
          <div className="reveal"><LogoWall /></div>
        </div>
      </section>

      <Newsletter />
      <CtaBand />
    </>
  );
}
