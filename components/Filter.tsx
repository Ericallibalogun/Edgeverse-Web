"use client";

import { useState, type ReactNode } from "react";

/** Pill filter over children that carry data-cat. Hides non-matching items without re-rendering them. */
export default function Filter({ options, label, children, className = "grid grid-3" }: { options: string[]; label: string; children: ReactNode; className?: string }) {
  const [v, setV] = useState("all");
  const key = v.toLowerCase().replace(/\s+/g, "-");
  return (
    <>
      <div className="filters" role="radiogroup" aria-label={label}>
        {["all", ...options].map((o) => (
          <label className="choice" key={o}>
            <input type="radio" name={`filter-${label}`} value={o} checked={v === o} onChange={() => setV(o)} />
            <span>{o === "all" ? "All" : o}</span>
          </label>
        ))}
      </div>
      <div className={className} data-filter={key}>{children}</div>
      <style>{v === "all" ? "" : `[data-filter="${key}"] > [data-cat]:not([data-cat~="${key}"]) { display: none; }`}</style>
    </>
  );
}
