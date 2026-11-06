# 001 · Entrances must not override hover transitions (HIGH)
Commit: 7536333 · Status: DONE

**Problem.** `.reveal { transition: opacity 700ms, transform 700ms; transition-delay: var(--d) }` (app/globals.css) replaces the `transition` of any element that also has `.btn` or `.card`. 14 buttons/cards hover at 700ms + delay, and button colour changes snap.

**Fix.** Drive the entrance with a keyframe animation instead of a transition, using `animation-fill-mode: backwards` so the end state is not held and the element's own `transition`/`transform` apply afterwards.
```css
@media (prefers-reduced-motion: no-preference) {
  html:not(.js-off) .reveal:not(.is-in) { opacity: 0; }
  .reveal.is-in { animation: rise-in 700ms var(--ease-out) var(--d, 0ms) backwards; }
}
@keyframes rise-in { from { opacity: 0; transform: translateY(24px); } }
```
**Verify.** Hover a revealed button: colour fades in ~240ms, lift in ~150ms, no delay.
