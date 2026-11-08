import type { NextConfig } from "next";

// Old .html URLs (current live site + spec paths) → new routes, so existing links and SEO keep working.
const legacy: [string, string][] = [
  ["/index.html", "/"], ["/about.html", "/about"], ["/services.html", "/services"],
  ["/infrastructure.html", "/services/infrastructure"], ["/consulting.html", "/services/consulting"],
  ["/cybersecurity.html", "/services/cybersecurity"], ["/outsourcing.html", "/services/outsourcing"],
  ["/procurement.html", "/services/procurement"], ["/training.html", "/services/training"], ["/software.html", "/services/software"],
  ["/agentic-ai.html", "/agentic-ai"], ["/phlyp.html", "/phlyp-pay"], ["/edgepay.php", "/phlyp-pay"],
  ["/service-request.html", "/service-request"], ["/servicerequest.html", "/service-request"], ["/demo.html", "/demo"],
  ["/consultation.html", "/consultation"], ["/training-enrol.html", "/training-enrol"], ["/enrol.html", "/training-enrol"],
  ["/contact.html", "/contact"], ["/careers.html", "/careers"], ["/insights.html", "/insights"], ["/blog.html", "/blog"],
  ["/gallery.html", "/gallery"], ["/privacy-policy.html", "/privacy-policy"], ["/terms.html", "/terms"],
];

const nextConfig: NextConfig = {
  // WebP only: the sources are already WebP, and AVIF encoding is slow enough to delay first views.
  images: { formats: ["image/webp"], minimumCacheTTL: 86400 },
  async redirects() {
    return legacy.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
      ],
    }];
  },
};

export default nextConfig;
