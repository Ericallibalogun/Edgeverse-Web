"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { QrPattern } from "./ui";

/*
 * Interface fragments of EBSL's own products, built in HTML rather than shown as fake screenshots.
 * Figures are illustrative sample data for the product view and add up (TODO(EBSL): swap for a real
 * NerveHUB / Phlyp Pay screenshot when available).
 */

const week = [
  { d: "Mon", opened: 18, closed: 17 }, { d: "Tue", opened: 22, closed: 23 }, { d: "Wed", opened: 15, closed: 16 },
  { d: "Thu", opened: 19, closed: 18 }, { d: "Fri", opened: 24, closed: 25 }, { d: "Sat", opened: 6, closed: 7 },
  { d: "Sun", opened: 4, closed: 4 },
];
const opened = week.reduce((a, b) => a + b.opened, 0);
const closed = week.reduce((a, b) => a + b.closed, 0);
const max = Math.max(...week.map((w) => Math.max(w.opened, w.closed)));

export function NerveHubPanel() {
  return (
    <div className="ui-panel" data-ui role="img" aria-label={`NerveHUB service desk, sample week: ${opened} tickets opened, ${closed} resolved, 99.98% uptime.`}>
      <div className="ui-head">
        <strong>NerveHUB</strong><span>Service desk · this week</span>
      </div>
      <div className="ui-kpis">
        <div><span>Uptime</span><b>99.98%</b></div>
        <div><span>Opened</span><b>{opened}</b></div>
        <div><span>Resolved</span><b>{closed}</b></div>
        <div><span>Within SLA</span><b>96%</b></div>
      </div>
      <div className="ui-chart" aria-hidden="true">
        {week.map((w) => (
          <div className="ui-col" key={w.d}>
            <div className="ui-bars">
              <i style={{ height: `${(w.opened / max) * 100}%` }} />
              <i className="c" style={{ height: `${(w.closed / max) * 100}%` }} />
            </div>
            <span>{w.d}</span>
          </div>
        ))}
      </div>
      <ul className="ui-list" aria-hidden="true">
        <li><span className="dot ok" />Firewall policy update, Lekki HQ<em>Resolved · 18 min</em></li>
        <li><span className="dot ok" />VPN access for new finance hire<em>Resolved · 42 min</em></li>
        <li><span className="dot wip" />Switch replacement, 3rd floor<em>Engineer on site</em></li>
      </ul>
    </div>
  );
}

const naira = (n: number) => "₦" + n.toLocaleString("en-NG");

export function PhlypPhone({ amount = 25000, merchant = "Lekki Grill House" }: { amount?: number; merchant?: string }) {
  return (
    <div className="ui-phone" data-ui aria-hidden="true">
      <div className="ui-phone-screen">
        <p className="ui-phone-top">Phlyp Pay</p>
        <p className="ui-phone-merchant">{merchant}</p>
        <p className="ui-phone-amount">{naira(amount)}</p>
        <div className="ui-phone-qr"><QrPattern seed={amount % 2147483646 || 7} /></div>
        <p className="ui-phone-hint">Scan with any phone camera</p>
        <span className="ui-phone-btn">Pay {naira(amount)}</span>
      </div>
    </div>
  );
}

/** The page's live thing: set an amount and watch the checkout and its QR code change. */
export function PhlypDemo() {
  const id = useId();
  const [raw, setRaw] = useState("25000");
  const amount = Math.min(10_000_000, Math.max(0, Number(raw.replace(/[^\d]/g, "")) || 0));
  const presets = [2500, 25000, 150000];
  return (
    <div className="phlyp-demo">
      <div className="phlyp-controls">
        <label htmlFor={id}>Try it: set an amount</label>
        <div className="amount-field">
          <span aria-hidden="true">₦</span>
          <input id={id} inputMode="numeric" value={amount ? amount.toLocaleString("en-NG") : ""} placeholder="0"
            onChange={(e) => setRaw(e.target.value)} aria-describedby={`${id}-out`} />
        </div>
        <div className="amount-presets" role="group" aria-label="Sample amounts">
          {presets.map((p) => (
            <button type="button" key={p} aria-pressed={amount === p} onClick={() => setRaw(String(p))}>{naira(p)}</button>
          ))}
        </div>
        <p id={`${id}-out`} aria-live="polite" className="amount-out">
          {amount ? <>Your customer scans once and pays <b>{naira(amount)}</b>. You get a notification with the reference.</> : "Enter an amount to generate a code."}
        </p>
      </div>
      <PhlypPhone amount={amount || 0} />
      <p className="sr-only"><Icon name="qr" /> The QR code on the phone updates for each amount.</p>
    </div>
  );
}

/* ---------- Grace AI: a sample agent run per job. Every run's counts add up to its total. ---------- */
type Step = { text: string; meta: string; state: "done" | "wait" };
type Run = { id: string; tab: string; goal: string; system: string; steps: Step[]; ask: string; approve: string };

