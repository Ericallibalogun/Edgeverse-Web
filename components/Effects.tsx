"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Page-level motion: scroll reveals, counters, marquee pause, cursor, magnetic buttons, QR tilt.
 * Re-binds on every route change. Respects prefers-reduced-motion.
 */
export default function Effects() {
  const path = usePathname();

  useEffect(() => {
    document.documentElement.classList.remove("js-off");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(document.querySelectorAll<T & Element>(s)) as T[];
    const cleanups: (() => void)[] = [];

    // Reveal
    const reveals = $$(".reveal:not(.is-in), .reveal-split:not(.is-in)");
    if (reduce || !("IntersectionObserver" in window)) reveals.forEach((el) => el.classList.add("is-in"));
    else {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
      reveals.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    // Counters
    const counters = $$<HTMLElement>("[data-count]");
    if (!reduce) {
      const cio = new IntersectionObserver((es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement, end = Number(el.dataset.count), t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / 1600);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 4))).toLocaleString();
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        cio.unobserve(el);
      }), { threshold: 0.5 });
      counters.forEach((c) => { c.textContent = "0"; cio.observe(c); });
      cleanups.push(() => cio.disconnect());
    }

    // Marquee: pause toggle + pause offscreen
    $$<HTMLElement>(".marquee").forEach((m) => {
      const track = m.querySelector<HTMLElement>(".marquee-track");
      const btn = m.parentElement?.querySelector<HTMLButtonElement>(".marquee-toggle");
      const onBtn = () => {
        const paused = m.classList.toggle("is-paused");
        btn!.setAttribute("aria-pressed", String(paused));
        btn!.querySelector(".sr-only")!.textContent = paused ? "Play logo carousel" : "Pause logo carousel";
      };
      btn?.addEventListener("click", onBtn);
      const mio = new IntersectionObserver(([e]) => {
        if (track) track.style.animationPlayState = e.isIntersecting && !m.classList.contains("is-paused") ? "" : "paused";
      });
      mio.observe(m);
      cleanups.push(() => { btn?.removeEventListener("click", onBtn); mio.disconnect(); });
    });

    if (!reduce && fine) {
      // Magnetic buttons
      $$<HTMLElement>("[data-magnetic]").forEach((b) => {
        const mv = (e: MouseEvent) => {
          const r = b.getBoundingClientRect();
          b.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.18}px ${(e.clientY - r.top - r.height / 2) * 0.3}px`;
        };
        const lv = () => (b.style.translate = "");
        b.addEventListener("mousemove", mv); b.addEventListener("mouseleave", lv);
        cleanups.push(() => { b.removeEventListener("mousemove", mv); b.removeEventListener("mouseleave", lv); });
      });
      // QR tilt
      $$<HTMLElement>("[data-tilt]").forEach((c) => {
        const mv = (e: MouseEvent) => {
          const r = c.getBoundingClientRect();
          c.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 16}deg`);
          c.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 16}deg`);
        };
        const lv = () => { c.style.removeProperty("--ry"); c.style.removeProperty("--rx"); };
        c.addEventListener("mousemove", mv); c.addEventListener("mouseleave", lv);
        cleanups.push(() => { c.removeEventListener("mousemove", mv); c.removeEventListener("mouseleave", lv); });
      });
    }
    return () => cleanups.forEach((f) => f());
  }, [path]);

  // Cursor follower, mounted once
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const c = document.createElement("div");
    c.className = "cursor"; c.setAttribute("aria-hidden", "true"); document.body.appendChild(c);
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const mv = (e: MouseEvent) => { x = e.clientX; y = e.clientY; c.classList.add("is-on"); };
    const ov = (e: MouseEvent) => c.classList.toggle("is-hover", !!(e.target as Element).closest("a, button, .svc-card, summary, label.choice"));
    const out = () => c.classList.remove("is-on");
    const loop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; c.style.transform = `translate3d(${cx}px, ${cy}px, 0)`; raf = requestAnimationFrame(loop); };
    addEventListener("mousemove", mv, { passive: true }); document.addEventListener("mouseover", ov); document.addEventListener("mouseleave", out);
    loop();
    return () => { cancelAnimationFrame(raf); removeEventListener("mousemove", mv); document.removeEventListener("mouseover", ov); document.removeEventListener("mouseleave", out); c.remove(); };
  }, []);

  return null;
}
