# Portfolio Website Template

> A production-ready Next.js 15 developer portfolio template that handles presentation so you focus on showcasing your work.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Why This Exists

Building a modern, accessible, and performant developer portfolio from scratch takes time away from what you actually want to showcase: your projects and skills. This template gives you a pre-configured foundation with responsive design, dark mode, and smooth Framer Motion animations out of the box. You write your content, and the template handles the rest.

## Quick Start

Launch your portfolio locally in under a minute.

```bash
git clone https://github.com/rab781/Portofolio-web.git portfolio-website
cd portfolio-website
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your live site.

## Installation

**Prerequisites**: Node.js 18.17+, pnpm 8+

1. Clone the repository and navigate into the directory:

```bash
git clone https://github.com/rab781/Portofolio-web.git portfolio-website
cd portfolio-website
```

2. Install dependencies:

```bash
pnpm install
```

> **Tip**: If `pnpm install` fails due to network timeouts, check your connection or registry settings. If you see `EACCES` errors, ensure your node environment permissions are correct.

3. Start the development server:

```bash
pnpm dev
```

## Usage

### Customize Personal Information

You update your personal details by modifying the components in the `src/components/` directory.

- **Hero Section** (`src/components/HeroClient.tsx`): Change your name, titles, social links, and the animated text array.
- **About Section** (`src/components/About.tsx`): Update your personal description, background, and avatar image.
- **Skills Section**:
  - Content: Edit your skill categories and items in `src/data/skills.ts` (see the `skillCategories` export).
  - Layout/Animation: Customize how skills are displayed and animated in `src/components/Skills.tsx`.

### Add Projects

You showcase your work by updating the projects list in `src/components/Projects.tsx`.

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

### Configure Appearance

You customize the visual appearance of your portfolio through standard configuration files.

| File | Purpose |
|------|---------|
| `tailwind.config.ts` | Adjust color schemes, themes, and design tokens |
| `src/app/globals.css` | Add global CSS variables and base styles |
| `src/app/layout.tsx` | Configure SEO metadata and change fonts |

### Advanced Usage: Contact Form

The contact form in `src/components/Contact.tsx` logs submissions to the console by default. You make it functional by integrating a backend or email service.

1. Create an API route in Next.js (`src/app/api/contact/route.ts`).
2. Update the form submission handler to `POST` data to your new endpoint.
3. Use a service like Resend or SendGrid to deliver the email.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for local development setup and contribution guidelines.

## License

MIT © [Mohammad Raihan Rabbani](LICENSE)