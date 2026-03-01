## 2025-02-23 - optimize-mouse-interaction
**Learning:** High-frequency events like `mousemove` trigger expensive re-renders when using `useState`. Using `framer-motion`'s `useMotionValue` and `useTransform` allows updating animations completely outside the React render loop.
**Action:** For interactive animations dependent on pointer events, prefer `useMotionValue` over React state and decompose complex components so only affected children update via `useMotionValueEvent` or direct binding.

## 2025-02-23 - avoid-getboundingclientrect-in-mousemove
**Learning:** Calling `getBoundingClientRect()` inside a `mousemove` event handler triggers synchronous layout recalculations (layout thrashing) on every mouse movement, which is a significant performance bottleneck.
**Action:** Cache the dimensions/positions from `getBoundingClientRect()` outside the `mousemove` handler, updating the cache only when necessary (e.g., on `resize`). Additionally, throttle the DOM style updates within the `mousemove` handler using `requestAnimationFrame`.

## 2025-02-23 - avoid-getboundingclientrect-cache-regression
**Learning:** While caching `getBoundingClientRect()` outside a `mousemove` handler prevents layout thrashing, it introduces functional regressions if the page is scrollable, because the returned values are relative to the viewport.
**Action:** When throttling high-frequency events (like `mousemove`) with `requestAnimationFrame`, evaluate layout measurements (e.g., `getBoundingClientRect()`) *inside* the `requestAnimationFrame` callback. This groups the read with the subsequent style writes in the animation frame, preventing synchronous layout thrashing during mouse movement while avoiding stale viewport-relative cache values.
