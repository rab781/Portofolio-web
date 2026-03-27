# Portfolio Website

> A production-ready Next.js 15 developer portfolio template with TypeScript, Tailwind CSS, and Framer Motion.

[![npm version](https://badge.fury.io/js/portfolio-website.svg)](https://badge.fury.io/js/portfolio-website)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why This Exists

Building a modern, accessible, and performant developer portfolio from scratch takes time away from what you actually want to showcase: your projects and skills. This template provides a pre-configured foundation with responsive design, dark mode, and smooth animations out of the box. You write your content, and the template handles the presentation.

## Quick Start

```bash
git clone <your-repo-url> portfolio-website
cd portfolio-website
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Installation

**Prerequisites**: Node.js 18.17+, pnpm 8+

```bash
git clone <your-repo-url> portfolio-website
cd portfolio-website
pnpm install
```

## Usage

### Basic Example

You update your personal details by modifying the components in the `src/components/` directory.

- **Hero Section** (`src/components/HeroClient.tsx`): Change your name, titles, social links, and the animated text array.
- **About Section** (`src/components/About.tsx`): Update your personal description, background, and avatar image.
- **Skills Section**:
  - Content: Edit your skill categories and items in `src/data/skills.ts`.
  - Layout/Animation: Customize how skills are displayed and animated in `src/components/Skills.tsx`.

You showcase your work by updating the projects list in `src/data/projects.ts`.

```typescript
// src/data/projects.ts
export const projects = [
  {
    id: 'my-awesome-project',
    title: 'My Awesome Project',
    subtitle: 'A brief description of the project and the problem it solves.',
    category: 'Web App',
    technologies: ['React', 'Node.js', 'Tailwind CSS'],
    image: '/projects/project1.jpg',
    githubUrl: 'https://github.com/yourusername/project',
  },
];
```

### Configuration

| File | Purpose |
|------|---------|
| `tailwind.config.ts` | Adjust color schemes, themes, and design tokens |
| `src/app/globals.css` | Add global CSS variables and base styles |
| `src/app/layout.tsx` | Configure SEO metadata and change fonts |

### Advanced Usage

The contact form in `src/components/Contact.tsx` logs submissions to the console by default. You make it functional by integrating a backend or email service.

1. Create an API route in Next.js (`src/app/api/contact/route.ts`).
2. Update the form submission handler to `POST` data to your new endpoint.
3. Use a service like Resend or SendGrid to deliver the email.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT © [Your Name](https://github.com/yourname)
