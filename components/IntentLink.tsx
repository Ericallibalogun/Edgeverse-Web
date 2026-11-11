"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps } from "react";

/**
 * A Link that prefetches on intent (hover, focus, touch) instead of on visibility.
 * For link-dense chrome (menus, drawer, footer): visibility prefetching there fetches and
 * processes dozens of routes during page load, which costs bandwidth and main-thread time.
 */
export default function IntentLink({ href, onPointerEnter, onFocus, onTouchStart, ...rest }: ComponentProps<typeof Link> & { href: string }) {
  const router = useRouter();
  // External sites (e.g. Fortis) open in a new tab and are never prefetched.
  if (/^https?:\/\//.test(href)) {
    const { prefetch: _p, replace: _r, scroll: _s, ...a } = rest as ComponentProps<typeof Link>;
    void _p; void _r; void _s;
    return <a href={href} target="_blank" rel="noopener noreferrer" {...(a as ComponentProps<"a">)} />;
  }
  const warm = () => router.prefetch(href);
  return (
    <Link href={href} prefetch={false} {...rest}
      onPointerEnter={(e) => { warm(); onPointerEnter?.(e); }}
      onFocus={(e) => { warm(); onFocus?.(e); }}
      onTouchStart={(e) => { warm(); onTouchStart?.(e); }} />
  );
}
