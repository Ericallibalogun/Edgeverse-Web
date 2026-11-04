"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Page motion, kept deliberately small: each section's parts rise in once as it enters
 * (heading, then text, then picture, via --d delays), and the hero counters count up.
 * Hidden start states live in CSS under prefers-reduced-motion: no-preference, so a page
 * with reduced motion, or without script, is already the finished page.
 */
export default function Effects() {
  const path = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("js-off");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-in)"));
    if (reduce || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
    reveals.forEach((el) => io.observe(el));

    const cio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement, end = Number(el.dataset.count), t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / 1400);
        el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString();
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      cio.unobserve(el);
    }), { threshold: 0.6 });
    document.querySelectorAll<HTMLElement>("[data-count]").forEach((c) => cio.observe(c));

    return () => { io.disconnect(); cio.disconnect(); };
  }, [path]);

  return null;
}
