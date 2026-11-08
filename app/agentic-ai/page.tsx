import type { Metadata } from "next";
import Link from "@/components/IntentLink";
import Icon, { Arrow, type IconName } from "@/components/Icon";
import { AgentRunDemo } from "@/components/ProductUI";
import { CtaBand, d, FeatureList, PageHero, SectionHead, Serif, Split } from "@/components/ui";

export const metadata: Metadata = {
  title: "Agentic AI (Grace AI): Intelligent Automation for the Enterprise",
  description: "Grace AI by EBSL: autonomous AI agents that plan, decide and complete multi-step work across your systems. Locally deployed and supported in Nigeria.",
  alternates: { canonical: "/agentic-ai" },
};

const uses: [IconName, string, string][] = [
  ["workflow", "Process Automation", "Agents that run invoice processing, onboarding and approvals end to end."],
  ["headset", "Customer Service Agents", "24/7 agents that resolve requests across WhatsApp, web and email, and escalate when needed."],
  ["chart", "Data Analysis & Reporting", "Ask a question in plain language; get the analysis, chart and summary."],
  ["server", "IT Operations Management", "Agents that triage alerts, run runbooks and open tickets automatically."],
  ["users", "Sales & CRM Automation", "Lead qualification, follow-ups and pipeline hygiene without manual updates."],
  ["audit", "Compliance & Audit Bots", "Continuous checks against policy, with evidence captured as they run."],
];
const why: [IconName, string][] = [
  ["pin", "Locally deployed and supported"], ["lock", "Enterprise-grade security"], ["layers", "Customisable for any industry"],
  ["server", "Backed by EBSL's infrastructure team"], ["grad", "Onboarding and training included"],
];
// TODO(EBSL): add real prices once confirmed (spec §11). "Custom quote" until then.
const tiers = [
  { name: "Starter", desc: "For teams piloting their first agent.", featured: false,
    features: ["1 production agent", "Up to 2 integrations", "Standard support (business hours)", "Onboarding workshop"] },
  { name: "Business", desc: "For departments automating core workflows.", featured: true,
    features: ["Up to 5 agents", "Up to 10 integrations", "Priority support", "Custom workflows & analytics", "Staff training programme"] },
  { name: "Enterprise", desc: "For organisation-wide, governed AI.", featured: false,
    features: ["Unlimited agents", "Unlimited integrations", "Dedicated success manager", "On-premise / private cloud option", "Audit logs & SSO", "24/7 SLA"] },
];
const compare: string[][] = [
  ["Production agents", "1", "Up to 5", "Unlimited"], ["Integrations", "2", "10", "Unlimited"],
  ["Human-in-the-loop approvals", "yes", "yes", "yes"], ["Analytics dashboard", "Basic", "Advanced", "Advanced + custom"],
  ["Deployment", "EBSL cloud", "EBSL cloud", "Cloud, private or on-premise"], ["SSO & audit logs", "no", "no", "yes"],
  ["Support", "Business hours", "Priority", "24/7 dedicated"],
];

