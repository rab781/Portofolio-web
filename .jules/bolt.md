## 2024-05-22 - [Unthrottled Scroll State Updates]
**Learning:** The root `Home` component was updating state on every scroll event without throttling or `requestAnimationFrame`. This caused high-frequency re-renders of the entire component tree, exacerbated by lack of memoization in child components.
**Action:** Always use `requestAnimationFrame` for scroll handlers that update state, and memoize expensive or static child components to prevent cascading re-renders.

## 2026-02-06 - [Synchronous Layout Thrashing in Scroll Handlers]
**Learning:** The `Navigation` component was calling `getBoundingClientRect` synchronously inside an unthrottled scroll listener. This forces the browser to recalculate layout on every scroll event, causing significant main thread blocking and jank.
**Action:** Throttle scroll handlers with `requestAnimationFrame` when performing layout measurements, and use `{ passive: true }` for listeners to allow threaded scrolling.

## 2026-05-21 - [Replacing Scroll Loop with IntersectionObserver]
**Learning:** Iterating through elements to check position via `getBoundingClientRect` inside a scroll loop is inefficient (O(N) * Scroll Freq). `IntersectionObserver` provides a more performant, asynchronous API for detecting element visibility without polling.
**Action:** Replace scroll-based visibility checks with `IntersectionObserver` where possible to offload geometric calculations to the browser engine and avoid layout thrashing.
