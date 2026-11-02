import Image from "next/image";
import Link from "next/link";
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
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/insights">Insights</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/contact?subject=Partnership">Partner With Us</Link></li>
              </ul>
            </div>
            <div>
              <h3>Services</h3>
              <ul>
                {footerServices.map((s) => (
                  <li key={s.slug}><Link href={s.href}>{s.name.split(" (")[0].replace(" & Advisory", "").replace(" Solutions", "")}</Link></li>
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
          <div className="footer-word" aria-hidden="true">EBSL</div>
        </div>
        <div className="footer-bottom container">
          <span>© {new Date().getFullYear()} EBSL | Edgeverve Business Solutions Ltd. All rights reserved.</span>
          <nav aria-label="Legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
            <a href="/sitemap.xml">Sitemap</a>
          </nav>
        </div>
      </footer>
      <a className="wa-float" href={waChat} target="_blank" rel="noopener noreferrer" aria-label="Chat with EBSL on WhatsApp (opens in new tab)">
        <Icon name="whatsapp" /><span className="wa-label">Chat with us</span>
      </a>
    </>
  );
}
