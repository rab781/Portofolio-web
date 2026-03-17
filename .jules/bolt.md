## 2025-03-05 - Evaluating Layout Measurements in requestAnimationFrame
**Learning:** When throttling high-frequency events (like `mousemove`) with `requestAnimationFrame`, evaluate layout measurements (e.g., `getBoundingClientRect()`) inside the `requestAnimationFrame` callback rather than caching them outside. This prevents layout thrashing while avoiding functional regressions that occur when the page is scrolled and the viewport-relative cache becomes stale.
**Action:** Always place `getBoundingClientRect` inside the `rAF` callback in high-frequency event listeners, taking care to extract only `clientX`/`clientY` from the event outside.

## $(date +%Y-%m-%d) - Throttling useMotionValue updates with requestAnimationFrame
**Learning:** When tracking high-frequency events (like `mousemove` for a custom cursor) via Framer Motion's `useMotionValue`, updating the motion value synchronously on every event can lead to unnecessary main-thread CPU usage and potential frame dropping, even if it skips React re-renders.
**Action:** Always throttle continuous `useMotionValue` updates using a `requestAnimationFrame` loop, taking care to extract necessary values (like `clientX`/`clientY`) from the event object *before* the asynchronous rAF callback executes to prevent relying on stale or pooled event data.
## 2024-05-17 - [Extract Static Framer Motion Variants]
**Learning:** Static `framer-motion` animation variants should be defined outside the component function scope to ensure referential stability and prevent unnecessary object re-allocations on every render.
**Action:** Extract `containerVariants`, `itemVariants`, `heroVariants` etc. outside of components like `About.tsx` and `HeroClient.tsx`.

## $(date +%Y-%m-%d) - Debouncing synchronous layout reads on window resize
**Learning:** Attaching a window resize event listener that synchronously reads layout properties (like `offsetTop` or `getBoundingClientRect()`) forces the browser into a continuous cycle of synchronous layout calculations (reflow). During a fast window resize, this severely blocks the main thread.
**Action:** When handling `window.addEventListener('resize', ...)`, wrap synchronous layout reads in a debounce function (e.g., using `setTimeout` of 100-150ms) to ensure the expensive calculation only happens after the resize operation pauses or finishes.
