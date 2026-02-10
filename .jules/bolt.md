## 2024-05-22 - [Unthrottled Scroll State Updates]
**Learning:** The root `Home` component was updating state on every scroll event without throttling or `requestAnimationFrame`. This caused high-frequency re-renders of the entire component tree, exacerbated by lack of memoization in child components.
**Action:** Always use `requestAnimationFrame` for scroll handlers that update state, and memoize expensive or static child components to prevent cascading re-renders.

## 2026-02-06 - [Synchronous Layout Thrashing in Scroll Handlers]
**Learning:** The `Navigation` component was calling `getBoundingClientRect` synchronously inside an unthrottled scroll listener. This forces the browser to recalculate layout on every scroll event, causing significant main thread blocking and jank.
**Action:** Throttle scroll handlers with `requestAnimationFrame` when performing layout measurements, and use `{ passive: true }` for listeners to allow threaded scrolling.

## 2025-02-23 - [Unused Dependency Verification]
**Learning:** Task descriptions or automated tools may incorrectly identify dependencies as unused (e.g., `framer-motion` was flagged but heavily used). Removing them without verification breaks the application.
**Action:** Always verify "unused" dependencies by searching the codebase (e.g., `grep`) before removal to ensure correctness.

## 2026-02-10 - [Layout Thrashing in Magnetic Component]
**Learning:** `MagneticPortrait` used `getBoundingClientRect` synchronously within `mousemove`, forcing layout recalculation on every frame.
**Action:** Use `ResizeObserver` to cache dimensions and `e.nativeEvent.offsetX/Y` (ensured by `pointer-events-none` on children) to avoid synchronous layout reads during interactions.
