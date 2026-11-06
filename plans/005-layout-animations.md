# 005 · Replace layout-property animations (LOW)
Commit: 7536333 · Status: DONE

- WhatsApp button label animated `max-width` (360ms). Replace with `clip-path: inset()` on the pill, label always laid out, icon pinned right via `flex-direction: row-reverse`; 300ms var(--ease-out).
- Mobile menu accordion animates `grid-template-rows`. Kept on purpose (content must push items below it; low frequency); shortened from 300ms to 240ms.
