## 2024-04-03 - Decorative Icon Accessibility
**Learning:** Purely decorative icons, such as custom SVGs or third-party components like `lucide-react`, must explicitly be hidden from assistive technologies using `aria-hidden="true"`. Otherwise, screen readers may interpret them as generic images or read out meaningless geometric path data, causing auditory clutter for users.
**Action:** When adding or auditing icons that provide no semantic meaning or are visually redundant to nearby text, ensure `aria-hidden="true"` is applied to the root `<svg>` element or passed to the wrapper component.
