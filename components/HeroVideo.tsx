"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { liteMode, afterLoad } from "@/lib/perf";

const FADE = 1.5; // seconds of crossfade between the end of one pass and the start of the next

/**
 * Ambient hero video that loops seamlessly: two stacked copies crossfade, so the end of the
 * clip (dusk) dissolves into its start (golden hour) instead of cutting.
 * Performance: the poster paints first; the video is only attached once the page has loaded
 * and the browser is idle, and the second copy only when the first nears its end. Data-saver, 2G,
 * phones and reduced motion keep the poster. Pauses when scrolled away; a pause/play
 * control is provided because the motion runs longer than 5 seconds (WCAG 2.2.2).
 */
export default function HeroVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const a = useRef<HTMLVideoElement>(null);
  const b = useRef<HTMLVideoElement>(null);
  const active = useRef<0 | 1>(0);
  const fading = useRef(false);
  const visible = useRef(false);
  const [front, setFront] = useState<0 | 1>(0);
  const [allowed, setAllowed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false); // first frame is on screen: safe to cover the still
  const userPaused = useRef(false);

  useEffect(() => {
    const vids = [a.current!, b.current!];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || liteMode() || window.innerWidth < 768) return;
    let io: IntersectionObserver | undefined;
    let gone = false;

    const cur = () => vids[active.current];
    const play = () => { if (!userPaused.current && visible.current) cur().play().then(() => setPlaying(true)).catch(() => {}); };
    const attach = (v: HTMLVideoElement) => { if (!v.src) { v.src = src; v.load(); } };

    const onTime = () => {
      const v = cur();
      if (!v.duration) return;
      const next = vids[active.current ^ 1];
      if (v.currentTime > v.duration - FADE - 4) attach(next); // fetch the second copy just ahead of the fade
      if (fading.current || v.currentTime < v.duration - FADE) return;
      fading.current = true;
      const nextIdx = (active.current ^ 1) as 0 | 1;
      next.currentTime = 0;
      next.play().catch(() => {});
      setFront(nextIdx); // CSS crossfades the opacity
      active.current = nextIdx;
      window.setTimeout(() => { v.pause(); v.currentTime = 0; fading.current = false; }, FADE * 1000 + 100);
    };

    afterLoad(() => {
      if (gone) return;
      setAllowed(true);
      attach(vids[0]);
      vids[0].addEventListener("playing", () => setStarted(true), { once: true });
      vids.forEach((v) => v.addEventListener("timeupdate", onTime));
      io = new IntersectionObserver(([e]) => {
        visible.current = e.isIntersecting;
        if (e.isIntersecting) play();
        else { vids.forEach((v) => v.pause()); setPlaying(false); }
      }, { threshold: 0.25 });
      io.observe(vids[0]);
    });

    return () => { gone = true; io?.disconnect(); vids.forEach((v) => v.removeEventListener("timeupdate", onTime)); };
  }, [src]);

  const toggle = () => {
    const vids = [a.current!, b.current!];
    const v = vids[active.current];
    if (v.paused) {
      userPaused.current = false;
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      userPaused.current = true;
      vids.forEach((x) => x.pause());
      setPlaying(false);
    }
  };

  const vid = (ref: React.RefObject<HTMLVideoElement | null>, idx: 0 | 1) => (
    <video ref={ref} muted playsInline preload="none"
      aria-hidden="true" className={`${front === idx ? "is-front" : ""}${started ? " is-started" : ""}`} style={{ ["--fade" as string]: `${FADE}s` }} />
  );

  return (
    <div className="hero-video" role="img" aria-label={label}>
      {/* The still paints first at high priority (it is the page's largest element); video fades in over it. */}
      <Image className="hero-video-still" src={poster} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
      {vid(a, 0)}
      {vid(b, 1)}
      {allowed && (
        <button type="button" className="hero-video-btn" onClick={toggle} aria-label={playing ? "Pause background video" : "Play background video"}>
          <Icon name={playing ? "pause" : "play"} />
        </button>
      )}
    </div>
  );
}
