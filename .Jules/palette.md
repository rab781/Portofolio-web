## 2024-05-22 - Replaced Alert with Inline Feedback
**Learning:** Found `alert()` used for form submission. This interrupts user flow and looks unprofessional.
**Action:** Always check form handlers for `alert()` and replace with inline status messages using `aria-live` regions.

## 2024-05-24 - Clipboard Feedback Pattern
**Learning:** Users need immediate confirmation when copying text. Using state to toggle between 'Copy' and 'Check' icons provides clear, accessible feedback without layout shifts.
**Action:** Use this pattern for any copy-able text (e.g. API keys, IDs).

## 2024-05-30 - Mobile Navigation Accessibility
**Learning:** Mobile overlays need explicit state management for accessibility (ARIA attributes) and UX (scroll locking). Simply toggling visibility is insufficient.
**Action:** Always implement `aria-expanded`, `aria-controls`, and body scroll locking for any mobile menu or modal overlay.

## 2024-06-03 - Scroll-Driven Component Verification
**Learning:** When testing scroll-dependent visibility (e.g., Back To Top button) in Playwright, initial load animations or layout shifts can delay the scroll event processing. Simple `scrollTo` calls may complete before the listener is active.
**Action:** Implement explicit waits for visibility state changes or use retry logic when verifying scroll-triggered UI elements.
