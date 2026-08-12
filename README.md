# Portfolio Website

> After following this guide, you will have a production-ready Next.js 15 developer portfolio with TypeScript, Tailwind CSS, and Framer Motion deployed and showcasing your work.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why This Exists

Building a modern, accessible, and performant developer portfolio from scratch takes time away from what you actually want to showcase: your projects and skills. This template solves the pain of manual configuration and layout building by providing a pre-configured foundation with responsive design, dark mode, and smooth animations out of the box. You write your content, and the template handles the presentation.

## Quick Start

Get your portfolio running locally in under 5 minutes.

```bash
git clone https://github.com/rab781/Portofolio-web.git
cd Portofolio-web
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

> **Tip**: If you see `EACCES` errors during installation, ensure your node environment is configured correctly or try using `npx`. If `pnpm dev` fails with a port in use error, try `pnpm dev --port 3001`.

## Installation

**Prerequisites**:
- Node.js 18.17+
- pnpm 8+

1. Clone the repository and navigate into the directory:

```bash
git clone https://github.com/rab781/Portofolio-web.git
cd portfolio-website
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

## Usage

### Personal Information

You update your personal details by modifying the components in the `src/components/` directory.

- **Hero Section** (`src/components/HeroClient.tsx`): Change your name, titles, social links, and the animated text array.
- **About Section** (`src/components/About.tsx`): Update your personal description, background, and avatar image.
- **Skills Section**:
  - Content: Edit your skill categories and items in `src/data/skills.ts` (see the `skillCategories` export).
  - Layout/Animation: Customize how skills are displayed and animated in `src/components/Skills.tsx`.

### Adding Projects

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

### Configuration

You customize the visual appearance of your portfolio through standard configuration files.

| File | Purpose |
|------|---------|
| `tailwind.config.ts` | Adjust color schemes, themes, and design tokens |
| `src/app/globals.css` | Add global CSS variables and base styles |
| `src/app/layout.tsx` | Configure SEO metadata and change fonts |

### Advanced Usage: Contact Form

The contact form in `src/components/Contact.tsx` logs submissions to the console by default. Connecting this to an actual email service has a few moving parts.

1. Create an API route in Next.js (`src/app/api/contact/route.ts`).
2. Update the form submission handler to `POST` data to your new endpoint.
3. Use a service like Resend or SendGrid to deliver the email.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to get started.

## License

MIT © [Portfolio Website](LICENSE)
