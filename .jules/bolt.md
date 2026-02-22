## 2025-02-23 - optimize-mouse-interaction
**Learning:** High-frequency events like `mousemove` trigger expensive re-renders when using `useState`. Using `framer-motion`'s `useMotionValue` and `useTransform` allows updating animations completely outside the React render loop.
**Action:** For interactive animations dependent on pointer events, prefer `useMotionValue` over React state and decompose complex components so only affected children update via `useMotionValueEvent` or direct binding.

## 2025-02-24 - lazy-load-heavy-components
**Learning:** Statically importing heavy, image-rich components (like Projects) into a client-side layout shell (`PageShell`) forces them into the main bundle, increasing TBT and LCP. Using `next/dynamic` with `{ ssr: false }` for below-the-fold content significantly improves initial load performance.
**Action:** Audit client-side page shells for large static imports. Replace heavy, non-critical sections with dynamic imports and appropriate loading skeletons to reduce initial bundle size.
