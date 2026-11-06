"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Icon, { Arrow } from "./Icon";
import { nav, sectionFor, services, site, socials, waChat, type NavLink } from "@/lib/site";

function SubLink({ l, onClick }: { l: NavLink; onClick?: () => void }) {
  return l.external ? (
    <a href={l.href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      {l.label} <Icon name="arrow-ur" className="chev" /><span className="sr-only">(opens in new tab)</span>
    </a>
  ) : (
    <Link href={l.href} onClick={onClick}>{l.label}</Link>
  );
}

export function SocialLinks({ channel = false }: { channel?: boolean }) {
  return (
    <>
      {socials.map((s) => (
        <a key={s.key} href={site.social[s.key]} target="_blank" rel="noopener noreferrer" aria-label={`EBSL on ${s.name} (opens in new tab)`}>
          <Icon name={s.key} />
        </a>
      ))}
      <a href={channel ? site.social.whatsappChannel : waChat} target="_blank" rel="noopener noreferrer"
        aria-label={channel ? "EBSL WhatsApp TV Channel (opens in new tab)" : "Chat with EBSL on WhatsApp (opens in new tab)"}>
        <Icon name="whatsapp" />
      </a>
    </>
  );
}

export default function Header() {
  const path = usePathname();
  const active = sectionFor(path);
  const [open, setOpen] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const [acc, setAcc] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeT = useRef<ReturnType<typeof setTimeout>>(undefined);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close menus on navigation
  useEffect(() => { setOpen(null); setDrawer(false); }, [path]);

  // A soft shadow once the page scrolls, so the sticky bar separates from content beneath it.
  useEffect(() => {
    const run = () => setScrolled(window.scrollY > 8);
    run();
    addEventListener("scroll", run, { passive: true });
    return () => removeEventListener("scroll", run);
  }, []);

  // Publish the header's real height (it changes when the top bar wraps) for full-screen heroes.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const set = () => document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (!(e.target as Element).closest(".nav-item.has-dd")) setOpen(null); };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", drawer);
    if (drawer) setTimeout(() => drawerRef.current?.querySelector<HTMLElement>(".drawer-close")?.focus(), 50);
  }, [drawer]);

  const closeDrawer = useCallback(() => { setDrawer(false); toggleRef.current?.focus(); }, []);

  const ddKeys = (label: string) => (e: KeyboardEvent<HTMLLIElement>) => {
    const links = Array.from(e.currentTarget.querySelectorAll<HTMLAnchorElement>(".dropdown a"));
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "Escape") { setOpen(null); e.currentTarget.querySelector<HTMLButtonElement>(".nav-link")?.focus(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setOpen(label); requestAnimationFrame(() => (links[i + 1] || links[0])?.focus()); }
    else if (e.key === "ArrowUp") { e.preventDefault(); (links[i - 1] || links[links.length - 1])?.focus(); }
  };

  const drawerKeys = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") closeDrawer();
    if (e.key === "Tab") {
      const f = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("a, button")).filter((x) => x.offsetParent !== null);
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header ref={headerRef} className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="topbar">
          <div className="container">
            <div className="topbar-contact">
              <a href={`tel:${site.phoneHref}`}><Icon name="phone" /><span>{site.phone}</span></a>
              <a className="hide-sm" href={`mailto:${site.email}`}><Icon name="mail" /><span>{site.email}</span></a>
            </div>
            <div className="social"><SocialLinks /></div>
          </div>
        </div>

        <div className="container nav-row">
          <Link className="brand" href="/" aria-label="EBSL home">
            <Image src="/img/logo-dark.webp" alt="Edgeverve Business Solutions" width={108} height={40} style={{ width: "auto" }} priority />
          </Link>

          <nav className="nav" aria-label="Primary">
            <ul className="nav-list">
              {nav.map((item) => {
                const isAct = item.section === active;
                if (!item.children && !item.mega) {
                  return (
                    <li className="nav-item" key={item.label}>
                      <Link className="nav-link" href={item.href} aria-current={isAct ? "page" : undefined}>{item.label}</Link>
                    </li>
                  );
                }
                const id = `dd-${item.label.toLowerCase()}`;
                const isOpen = open === item.label;
                return (
                  <li key={item.label} className={`nav-item has-dd${isOpen ? " is-open" : ""}${isAct ? " is-active" : ""}`}
                    onMouseEnter={() => { clearTimeout(closeT.current); setOpen(item.label); }}
                    onMouseLeave={() => { closeT.current = setTimeout(() => setOpen((o) => (o === item.label ? null : o)), 120); }}
                    onKeyDown={ddKeys(item.label)}
                    onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen((o) => (o === item.label ? null : o)); }}>
                    <button className="nav-link" type="button" aria-expanded={isOpen} aria-controls={id}
                      onClick={() => setOpen(isOpen ? null : item.label)}>
                      {item.label}<Icon name="chev" className="chev" />
                    </button>
                    {item.mega ? (
                      <div className="dropdown dropdown--mega" id={id}>
                        {services.map((s) => (
                          <Link key={s.slug} href={s.href}>
                            <span>{s.name}<small>{s.short}</small></span>
                            {s.isNew && <span className="badge-new">New</span>}
                          </Link>
                        ))}
                        <Link className="mega-foot" href="/services">
                          <span><strong>All services</strong>: see how they fit together</span><Icon name="arrow" />
                        </Link>
                      </div>
                    ) : (
                      <div className="dropdown" id={id}>
                        {item.children!.map((l) => <SubLink key={l.label} l={l} />)}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="header-cta">
            <Link className="btn btn--sm" href="/service-request">Get Started <Arrow /></Link>
            <button ref={toggleRef} className="menu-toggle" type="button" aria-expanded={drawer} aria-controls="drawer"
              aria-label="Open menu" onClick={() => setDrawer(true)}><span /></button>
          </div>
        </div>
      </header>

      <div ref={drawerRef} className={`drawer${drawer ? " is-open" : ""}`} id="drawer" data-lenis-prevent role="dialog" aria-modal="true"
        aria-label="Site menu" aria-hidden={!drawer} inert={!drawer} onKeyDown={drawerKeys}>
        <div className="drawer-top">
          <Link className="brand" href="/" onClick={closeDrawer}>
            <Image src="/img/logo-light.webp" alt="EBSL home" width={108} height={40} style={{ width: "auto" }} />
          </Link>
          <button className="drawer-close" type="button" aria-label="Close menu" onClick={closeDrawer}><Icon name="x" /></button>
        </div>
        <ul className="drawer-list">
          {nav.map((item) => {
            if (!item.children && !item.mega) {
              return <li key={item.label}><Link href={item.href} onClick={closeDrawer}>{item.label}</Link></li>;
            }
            const links: NavLink[] = item.mega
              ? [...services.map((s) => ({ label: s.name, href: s.href })), { label: "All services", href: "/services" }]
              : item.children!;
            const id = `m-${item.label.toLowerCase()}`;
            const exp = acc === item.label;
            return (
              <li key={item.label}>
                <button className="drawer-acc" type="button" aria-expanded={exp} aria-controls={id}
                  onClick={() => setAcc(exp ? null : item.label)}>
                  {item.label}<Icon name="plus" />
                </button>
                <div className="drawer-sub" id={id}>
                  <ul>{links.map((l) => <li key={l.label}><SubLink l={l} onClick={closeDrawer} /></li>)}</ul>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="drawer-foot">
          <Link className="btn btn--block" href="/service-request" onClick={closeDrawer}>Get Started <Arrow /></Link>
          <a className="btn btn--wa btn--block" href={waChat} target="_blank" rel="noopener noreferrer"><Icon name="whatsapp" /> Chat on WhatsApp</a>
          <div className="social"><SocialLinks /></div>
        </div>
      </div>
    </>
  );
}
