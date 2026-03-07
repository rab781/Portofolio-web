## 2025-02-23 - optimize-mouse-interaction
**Learning:** High-frequency events like `mousemove` trigger expensive re-renders when using `useState`. Using `framer-motion`'s `useMotionValue` and `useTransform` allows updating animations completely outside the React render loop.
**Action:** For interactive animations dependent on pointer events, prefer `useMotionValue` over React state and decompose complex components so only affected children update via `useMotionValueEvent` or direct binding.

## 2025-03-03 - optimize-form-state
**Learning:** Using `useState` attached to form input `onChange` handlers causes excessive re-renders on every single keystroke. In simple forms without complex real-time validation, this is an unnecessary performance penalty.
**Action:** Prefer uncontrolled components utilizing `useRef` for the form element and native `new FormData(e.currentTarget)` on submission. This completely bypasses the React render lifecycle during user input.

## 2026-03-04 - optimize-scroll-to-top
**Learning:** Attaching React state to high-frequency scroll events via `window.addEventListener('scroll')` triggers unnecessary re-renders.
**Action:** Replace React state with Framer Motion's `useScroll` and `useTransform` to bind scroll position directly to DOM styles, completely bypassing the React render cycle during scrolling.

## 2026-03-04 - optimize-decrypted-text
**Learning:** Performing string manipulation like `string.split('')` inside high-frequency animation loops (`setInterval` or `requestAnimationFrame`) causes continuous heap allocations and garbage collection pressure.
**Action:** Pre-calculate arrays using `useMemo` or inside `useEffect` when the source data changes, and reuse the pre-calculated arrays during the animation loop to eliminate redundant allocations.
