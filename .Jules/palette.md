## 2024-05-22 - Replaced Alert with Inline Feedback
**Learning:** Found `alert()` used for form submission. This interrupts user flow and looks unprofessional.
**Action:** Always check form handlers for `alert()` and replace with inline status messages using `aria-live` regions.

## 2024-05-24 - Clipboard Feedback Pattern
**Learning:** Users need immediate confirmation when copying text. Using state to toggle between 'Copy' and 'Check' icons provides clear, accessible feedback without layout shifts.
**Action:** Use this pattern for any copy-able text (e.g. API keys, IDs).

## 2024-05-30 - Mobile Navigation Accessibility
**Learning:** Mobile overlays need explicit state management for accessibility (ARIA attributes) and UX (scroll locking). Simply toggling visibility is insufficient.
**Action:** Always implement `aria-expanded`, `aria-controls`, and body scroll locking for any mobile menu or modal overlay.

## 2025-02-27 - Active Navigation Accessibility & Keyboard Focus
**Learning:** In a single-page scrolling portfolio, navigation links often rely solely on visual styling (like `bg-[#111111]`) to indicate the active section. This leaves screen reader users without context of their current location within the page. Additionally, custom styled links frequently lack explicit keyboard focus indicators (`focus-visible`), making keyboard navigation difficult.
**Action:** Always apply `aria-current="true"` (for scrolling sections) or `aria-current="page"` (for separate pages) to the active navigation link based on scroll position state. Pair this with a clear, high-contrast `focus-visible:ring-2` utility to ensure keyboard users can track their focus path.
