## 2024-05-22 - Replaced Alert with Inline Feedback
**Learning:** Found `alert()` used for form submission. This interrupts user flow and looks unprofessional.
**Action:** Always check form handlers for `alert()` and replace with inline status messages using `aria-live` regions.
