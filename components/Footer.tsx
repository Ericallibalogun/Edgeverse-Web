import Image from "next/image";
import IntentLink from "./IntentLink";
import Icon from "./Icon";
import { SocialLinks } from "./Header";
import { WaChannelButton } from "./ui";
import { site, svc, waChat } from "@/lib/site";


const footerServices = ["infrastructure", "consulting", "cybersecurity", "outsourcing", "training", "agentic-ai", "phlyp-pay"].map(svc);

export default function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Image src="/img/logo-light.webp" alt="Edgeverve Business Solutions" width={118} height={44} style={{ width: "auto" }} />
              <p>
                <strong style={{ color: "#fff" }}>{site.tagline}.</strong> End-to-end IT infrastructure, consulting, cybersecurity,
                AI and training, built for the modern Nigerian and African enterprise.
              </p>
              <WaChannelButton className="btn--sm" />
            </div>
            <div>
              <h3>Quick links</h3>
              <ul>
                <li><IntentLink href="/">Home</IntentLink></li>
                <li><IntentLink href="/about">About</IntentLink></li>
                <li><IntentLink href="/services">Services</IntentLink></li>
                <li><IntentLink href="/insights">Insights</IntentLink></li>
                <li><IntentLink href="/careers">Careers</IntentLink></li>
                <li><IntentLink href="/contact">Contact</IntentLink></li>
                <li><IntentLink href="/contact?subject=Partnership">Partner With Us</IntentLink></li>
              </ul>
            </div>
            <div>
              <h3>Services</h3>
              <ul>
                {footerServices.map((s) => (
                  <li key={s.slug}><IntentLink href={s.href}>{s.name.split(" (")[0].replace(" & Advisory", "").replace(" Solutions", "")}</IntentLink></li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Contact</h3>
              <ul className="footer-contact">
                <li><Icon name="pin" /><span>{site.address}</span></li>
                <li><Icon name="phone" /><a href={`tel:${site.phoneHref}`}>{site.phone}</a></li>
                <li><Icon name="mail" /><a href={`mailto:${site.email}`}>{site.email}</a></li>
              </ul>
              <div className="social"><SocialLinks channel /></div>
            </div>
          </div>
          <div className="footer-ebsl" aria-hidden="true"><span>EBSL</span></div>
        </div>
        <div className="footer-base">
        <div className="footer-bottom container">
          <span>© {new Date().getFullYear()} EBSL | Edgeverve Business Solutions Ltd. All rights reserved.</span>
          <nav aria-label="Legal">
            <IntentLink href="/privacy-policy">Privacy Policy</IntentLink>
            <IntentLink href="/terms">Terms of Service</IntentLink>
            <IntentLink href="/credits">Photo credits</IntentLink>
            <a href="/sitemap.xml">Sitemap</a>
          </nav>
        </div>
        </div>
      </footer>
      <a className="wa-float" href={waChat} target="_blank" rel="noopener noreferrer" aria-label="Chat with EBSL on WhatsApp (opens in new tab)">
        <Icon name="whatsapp" /><span className="wa-label">Chat with us</span>
      </a>
    </>
  );
}
