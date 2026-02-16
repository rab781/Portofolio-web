## 2025-02-23 - optimize-mouse-interaction
**Learning:** High-frequency events like `mousemove` trigger expensive re-renders when using `useState`. Using `framer-motion`'s `useMotionValue` and `useTransform` allows updating animations completely outside the React render loop.
**Action:** For interactive animations dependent on pointer events, prefer `useMotionValue` over React state and decompose complex components so only affected children update via `useMotionValueEvent` or direct binding.

## 2025-02-23 - pause-offscreen-animations
**Learning:** Fixed background animations continue consuming CPU/GPU resources even when visually covered by other opaque elements in the stacking context.
**Action:** Implement `paused` or `visible` props for heavy background components and control them via `useMotionValueEvent` on scroll position to disable animations and event listeners when they are effectively hidden.
