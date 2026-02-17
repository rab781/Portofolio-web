## 2025-02-23 - optimize-mouse-interaction
**Learning:** High-frequency events like `mousemove` trigger expensive re-renders when using `useState`. Using `framer-motion`'s `useMotionValue` and `useTransform` allows updating animations completely outside the React render loop.
**Action:** For interactive animations dependent on pointer events, prefer `useMotionValue` over React state and decompose complex components so only affected children update via `useMotionValueEvent` or direct binding.

## 2026-02-17 - Preventing CLS with Lazy Loading
**Learning:** When using `next/dynamic` and `Suspense` for below-the-fold components, simple loading spinners cause massive Cumulative Layout Shift (CLS) as content expands.
**Action:** Always wrap lazy components in a container with a specific `min-height` (e.g., `min-h-[600px]`) that approximates the component's rendered size to reserve space and stabilize the viewport scroll position.
