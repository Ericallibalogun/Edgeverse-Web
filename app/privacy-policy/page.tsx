import type { Metadata } from "next";
import Legal from "@/components/Legal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy", description: "How EBSL collects, uses and protects personal data under the Nigeria Data Protection Act.", alternates: { canonical: "/privacy-policy" } };

// TODO(EBSL): have counsel review before go-live.
export default function Privacy() {
  return (
    <Legal title="Privacy Policy" updated="February 2026">
      <p>{site.name} (&ldquo;EBSL&rdquo;, &ldquo;we&rdquo;) respects your privacy. This policy explains what personal data we collect through this website, why, and your rights under the Nigeria Data Protection Act 2023 (NDPA).</p>
      <h2>What we collect</h2>
      <ul>
        <li>Details you submit in our forms: name, company, email, phone, and the content of your message or request.</li>
        <li>CVs and cover letters submitted through the Careers page.</li>
        <li>Your email address if you subscribe to our newsletter.</li>
        <li>Basic, aggregated analytics about how the site is used, if analytics are enabled.</li>
      </ul>
      <h2>How we use it</h2>
      <p>We use your data to respond to enquiries, deliver services you request, process job applications, and send newsletters you have subscribed to. We do not sell personal data.</p>
      <h2>Who we share it with</h2>
      <p>Trusted processors that help us run the site and communicate with you, such as our email delivery provider, newsletter platform and live-chat provider, under appropriate data-processing terms.</p>
      <h2>How long we keep it</h2>
      <p>Enquiries are kept for as long as needed to respond and maintain a business relationship. Unsuccessful job applications are kept for up to 12 months unless you ask us to delete them sooner.</p>
      <h2>Your rights</h2>
      <p>You may request access to, correction of, or deletion of your personal data, object to processing, or withdraw consent at any time. Newsletter emails include an unsubscribe link.</p>
      <h2>Contact</h2>
      <p>Email <a href={`mailto:${site.email}`}>{site.email}</a> or write to us at {site.address}.</p>
    </Legal>
  );
}
