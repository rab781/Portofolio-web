## 2025-02-23 - optimize-mouse-interaction
**Learning:** High-frequency events like `mousemove` trigger expensive re-renders when using `useState`. Using `framer-motion`'s `useMotionValue` and `useTransform` allows updating animations completely outside the React render loop.
**Action:** For interactive animations dependent on pointer events, prefer `useMotionValue` over React state and decompose complex components so only affected children update via `useMotionValueEvent` or direct binding.
## 2025-02-23 - optimize-layout-thrashing
**Learning:** Checking `getBoundingClientRect()` inside `mousemove` handlers forces layout recalculation (reflow) on every event, which is expensive. For fixed or absolute elements that don't scroll with the page, caching the rect on mount/resize is safe and significantly improves performance.
**Action:** Always cache `getBoundingClientRect` results for interactive elements that have stable viewport positioning, and throttle style updates using `requestAnimationFrame`.
