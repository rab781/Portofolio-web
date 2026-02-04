# Font Analysis - mindmarket.com

## Fonts yang Digunakan:

Berdasarkan CSS yang terdeteksi dari mindmarket.com:

### 1. **Primary Font: Inter**
- **Variable**: `--font-sans: var(--font-inter)`
- **Font Family**: `Inter, sans-serif`
- **Font Weight Normal**: `500` (Medium)
- **Digunakan untuk**: Body text dan sebagian besar konten

### 2. **Root Font Settings**
```css
html {
  font-family: Inter, sans-serif;
  font-weight: var(--font-sans-weight-normal); /* 500 */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 3. **Hero Title Font**
- **Font Family**: Inter (from inherited styles)
- **Font Weight**: 700 (Bold) - untuk `.c-hero-home_title`
- **Font Size**: Responsive dengan `clamp()`
- **Letter Spacing**: Tight tracking

### 4. **Mono Font (untuk code/technical)**
```css
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 
            "Liberation Mono", "Courier New", monospace;
```

## Typography Scale:

```css
--text-heading-2xl: clamp(3.625rem, 1.1033rem + 12.6087vw, 10.875rem);
--text-heading-xl: clamp(3.4375rem, 2.0245rem + 7.0652vw, 7.5rem);
--text-heading-lg: clamp(2.75rem, 2.0543rem + 3.4783vw, 4.75rem);
--text-heading-md: clamp(2.125rem, 1.7772rem + 1.7391vw, 3.125rem);
--text-md: clamp(1rem, .9783rem + .1087vw, 1.0625rem);
```

## Font Features:
- **Antialiasing**: Enabled (`-webkit-font-smoothing: antialiased`)
- **Tab Size**: 4
- **Line Height**: 1.5 (default)
- **Font Feature Settings**: Normal
- **Font Variation Settings**: Normal

## Summary:
**Main Font**: **Inter** (Google Fonts)
- Medium (500) untuk body
- Bold (700) untuk headings
- Sangat responsive dengan fluid typography
