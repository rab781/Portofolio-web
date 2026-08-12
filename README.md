# Portfolio Website

> A production-ready Next.js 15 developer portfolio template with TypeScript, Tailwind CSS, and Framer Motion.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why This Exists

Building a modern, accessible, and performant developer portfolio from scratch takes time away from what you actually want to showcase: your projects and skills. This template provides a pre-configured foundation with responsive design, dark mode, and smooth animations out of the box. You write your content, and the template handles the presentation.

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

## Usage

### Personal Information

You update your personal details by modifying the components in the `src/components/` directory.

- **Hero Section** (`src/components/HeroClient.tsx`): Change your name, titles, social links, and the animated text array.
- **About Section** (`src/components/About.tsx`): Update your personal description, background, and avatar image.
- **Skills Section**:
  - Content: Edit your skill categories and items in `src/data/skills.ts` (see the `skillCategories` export).
  - Layout/Animation: Customize how skills are displayed and animated in `src/components/Skills.tsx`.

### Adding Projects

You showcase your work by updating the projects list in `src/data/projects.ts`.

```tsx
// src/data/projects.ts
export const projects: Project[] = [
  {
    id: 'my-project',
    title: 'My Awesome Project',
    subtitle: 'A brief description of the project.',
    category: 'Full Stack Dev',
    image: '/projects/my-image.jpg',
    technologies: ['React', 'Node.js', 'Tailwind CSS'],
    githubUrl: 'https://github.com/yourusername/project',
    problem: 'The problem this project solves.',
    dataOverview: 'Data handling overview.',
    methodology: ['Step 1', 'Step 2'],
    results: ['Result 1', 'Result 2']
  },
];
```

### Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `src/app/globals.css` | `file` | N/A | Add global CSS variables and base styles (including Tailwind configurations via PostCSS plugin) |
| `src/app/layout.tsx` | `file` | N/A | Configure SEO metadata and change fonts |

### Contact Form Setup

The contact form in `src/components/Contact.tsx` logs submissions to the console by default. You make it functional by integrating a backend or email service.

1. The API route already exists in Next.js (`src/app/api/contact/route.ts`).
2. Update the form submission handler to `POST` data to your new endpoint if not done already.
3. Use a service like Resend or SendGrid to deliver the email within the API route.

## API Reference

### POST `/api/contact`
Simulates processing a contact form submission and logs to the console. Validates fields and email format.

| Parameter | Type | Required | Description |
|--------|------|---------|-------------|
| `name` | `string` | Yes | The user's name |
| `email` | `string` | Yes | The user's email address |
| `subject` | `string` | Yes | The subject of the message |
| `message` | `string` | Yes | The message body |

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the issues page.

## License

MIT © [Mohammad Raihan Rabbani](https://github.com/rab781)
