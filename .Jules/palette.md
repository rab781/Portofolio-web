## 2024-05-22 - Replaced Alert with Inline Feedback
**Learning:** Found `alert()` used for form submission. This interrupts user flow and looks unprofessional.
**Action:** Always check form handlers for `alert()` and replace with inline status messages using `aria-live` regions.

## 2024-05-24 - Clipboard Feedback Pattern
**Learning:** Users need immediate confirmation when copying text. Using state to toggle between 'Copy' and 'Check' icons provides clear, accessible feedback without layout shifts.
**Action:** Use this pattern for any copy-able text (e.g. API keys, IDs).

## 2024-05-30 - Mobile Navigation Accessibility
**Learning:** Mobile overlays need explicit state management for accessibility (ARIA attributes) and UX (scroll locking). Simply toggling visibility is insufficient.
**Action:** Always implement `aria-expanded`, `aria-controls`, and body scroll locking for any mobile menu or modal overlay.

## 2025-02-19 - Clickable Project Cards
**Learning:** Users expect large visual elements (like project thumbnails) to be clickable links.
**Action:** Wrap project images in anchor tags with `aria-hidden="true"` and `tabIndex={-1}` to improve usability for mouse users without creating redundant links for keyboard/screen reader users.
