import Icon from "./Icon";
import { EbslForm } from "./Form";
import { d, Split } from "./ui";
import { insights } from "@/lib/insights";

/** Newsletter: copy and sign-up on the left; a preview of what an issue contains on the right. */
export default function Newsletter() {
  const [lead, ...rest] = insights;
  return (
    <section className="section section--tight" aria-labelledby="nl-h">
      <div className="container">
        <div className="newsletter">
          <div className="nl-copy">
            <Split className="h2" id="nl-h">Strategy notes for tech-led leaders.</Split>
            <p className="reveal" style={d(80)}>One email a month on infrastructure, security and AI, written for decision makers in Nigeria and across Africa. Practical, short, no spam.</p>
            <div className="reveal" style={d(160)}>
              <EbslForm kind="newsletter" inline className="inline-form" submitLabel="Subscribe"
                success="You're subscribed. Check your inbox for a confirmation.">
                <label className="sr-only" htmlFor="nl-email">Email address</label>
                <input id="nl-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
              </EbslForm>
              <ul className="nl-points" aria-label="What you get">
                <li><Icon name="check" /> Monthly, never more</li>
                <li><Icon name="check" /> Unsubscribe in one click</li>
              </ul>
            </div>
          </div>

          {/* What an issue looks like, built from articles already on the site */}
          <div className="nl-preview reveal" style={d(200)} aria-label="Inside an issue">
            <div className="nl-sheet nl-sheet--back" aria-hidden="true" />
            <div className="nl-sheet nl-sheet--mid" aria-hidden="true" />
            <article className="nl-issue" data-ui>
              <header className="nl-issue-head">
                <span className="nl-issue-brand">EBSL Notes</span>
                <span className="nl-issue-meta">Inside an issue</span>
              </header>
              <p className="nl-issue-kicker">{lead.tag}</p>
              <h3 className="nl-issue-title">{lead.title}</h3>
              <p className="nl-issue-sum">{lead.summary}</p>
              <ul className="nl-issue-list">
                {rest.map((p) => (
                  <li key={p.slug}><span>{p.tag}</span>{p.title}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
