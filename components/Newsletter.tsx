import { EbslForm } from "./Form";
import { Split } from "./ui";

export default function Newsletter() {
  return (
    <section className="section section--tight" aria-labelledby="nl-h">
      <div className="container">
        <div className="newsletter reveal">
          <div>
            <p className="eyebrow" style={{ color: "#fff" }}>Newsletter</p>
            <Split className="h2" id="nl-h">Strategy notes for <em className="serif">tech-led</em> leaders.</Split>
          </div>
          <div>
            <p>Monthly insights on infrastructure, security and AI, written for decision makers in Nigeria and across Africa. No spam.</p>
            <EbslForm kind="newsletter" inline className="inline-form" submitLabel="Subscribe"
              success="You're subscribed. Check your inbox for a confirmation.">
              <label className="sr-only" htmlFor="nl-email">Email address</label>
              <input id="nl-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
            </EbslForm>
          </div>
        </div>
      </div>
    </section>
  );
}
