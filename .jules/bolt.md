## 2025-02-23 - optimize-mouse-interaction
**Learning:** High-frequency events like `mousemove` trigger expensive re-renders when using `useState`. Using `framer-motion`'s `useMotionValue` and `useTransform` allows updating animations completely outside the React render loop.
**Action:** For interactive animations dependent on pointer events, prefer `useMotionValue` over React state and decompose complex components so only affected children update via `useMotionValueEvent` or direct binding.

## 2025-02-23 - lazy-load-sections
**Learning:** Static imports in a client component (`'use client'`) bundle all dependencies into the main chunk, even if they are only visible after scrolling or interaction. `next/dynamic` is essential for splitting these large components into separate chunks.
**Action:** Use `next/dynamic` for all major page sections (e.g., About, Projects, Skills) in the main layout component (`PageShell`), especially when a preloader or hero section is present to mask the initial loading time.
