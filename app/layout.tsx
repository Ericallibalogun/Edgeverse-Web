import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import Effects from "@/components/Effects";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "EBSL | IT Infrastructure, Consulting, Cybersecurity & AI | Lagos, Nigeria", template: "%s | EBSL" },
  description: "EBSL delivers end-to-end IT infrastructure, consulting, cybersecurity, AI solutions and training for the modern Nigerian and African enterprise.",
  openGraph: { type: "website", siteName: "EBSL | Edgeverve Business Solutions", locale: "en_NG" },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/img/favicon.png", apple: "/img/favicon.png" },
};

export const viewport: Viewport = { themeColor: "#001A33" };

const orgLd = {
  "@context": "https://schema.org", "@type": "Organization", name: site.name, alternateName: site.short, url: site.url,
  logo: `${site.url}/img/logo-dark.webp`, email: site.email, telephone: site.phoneHref,
  address: { "@type": "PostalAddress", streetAddress: "17C Saliu Aina Lawal Way, off Mobile Road", addressLocality: "Lekki", addressRegion: "Lagos", addressCountry: "NG" },
  sameAs: Object.entries(site.social).filter(([k]) => k !== "whatsappChannel").map(([, v]) => v),
};

const ga = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" data-scroll-behavior="smooth" className={`js-off ${jakarta.variable}`} suppressHydrationWarning>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <Effects />
        {site.tawkId && (
          <Script id="tawk" strategy="lazyOnload">{`
            var Tawk_API=Tawk_API||{};Tawk_API.customStyle={visibility:{desktop:{position:'bl',xOffset:20,yOffset:20},mobile:{position:'bl',xOffset:10,yOffset:10}}};
            (function(){var s=document.createElement('script');s.async=true;s.src='https://embed.tawk.to/${site.tawkId}';s.charset='UTF-8';s.setAttribute('crossorigin','*');document.body.appendChild(s);})();
          `}</Script>
        )}
        {ga && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');`}</Script>
          </>
        )}
      </body>
    </html>
  );
}
