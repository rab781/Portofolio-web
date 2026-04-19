# Portfolio Website

> A production-ready Next.js 15 developer portfolio template with TypeScript, Tailwind CSS, and Framer Motion.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why This Exists

You spend hours building custom portfolio sites when you should be showcasing your work. This template gives you a performant, accessible foundation out of the box so you focus on content, not CSS bugs or layout thrashing.

## Quick Start

```bash
git clone https://github.com/rab781/Portofolio-web.git
cd Portofolio-web
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Installation

**Prerequisites**: Node.js 18.17+, pnpm 8+

```bash
git clone https://github.com/rab781/Portofolio-web.git
cd Portofolio-web
pnpm install
```

> **Troubleshooting**:
> - If you see `EACCES` errors during installation, ensure your user has the correct directory permissions or prefix commands with `sudo` carefully.
> - If `pnpm install` fails due to network timeouts, check your proxy settings or try clearing your pnpm store (`pnpm store prune`).

## Usage

### Personal Information

You update your personal details by modifying the components in the `src/components/` directory.

- **Hero Section** (`src/components/HeroClient.tsx`): Change your name, titles, social links, and the animated text array.
- **About Section** (`src/components/About.tsx`): Update your personal description, background, and avatar image.
- **Skills Section**:
  - Content: Edit your skill categories and items in `src/data/skills.ts` (see the `skillCategories` export).
  - Layout/Animation: Customize how skills are displayed and animated in `src/components/Skills.tsx`.

### Adding Projects

You showcase your work by updating the projects list in `src/components/Projects.tsx`. The template dynamically renders your projects from this data file.

```tsx
// src/components/Projects.tsx
export const projects = [
  {
    title: 'My Awesome Project',
    description: 'A brief description of the project and the problem it solves.',
    technologies: ['React', 'Node.js', 'Tailwind CSS'],
    link: 'https://github.com/yourusername/project',
  },
];
```

### Configuration

You customize the visual appearance of your portfolio through standard configuration files.

| File | Purpose |
|------|---------|
| `tailwind.config.ts` | Adjust color schemes, themes, and design tokens |
| `src/app/globals.css` | Add global CSS variables and base styles |
| `src/app/layout.tsx` | Configure SEO metadata and change fonts |

### Advanced Usage: Contact Form

The contact form in `src/components/Contact.tsx` logs submissions to the console by default. You make it functional by integrating a backend or email service. This step has a few moving parts.

1. Create an API route in Next.js (`src/app/api/contact/route.ts`).
2. Update the form submission handler to `POST` data to your new endpoint.
3. Use a service like Resend or SendGrid within your API route to deliver the email.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

See [LICENSE](LICENSE)
