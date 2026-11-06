# 006 · Align the ease-out token (LOW)
Commit: 7536333 · Status: DONE

`--ease-out: cubic-bezier(.22, 1, .36, 1)` → `cubic-bezier(0.23, 1, 0.32, 1)` (app/globals.css :root). All UI transitions already reference the token.
