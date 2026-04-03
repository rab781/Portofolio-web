# Next.js Developer Portfolio

> A production-ready developer portfolio template with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

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

1. Clone the repository and navigate into the directory:

```bash
git clone <your-repo-url> portfolio-website
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
- **Skills Section**: Edit your skill categories and items in `src/data/skills.ts` (see the `skillCategories` export). Customize how skills are displayed and animated in `src/components/Skills.tsx`.

### Adding Projects

You showcase your work by updating the projects list in `src/data/projects.ts`.

```typescript
// src/data/projects.ts
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "my-awesome-project",
    title: "My Awesome Project",
    subtitle: "A brief description of the project and the problem it solves.",
    category: "Web Development",
    image: "/projects/project-image.jpg",
    technologies: ["React", "Node.js", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/project",
    problem: "The problem this project aims to solve.",
    dataOverview: "How data is managed in this project.",
    methodology: ["Step 1", "Step 2"],
    results: ["Result 1", "Result 2"]
  },
];
```

### Configuration

You customize the visual appearance of your portfolio through standard configuration files.

| Option | File | Description |
|--------|------|-------------|
| Colors & Themes | `tailwind.config.ts` | Adjust color schemes, themes, and design tokens |
| Global Styles | `src/app/globals.css` | Add global CSS variables and base styles |
| SEO & Fonts | `src/app/layout.tsx` | Configure SEO metadata and change fonts |

### Advanced Usage: Contact Form

The contact form in `src/components/Contact.tsx` logs submissions to the console by default. You make it functional by integrating a backend or email service.

1. Create an API route in Next.js (`src/app/api/contact/route.ts`).
2. Update the form submission handler to `POST` data to your new endpoint.
3. Use a service like Resend or SendGrid to deliver the email.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the issues page.

## License

MIT © [Your Name](https://github.com/yourname)
