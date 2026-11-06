# 002 · Remove the visible-hidden-visible flash on load (HIGH)
Commit: 7536333 · Status: DONE

**Problem.** `<html class="js-off">` is removed in a React effect after hydration, so SSR content paints visible, is hidden, then fades in. The hero photo (LCP) is included.

**Fix.**
1. Inline script in `<head>` (app/layout.tsx) removes `js-off` before first paint: `document.documentElement.classList.remove('js-off')`. No-JS visitors keep the visible fallback.
2. The hero never waits for JS: hero parts use a CSS-only load animation class `.intro` (keyframe with `backwards` fill and a 0–240ms stagger) instead of `.reveal`.

**Verify.** Throttle CPU 6x, reload: no blink; hero text rises once.