const runs: Run[] = [
  {
    id: "finance", tab: "Finance", goal: "Reconcile October supplier invoices", system: "Sage, bank statements",
    steps: [
      { text: "Pulled 142 supplier invoices from Sage", meta: "09:02", state: "done" },
      { text: "Matched 138 invoices to purchase orders and payments", meta: "09:06", state: "done" },
      { text: "Flagged 4 mismatches totalling ₦2,412,500", meta: "09:07", state: "done" },
      { text: "Waiting for a finance lead to review the 4 flagged invoices", meta: "now", state: "wait" },
    ],
    ask: "4 invoices need a person before payment.", approve: "Review 4 invoices",
  },
  {
    id: "itops", tab: "IT ops", goal: "Clear overnight monitoring alerts", system: "NerveHUB, Microsoft 365",
    steps: [
      { text: "Read 37 alerts raised between 22:00 and 06:00", meta: "06:00", state: "done" },
      { text: "Resolved 31 with standard runbooks (disk clean-up, service restarts)", meta: "06:09", state: "done" },
      { text: "Opened 5 tickets with logs attached for the service desk", meta: "06:11", state: "done" },
      { text: "Paged the on-call engineer for 1 firewall alert at Lekki HQ", meta: "now", state: "wait" },
    ],
    ask: "1 alert is outside the agent's limits.", approve: "Hand to on-call engineer",
  },
  {
    id: "service", tab: "Support", goal: "Answer today's WhatsApp enquiries", system: "WhatsApp Business, CRM",
    steps: [
      { text: "Received 64 WhatsApp messages since 08:00", meta: "12:00", state: "done" },
      { text: "Answered 52 order-status and opening-hours questions", meta: "12:00", state: "done" },
      { text: "Drafted 9 refund replies under the ₦50,000 policy limit", meta: "12:01", state: "done" },
      { text: "Passed 3 complaints to a staff member with the full thread", meta: "now", state: "wait" },
    ],
    ask: "9 refunds are drafted and waiting for sign-off.", approve: "Approve 9 refunds",
  },
];

export function AgentRunDemo() {
  const [active, setActive] = useState(runs[0].id);
  const [play, setPlay] = useState(false);
  const [quick, setQuick] = useState(false);
  const [ind, setInd] = useState<{ x: number; w: number } | null>(null);
  const [sliding, setSliding] = useState(false);
  const slideT = useRef<ReturnType<typeof setTimeout>>(undefined);
  const run = runs.find((r) => r.id === active)!;
  const baseId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Play the step-by-step sequence once, when the panel first comes into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) { setPlay(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setPlay(true); io.disconnect(); } }, { rootMargin: "0px 0px -25% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Sliding indicator under the active tab.
  useLayoutEffect(() => {
    const measure = () => {
      const btn = tabsRef.current?.querySelector<HTMLButtonElement>('[aria-selected="true"]');
      if (btn) setInd({ x: btn.offsetLeft, w: btn.offsetWidth });
    };
    measure();
    addEventListener("resize", measure);
    return () => removeEventListener("resize", measure);
  }, [active]);

  const choose = (id: string) => {
    if (id === active) return;
    setPlay(true); setQuick(true); setSliding(true); setActive(id);
    clearTimeout(slideT.current);
    slideT.current = setTimeout(() => setSliding(false), 260);
  };
  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const next = runs[(i + (e.key === "ArrowRight" ? 1 : runs.length - 1)) % runs.length];
    choose(next.id);
    document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
  };
  return (
    <div className="agent-demo" data-ui ref={rootRef} data-play={play || undefined} data-quick={quick || undefined}>
      <div className={`agent-tabs${ind && sliding ? " is-sliding" : ""}`} role="tablist" aria-label="Sample agent runs" ref={tabsRef}>
        {ind && <span className="agent-tab-ind" aria-hidden="true" style={{ transform: `translateX(${ind.x}px) scaleX(${ind.w / 100})` }} />}
        {runs.map((r, i) => (
          <button key={r.id} id={`${baseId}-tab-${r.id}`} role="tab" type="button" aria-selected={r.id === active}
            aria-controls={`${baseId}-panel`} tabIndex={r.id === active ? 0 : -1}
            onClick={() => choose(r.id)} onKeyDown={(e) => onKey(e, i)}>{r.tab}</button>
        ))}
      </div>
      <div className="agent-run" data-ui role="tabpanel" id={`${baseId}-panel`} aria-labelledby={`${baseId}-tab-${run.id}`} key={run.id}>
        <div className="agent-head">
          <span className="agent-name">Grace AI agent</span>
          <span className="agent-status"><span className="dot wip" /> Waiting for approval</span>
        </div>
        <p className="agent-goal">{run.goal}</p>
        <p className="agent-sys">Working in {run.system}</p>
        <ol className="agent-steps">
          {run.steps.map((s, i) => (
            <li key={s.text} className={`is-${s.state}`} style={{ ["--i" as string]: i }}>
              <span className="agent-mark" aria-hidden="true">{s.state === "done" ? <Icon name="check" /> : <Icon name="clock" />}</span>
              <span className="agent-text">{s.text}</span>
              <span className="agent-meta">{s.meta}</span>
            </li>
          ))}
        </ol>
        <div className="agent-ask" style={{ ["--i" as string]: run.steps.length }}>
          <p>{run.ask}</p>
          <span className="agent-btn" aria-hidden="true">{run.approve}</span>
        </div>
        <p className="agent-note">Sample run for illustration</p>
      </div>
    </div>
  );
}
