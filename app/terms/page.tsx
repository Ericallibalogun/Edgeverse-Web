import type { Metadata } from "next";
import Legal from "@/components/Legal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Service", description: "Terms governing use of the EBSL website.", alternates: { canonical: "/terms" } };

// TODO(EBSL): have counsel review before go-live.
export default function Terms() {
  return (
    <Legal title="Terms of Service" updated="February 2026">
      <p>These terms govern your use of {site.url.replace("https://", "")}, operated by {site.name}. By using the site you agree to them.</p>
      <h2>Use of the site</h2>
      <p>You may use this site for lawful purposes only. You must not attempt to disrupt it, gain unauthorised access, or submit false or malicious information through its forms.</p>
      <h2>Information on this site</h2>
      <p>Content is provided for general information and does not constitute professional advice. Service scope, pricing and timelines are confirmed only in a written proposal or contract.</p>
      <h2>Intellectual property</h2>
      <p>The EBSL name, logo, content and design are owned by EBSL or its licensors. Partner and OEM trademarks belong to their respective owners and are used to indicate partnership.</p>
      <h2>Third-party links</h2>
      <p>Links to social platforms and partner sites are provided for convenience; we are not responsible for their content or practices.</p>
      <h2>Liability</h2>
      <p>To the extent permitted by law, EBSL is not liable for losses arising from use of this website.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Federal Republic of Nigeria.</p>
      <h2>Contact</h2>
      <p><a href={`mailto:${site.email}`}>{site.email}</a> · {site.phone}</p>
    </Legal>
  );
}
