# Portfolio Website

> A production-ready Next.js 15 developer portfolio template that saves you hours of setup time so you can focus on showcasing your work.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why This Exists

Building a modern, accessible, and performant developer portfolio from scratch takes time away from what you actually want to do: showcase your projects and land opportunities. This template provides a pre-configured foundation with responsive design, dark mode, and smooth animations out of the box. You write your content, and the template handles the presentation.

## Quick Start

Get your portfolio running locally in under a minute.

```bash
git clone https://github.com/rab781/Portofolio-web.git
cd Portofolio-web
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your live site.

## Installation

**Prerequisites**:
- Node.js 18.17+
- pnpm 8+ (We strictly use pnpm; `npm` or `yarn` will fail)

1. Clone the repository and navigate into the directory:

```bash
git clone https://github.com/rab781/Portofolio-web.git
cd Portofolio-web
```

2. Install dependencies:

```bash
pnpm install
```

> **Troubleshooting**: If `pnpm install` hangs or fails with network timeouts, ensure you are not behind a restrictive corporate proxy, or try `pnpm install --network-concurrency 1`.

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

The contact form in `src/components/Contact.tsx` logs submissions to the console by default. You make it functional by integrating a backend or email service. This step has a few moving parts—you need both an API endpoint and an email provider.

1. Create an API route in Next.js (`src/app/api/contact/route.ts`).
2. Update the form submission handler to `POST` data to your new endpoint.
3. Use a service like Resend or SendGrid within your API route to securely deliver the email.

> **Troubleshooting**: If you see `404 Not Found` when submitting the form, ensure you have actually created the `src/app/api/contact/route.ts` file and restarted your development server.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and pull request guidelines.

## License

MIT © [Mohammad Raihan Rabbani](https://github.com/rab781)