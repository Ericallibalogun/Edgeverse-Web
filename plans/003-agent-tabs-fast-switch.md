# 003 · Agent tabs: full sequence once, fast crossfade on switch (MEDIUM)
Commit: 7536333 · Status: DONE

**Problem.** Every tab switch replays a ~1.8s staggered sequence (420ms × 260ms stagger), and the first play runs on mount, off-screen.

**Fix.** components/ProductUI.tsx `AgentRunDemo`: start the sequence when the panel first enters the viewport (IntersectionObserver with rootMargin `0px 0px -25% 0px` → `data-play`; also set on first tab click); after the first tab switch set `data-quick`, where steps use a 150ms opacity fade with no stagger.

**Verify.** First scroll-in plays the sequence; clicking tabs swaps content in ~150ms.
