## 2025-02-23 - optimize-mouse-interaction
**Learning:** High-frequency events like `mousemove` trigger expensive re-renders when using `useState`. Using `framer-motion`'s `useMotionValue` and `useTransform` allows updating animations completely outside the React render loop.
**Action:** For interactive animations dependent on pointer events, prefer `useMotionValue` over React state and decompose complex components so only affected children update via `useMotionValueEvent` or direct binding.

## 2024-05-22 - Scroll Animation Optimization
**Learning:** React re-renders triggered by scroll event listeners are a major bottleneck. Offloading these to `framer-motion`'s `useScroll` and `useTransform` hooks allows animations to run purely via style updates (MotionValues), bypassing the React render cycle entirely.
**Action:** Whenever a component needs to change visual state based on scroll position (like opacity or scale), prefer `useScroll` + `useTransform` over `useState` + `window.addEventListener('scroll')`.
