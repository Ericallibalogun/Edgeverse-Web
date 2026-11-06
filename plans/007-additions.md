# 007 · Missed opportunities (additive)
Commit: 7536333 · Status: DONE

1. **Hero photo settle.** `.hero-frame` enters with `scale(.98)` + opacity 0 → 1, 600ms var(--ease-out), 200ms delay; CSS-only (part of 002).
2. **Agent tab indicator.** One white pill behind the tabs moves with `transform: translateX(x) scaleX(w/100)` (base width 100px, origin left), 240ms var(--ease-out); measured from the active tab on change and resize. The pill shows only during the 240ms switch; at rest the selected tab keeps its own white background (readable without script, passes contrast checks).
3. **Press feedback.** `:active { transform: scale(.97) }` with 120ms ease-out on amount presets, choice pills and agent tabs.
