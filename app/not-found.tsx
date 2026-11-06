import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/Icon";
import { HeroBg } from "@/components/ui";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="hero nf">
      <HeroBg orbs={2} />
      <div className="container">
        <p className="code" aria-hidden="true">404</p>
        <h1 className="h2">This page took a different route.</h1>
        <p className="lead mx-auto">The link may be old or mistyped. Let&apos;s get you somewhere useful.</p>
        <div className="hero-actions" style={{ justifyContent: "center", marginTop: 32 }}>
          <Link className="btn" href="/">Back to home <Arrow /></Link>
          <Link className="btn btn--outline" href="/services">Explore services</Link>
          <Link className="btn btn--outline" href="/contact">Contact us</Link>
        </div>
      </div>
    </section>
  );
}
