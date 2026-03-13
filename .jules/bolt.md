## 2025-03-05 - Evaluating Layout Measurements in requestAnimationFrame
**Learning:** When throttling high-frequency events (like `mousemove`) with `requestAnimationFrame`, evaluate layout measurements (e.g., `getBoundingClientRect()`) inside the `requestAnimationFrame` callback rather than caching them outside. This prevents layout thrashing while avoiding functional regressions that occur when the page is scrolled and the viewport-relative cache becomes stale.
**Action:** Always place `getBoundingClientRect` inside the `rAF` callback in high-frequency event listeners, taking care to extract only `clientX`/`clientY` from the event outside.

## 2024-05-17 - [Extract Static Framer Motion Variants]
**Learning:** Static `framer-motion` animation variants should be defined outside the component function scope to ensure referential stability and prevent unnecessary object re-allocations on every render.
**Action:** Extract `containerVariants`, `itemVariants`, `heroVariants` etc. outside of components like `About.tsx` and `HeroClient.tsx`.
