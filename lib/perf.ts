/**
 * Device / network hints so heavy extras (video, 3D, chat widget) adapt instead of
 * blocking the page on weak phones or bad connections. All checks are best-effort:
 * browsers that don't expose a hint are treated as capable.
 */
type Conn = { saveData?: boolean; effectiveType?: string };
type Nav = Navigator & { connection?: Conn; deviceMemory?: number };

const nav = () => (typeof navigator === "undefined" ? undefined : (navigator as Nav));

/** Data-saver on, or a 2G-class connection: skip optional heavy media entirely. */
export function liteMode() {
  const c = nav()?.connection;
  return !!c && (c.saveData === true || /(^|-)2g$/.test(c.effectiveType ?? ""));
}

/** A 3G-class connection: load lighter variants of heavy assets. */
export function slowNet() {
  const c = nav()?.connection;
  return liteMode() || (!!c && c.effectiveType === "3g");
}

/** Low-memory or few-core device: cap frame rate and resolution of continuous rendering. */
export function lowPower() {
  const n = nav();
  if (!n) return false;
  return (n.deviceMemory !== undefined && n.deviceMemory <= 4) || (n.hardwareConcurrency !== undefined && n.hardwareConcurrency <= 4);
}

/** Run once the page has fully loaded and the browser has a quiet moment. */
export function afterLoad(cb: () => void, timeout = 2500) {
  const idle = () => {
    const ric = (window as Window & { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (ric) ric(cb, { timeout }); else window.setTimeout(cb, 200);
  };
  if (document.readyState === "complete") idle();
  else window.addEventListener("load", idle, { once: true });
}