export default function AgenticAI() {
  return (
    <>
      <PageHero media={{ node: <AgentRunDemo />, size: "auto", tag: { title: "Grace AI", sub: "Sample agent runs" }, tags: ["New"] }} title={<>Agentic AI for the enterprise.</>}
        eyebrow={<><span className="badge-new">New</span>&nbsp; Grace AI</>}
        lead="Grace AI is the agentic AI platform EBSL has acquired and deploys for African businesses. Its agents take action on your behalf: planning, deciding and completing multi-step tasks across the tools you already use."
        crumbs={[{ label: "Services", href: "/services" }, { label: "Agentic AI" }]}
        actions={<>
          <Link className="btn" href="/demo?product=Agentic%20AI">Book a Demo <Arrow /></Link>
          <Link className="btn btn--outline-light" href="/consultation">Talk to an Expert</Link>
        </>} />

      <section className="section" aria-labelledby="what-h">
        <div className="container split">
          <div><Split className="h2" id="what-h">AI that acts, not just answers.</Split></div>
          <div className="reveal">
            <p className="lead" style={{ color: "var(--body)" }}>
              Unlike traditional AI that responds to commands, agentic AI takes independent action, makes decisions, and completes multi-step tasks
              autonomously. You set the goal and the guardrails; the agent works out the steps, uses your systems, checks its own work and reports back,
              escalating to a person whenever a decision needs one.
            </p>
            <div className="steps mt-m">
              <div className="card"><h3>Goal</h3><p className="mb-0">&ldquo;Reconcile last month&apos;s supplier invoices.&rdquo;</p></div>
              <div className="card"><h3>Plan &amp; act</h3><p className="mb-0">Pulls invoices, matches POs, flags mismatches.</p></div>
              <div className="card"><h3>Verify &amp; report</h3><p className="mb-0">Sends a summary and asks for approval on exceptions.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="uc-h">
        <div className="container">
          <SectionHead eyebrow="Use cases" id="uc-h" title="Where agents pay off first." />
          <div className="grid grid-3">
            {uses.map(([ic, t, x], i) => (
              <article className="card reveal" style={d((i % 3) * 80)} key={t}>
                <span className="svc-icon"><Icon name={ic} /></span><h3>{t}</h3><p className="mb-0">{x}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark" aria-labelledby="why-h">
        <div className="container split split--even">
          <div>
            <Split className="h2" id="why-h">Why EBSL&apos;s Agentic AI?</Split>
            <p className="lead reveal">Global-grade AI with a local team that installs it, secures it, trains your people and stays accountable.</p>
          </div>
          <ul className="benefits reveal" style={{ margin: 0 }}>{why.map(([ic, t]) => <li key={t}><Icon name={ic} /><span>{t}</span></li>)}</ul>
        </div>
      </section>

      <section className="section" aria-labelledby="pr-h">
        <div className="container">
          <SectionHead eyebrow="Pricing" id="pr-h" title="Plans that grow with you."
            aside={<p className="lead reveal" style={{ maxWidth: "44ch" }}>Pricing depends on agents, integrations and deployment. Every plan starts with a free scoping call.</p>} />
          <div className="pricing">
            {tiers.map((t) => (
              <article className={`card price-card reveal${t.featured ? " is-featured" : ""}`} key={t.name}>
                {t.featured && <span className="badge-new" style={{ alignSelf: "flex-start", marginBottom: 12 }}>Most popular</span>}
                <h3>{t.name}</h3><p>{t.desc}</p><p className="price">Custom quote</p>
                <FeatureList items={t.features} icon="check" />
                <Link className={`btn${t.featured ? "" : " btn--outline"}`} href={`/service-request?product=agentic-ai&tier=${t.name}`}>
                  Get Started<span className="sr-only"> with {t.name}</span> <Arrow />
                </Link>
              </article>
            ))}
          </div>
          <h3 className="h3 mt-l">Compare plans</h3>
          <div className="table-wrap reveal">
            <table className="compare">
              <caption className="sr-only">Agentic AI plan comparison</caption>
              <thead><tr><th scope="col">Feature</th><th scope="col">Starter</th><th scope="col">Business</th><th scope="col">Enterprise</th></tr></thead>
              <tbody>
                {compare.map(([f, ...c]) => (
                  <tr key={f}><th scope="row">{f}</th>{c.map((v, i) => (
                    <td key={i} className={v === "yes" ? "y" : ""}>
                      {v === "yes" ? <><Icon name="check" /><span className="sr-only">Included</span></>
                        : v === "no" ? <><Icon name="x" /><span className="sr-only">Not included</span></> : v}
                    </td>))}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand title={<>See Agentic AI <Serif>in action.</Serif></>} lead="Book your free demo today and watch an agent complete a real workflow from your business."
        primary={{ label: "Book Demo", href: "/demo?product=Agentic%20AI" }} />
    </>
  );
}
