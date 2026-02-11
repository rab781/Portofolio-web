## 2024-05-22 - [Unthrottled Scroll State Updates]
**Learning:** The root `Home` component was updating state on every scroll event without throttling or `requestAnimationFrame`. This caused high-frequency re-renders of the entire component tree, exacerbated by lack of memoization in child components.
**Action:** Always use `requestAnimationFrame` for scroll handlers that update state, and memoize expensive or static child components to prevent cascading re-renders.

## 2026-02-06 - [Synchronous Layout Thrashing in Scroll Handlers]
**Learning:** The `Navigation` component was calling `getBoundingClientRect` synchronously inside an unthrottled scroll listener. This forces the browser to recalculate layout on every scroll event, causing significant main thread blocking and jank.
**Action:** Throttle scroll handlers with `requestAnimationFrame` when performing layout measurements, and use `{ passive: true }` for listeners to allow threaded scrolling.

## 2025-02-23 - [Unused Dependency Verification]
**Learning:** Task descriptions or automated tools may incorrectly identify dependencies as unused (e.g., `framer-motion` was flagged but heavily used). Removing them without verification breaks the application.
**Action:** Always verify "unused" dependencies by searching the codebase (e.g., `grep`) before removal to ensure correctness.

## 2025-02-23 - [Layout Thrashing in Mouse Handlers]
**Learning:** The `MagneticPortrait` component was calling `getBoundingClientRect` on every `mousemove` event. This forces synchronous layout recalculation on every frame of mouse movement, which is a performance bottleneck.
**Action:** Cache the element's bounding rect on `mouseenter` (or first move) and invalidate on `resize`. Use `e.pageX/Y` (document relative) minus cached document position to calculate offsets, avoiding layout reads during animation loops.

## 2025-02-23 - [React Render Loop Blocking Scroll Animations]
**Learning:** The `Home` component was using `useState` and a `scroll` event listener to drive layout animations (`translateY`, `opacity`). This forced the entire component tree (including `HeroBackground`) to re-render on every scroll frame, causing jank and main thread contention.
**Action:** Replace `useState`-driven scroll animations with `framer-motion`'s `useScroll` and `useTransform`. Use a `ref` for layout constants (like `vh`, offsets) and a `useMotionValue` trigger to update transforms on resize without re-rendering the component.
