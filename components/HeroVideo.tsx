"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const FADE = 1.5; // seconds of crossfade between the end of one pass and the start of the next

/**
 * Ambient hero video that loops seamlessly: two stacked copies crossfade, so the end of the
 * clip (dusk) dissolves into its start (golden hour) instead of cutting.
 * Reduced-motion visitors get the poster only. Pauses when scrolled away; a pause/play
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
  const userPaused = useRef(false);

  useEffect(() => {
    const vids = [a.current!, b.current!];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAllowed(true);

    const cur = () => vids[active.current];
    const play = () => { if (!userPaused.current && visible.current) cur().play().then(() => setPlaying(true)).catch(() => {}); };

    const onTime = () => {
      const v = cur();
      if (fading.current || !v.duration || v.currentTime < v.duration - FADE) return;
      fading.current = true;
      const nextIdx = (active.current ^ 1) as 0 | 1;
      const next = vids[nextIdx];
      next.currentTime = 0;
      next.play().catch(() => {});
      setFront(nextIdx); // CSS crossfades the opacity
      active.current = nextIdx;
      window.setTimeout(() => { v.pause(); v.currentTime = 0; fading.current = false; }, FADE * 1000 + 100);
    };
    vids.forEach((v) => v.addEventListener("timeupdate", onTime));

    const io = new IntersectionObserver(([e]) => {
      visible.current = e.isIntersecting;
      if (e.isIntersecting) play();
      else { vids.forEach((v) => v.pause()); setPlaying(false); }
    }, { threshold: 0.25 });
    io.observe(vids[0]);

    return () => { io.disconnect(); vids.forEach((v) => v.removeEventListener("timeupdate", onTime)); };
  }, []);

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
    <video ref={ref} poster={poster} muted playsInline preload={idx === 0 ? "metadata" : "auto"}
      aria-hidden="true" className={front === idx ? "is-front" : ""} style={{ ["--fade" as string]: `${FADE}s` }}>
      <source src={src} type="video/mp4" />
    </video>
  );

  return (
    <div className="hero-video" role="img" aria-label={label}>
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
