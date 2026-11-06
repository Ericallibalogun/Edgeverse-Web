"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site motion layer.
 * 1. Lenis smooth scroll, driven by GSAP's ticker so ScrollTrigger and Lenis share one clock.
 *    In-page anchors scroll with an offset for the sticky header; scrolling stops while the
 *    mobile menu is open; each route starts at the top.
 * 2. Scroll-linked GSAP effects, rebuilt per route inside a gsap.context (cleaned up on leave):
 *    - hero frame eases back (scale + slight lift) as the hero scrolls away
 *    - photos drift inside their frames (parallax)
 *    - framework / timeline lists step in as each item crosses the viewport
 * Entrance reveals and counters stay in Effects.tsx (CSS keyframes), so the page is complete
 * without script. Everything here is skipped when the visitor prefers reduced motion.
 */
export default function Motion() {
  const path = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Smooth scroll: one instance for the whole session.
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      anchors: { offset: -headerOffset() },
    });
    lenisRef.current = lenis;
    document.documentElement.classList.add("has-lenis");

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Stop page scroll while the mobile menu (body.no-scroll) is open.
    const mo = new MutationObserver(() => {
      if (document.body.classList.contains("no-scroll")) lenis.stop(); else lenis.start();
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      mo.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("has-lenis");
    };
  }, []);

  // Per-route: reset scroll, then build scroll-linked effects.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!location.hash) lenis?.scrollTo(0, { immediate: true });
    else lenis?.scrollTo(location.hash, { offset: -headerOffset(), immediate: true });

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Hero frame eases back as the hero leaves.
      gsap.utils.toArray<HTMLElement>(".hero-fill .hero-frame:not(.hero-frame--ui), .svc-stage .svc-photo").forEach((frame) => {
        gsap.fromTo(frame, { scale: 1, yPercent: 0 }, {
          scale: 0.95, yPercent: -4, ease: "none", transformOrigin: "50% 100%",
          scrollTrigger: { trigger: frame, start: "top 20%", end: "bottom top", scrub: true },
        });
      });

      // Parallax: the picture drifts inside its frame. The frame clips; the media is overscaled.
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((wrap) => {
        const media = wrap.querySelector<HTMLElement>(":scope > img, :scope > .hero-video, :scope > span > img");
        if (!media) return;
        gsap.set(media, { scale: 1.14 });
        gsap.fromTo(media, { yPercent: -5 }, {
          yPercent: 5, ease: "none",
          scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // Bento: cells slide in one by one, tied to scroll position, so scrolling back up
      // plays the sequence in reverse. Photo enters from the left, the right column from
      // the right, the bottom row from below; the partner logos follow their card.
      gsap.utils.toArray<HTMLElement>(".bento").forEach((bento) => {
        const cell = (c: string) => bento.querySelector<HTMLElement>(`.bento-${c}`);
        const logos = bento.querySelectorAll<HTMLElement>(".logo-wall li");
        const narrow = matchMedia("(max-width: 640px)").matches; // single column: all from below
        const steps: [HTMLElement | null, gsap.TweenVars][] = [
          [cell("photo"), narrow ? { y: 80 } : { x: -120 }],
          [cell("navy"), narrow ? { y: 80 } : { x: 120 }],
          [cell("partners"), narrow ? { y: 80 } : { x: 120 }],
          [cell("blue"), { y: 100 }],
          [cell("light"), { y: 100 }],
        ];
        bento.querySelectorAll(".reveal").forEach((el) => el.classList.remove("reveal"));
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 1 },
          scrollTrigger: { trigger: bento, start: "top 88%", end: narrow ? "bottom 70%" : "bottom 85%", scrub: 0.8 },
        });
        steps.forEach(([el, from], i) => {
          if (el) tl.from(el, { ...from, opacity: 0, scale: 0.96 }, i * 0.45);
        });
        if (logos.length) tl.from(logos, { y: 24, opacity: 0, duration: 0.6, stagger: 0.12 }, 1.2);
      });

      // Lists that tell a sequence: each item steps in as it crosses the lower third.
      gsap.utils.toArray<HTMLElement>(".framework-list > li, .stack-list > li").forEach((item) => {
        item.classList.remove("reveal"); // this scrubbed step-in replaces the CSS entrance on these items
        gsap.fromTo(item, { opacity: 0.25, y: 24 }, {
          opacity: 1, y: 0, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 92%", end: "top 62%", scrub: 0.6 },
        });
      });
    });

    // Layout can settle after fonts/images; recompute trigger positions once it has.
    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 400);
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(t);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [path]);

  return null;
}

function headerOffset() {
  const h = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h"));
  return (Number.isFinite(h) ? h : 116) + 16;
}
