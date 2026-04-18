## 2025-03-05 - Evaluating Layout Measurements in requestAnimationFrame
**Learning:** When throttling high-frequency events (like `mousemove`) with `requestAnimationFrame`, evaluate layout measurements (e.g., `getBoundingClientRect()`) inside the `requestAnimationFrame` callback rather than caching them outside. This prevents layout thrashing while avoiding functional regressions that occur when the page is scrolled and the viewport-relative cache becomes stale.
**Action:** Always place `getBoundingClientRect` inside the `rAF` callback in high-frequency event listeners, taking care to extract only `clientX`/`clientY` from the event outside.

## 2025-03-05 - Throttling useMotionValue updates with requestAnimationFrame
**Learning:** When tracking high-frequency events (like `mousemove` for a custom cursor) via Framer Motion's `useMotionValue`, updating the motion value synchronously on every event can lead to unnecessary main-thread CPU usage and potential frame dropping, even if it skips React re-renders.
**Action:** Always throttle continuous `useMotionValue` updates using a `requestAnimationFrame` loop, taking care to extract necessary values (like `clientX`/`clientY`) from the event object *before* the asynchronous rAF callback executes to prevent relying on stale or pooled event data.

## 2024-05-17 - [Extract Static Framer Motion Variants]
**Learning:** Static `framer-motion` animation variants should be defined outside the component function scope to ensure referential stability and prevent unnecessary object re-allocations on every render.
**Action:** Extract `containerVariants`, `itemVariants`, `heroVariants` etc. outside of components like `About.tsx` and `HeroClient.tsx`.

## $(date +%Y-%m-%d) - Debouncing synchronous layout reads on window resize
**Learning:** Attaching a window resize event listener that synchronously reads layout properties (like `offsetTop` or `getBoundingClientRect()`) forces the browser into a continuous cycle of synchronous layout calculations (reflow). During a fast window resize, this severely blocks the main thread.
**Action:** When handling `window.addEventListener('resize', ...)`, wrap synchronous layout reads in a debounce function (e.g., using `setTimeout` of 100-150ms) to ensure the expensive calculation only happens after the resize operation pauses or finishes.
## 2025-03-05 - Debouncing Resize Event Handlers
**Learning:** Performing expensive layout measurements (e.g., `offsetTop`, `innerHeight`) synchronously inside high-frequency `resize` event listeners can cause severe layout thrashing and block the main thread, degrading page responsiveness.
**Action:** Always debounce layout calculations in `resize` handlers using `setTimeout` (or `requestAnimationFrame` depending on the requirement) to batch these calculations and only run them after the user has finished or paused resizing the window.
## 2025-03-05 - Replacing useState with useRef for internal drag state
**Learning:** Using `useState` to track internal gesture state (like `isDragging`, `startX`, or `scrollLeft`) in UI components that do not render this state visually can trigger unnecessary and expensive React render cycles on high-frequency interaction events.
**Action:** When tracking internal interaction or drag state that is purely used to calculate DOM updates (e.g., in a `requestAnimationFrame` callback), always use `useRef` to maintain mutable state without triggering component re-renders.

## 2025-03-05 - Avoid Redundant Array Allocations in Animation Loops
**Learning:** In high-frequency React animation loops (e.g., `setInterval` updating text via Framer Motion), mapping over a static string by calling `.split('')` inside the JSX render path creates a new array allocation on every tick, triggering unnecessary garbage collection and degrading performance.
**Action:** Store statically-sized character sequences as arrays (`string[]`) in component state rather than strings, avoiding redundant `.split('')` calls during render. Only use `.join('')` when strictly necessary (e.g., for accessible `aria-hidden` screen reader text).
## 2026-04-10 - Optimizing Array allocations in animation loops
**Learning:** In high-frequency React animation loops (e.g., `setInterval` for a text scramble effect), dynamically managing index visibility using a `Set` introduces unnecessary memory allocations on every tick.
**Action:** Replace `Set`-based indexing with a numeric tracker (e.g., `revealedCount`) and a pre-calculated mapping array (`Int32Array`). This allows for O(1) integer comparisons during map iterations instead of allocating new objects and iterating over Sets during rapid animation frames.
## 2025-03-05 - Hoisting Framer Motion Config Objects
**Learning:** When using Framer Motion hooks like `useScroll` inside components, defining configuration objects (like `offset: ["start center", "end center"]`) inline causes a new array allocation on every render tick. This can trigger unnecessary internal hook re-evaluations and increase garbage collection pressure during rapid scroll events.
**Action:** Always hoist static Framer Motion configuration objects or arrays outside the component body or wrap them in `useMemo` to maintain referential equality. For arrays, explicitly type them (e.g., `UseScrollOptions["offset"]`) to satisfy TypeScript.
