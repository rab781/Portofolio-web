## 2024-05-22 - [Unthrottled Scroll State Updates]
**Learning:** The root `Home` component was updating state on every scroll event without throttling or `requestAnimationFrame`. This caused high-frequency re-renders of the entire component tree, exacerbated by lack of memoization in child components.
**Action:** Always use `requestAnimationFrame` for scroll handlers that update state, and memoize expensive or static child components to prevent cascading re-renders.
## 2026-02-05 - [Random Values in Render Body]
**Learning:** `HeroBackground` generated random values for grid cells inside the render body. Combined with frequent re-renders (scroll/mouse), this caused chaotic visual updates and unnecessary processing.
**Action:** Memoize random value generation (e.g., `useMemo`) to ensure stability across re-renders.
