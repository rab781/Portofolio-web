## 2025-02-23 - optimize-mouse-interaction
**Learning:** High-frequency events like `mousemove` trigger expensive re-renders when using `useState`. Using `framer-motion`'s `useMotionValue` and `useTransform` allows updating animations completely outside the React render loop.
**Action:** For interactive animations dependent on pointer events, prefer `useMotionValue` over React state and decompose complex components so only affected children update via `useMotionValueEvent` or direct binding.

## 2025-02-24 - optimize-scroll-interaction
**Learning:** `useState` in scroll listeners causes re-renders on every update, even if throttled. `framer-motion`'s `useScroll` and `useTransform` enable declarative, zero-render scroll animations by updating DOM styles directly.
**Action:** Replace `useState`/`useEffect` patterns for scroll visibility toggles with `useTransform` mapping scrollY to opacity/display/pointerEvents.
