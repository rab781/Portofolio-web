## 2025-02-23 - optimize-mouse-interaction
**Learning:** High-frequency events like `mousemove` trigger expensive re-renders when using `useState`. Using `framer-motion`'s `useMotionValue` and `useTransform` allows updating animations completely outside the React render loop.
**Action:** For interactive animations dependent on pointer events, prefer `useMotionValue` over React state and decompose complex components so only affected children update via `useMotionValueEvent` or direct binding.

## 2025-03-03 - optimize-form-state
**Learning:** Using `useState` attached to form input `onChange` handlers causes excessive re-renders on every single keystroke. In simple forms without complex real-time validation, this is an unnecessary performance penalty.
**Action:** Prefer uncontrolled components utilizing `useRef` for the form element and native `new FormData(e.currentTarget)` on submission. This completely bypasses the React render lifecycle during user input.
