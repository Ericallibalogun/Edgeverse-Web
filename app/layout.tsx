import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import Effects from "@/components/Effects";
import Motion from "@/components/Motion";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { site } from "@/lib/site";
import "./globals.css";

// General Sans (Fontshare, ITF Free Font License: free for commercial use), self-hosted.
const generalSans = localFont({
  src: [
    { path: "./fonts/GeneralSans-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/GeneralSans-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/GeneralSans-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/GeneralSans-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-brand",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "Roboto", "sans-serif"],
});

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
  sameAs: Object.values(site.social),
};

const ga = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" data-scroll-behavior="smooth" className={`js-off ${generalSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Mark JS before first paint so scroll entrances start hidden without a visible-then-hidden flash */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('js-off')" }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <Effects />
        <Motion />
        {site.tawkId && (
          <Script id="tawk" strategy="lazyOnload">{`
            /* Chat widget is heavy: load it on the first interaction, or 8s after load at the latest. */
            window.Tawk_API=window.Tawk_API||{};Tawk_API.customStyle={visibility:{desktop:{position:'bl',xOffset:20,yOffset:20},mobile:{position:'bl',xOffset:10,yOffset:10}}};
            (function(){var done=false,ev=['pointerdown','keydown','scroll','touchstart','mousemove'];
              function go(){if(done)return;done=true;ev.forEach(function(e){removeEventListener(e,go)});
                var s=document.createElement('script');s.async=true;s.src='https://embed.tawk.to/${site.tawkId}';s.charset='UTF-8';s.setAttribute('crossorigin','*');document.body.appendChild(s);}
              ev.forEach(function(e){addEventListener(e,go,{once:true,passive:true})});setTimeout(go,8000);})();
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
