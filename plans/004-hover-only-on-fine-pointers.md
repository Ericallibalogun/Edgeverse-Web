# 004 · Gate hover movement to fine pointers (MEDIUM)
Commit: 7536333 · Status: DONE

**Problem.** Hover transforms on .btn, .btn .arrow, .svc-row .svc-go, .card, .post-card img, .soc-tile, .wa-float, .contact-tile stick after taps on touch screens.

**Fix.** Move every hover *transform* into `@media (hover: hover) and (pointer: fine) { … }`. Colour changes may stay global.

**Verify.** Chrome device mode (touch): tapping a card does not leave it lifted.
