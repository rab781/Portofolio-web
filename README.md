# Portfolio Website

> A production-ready Next.js 15 developer portfolio template that handles presentation so you can focus on showcasing your work.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why This Exists

Building a modern, accessible, and performant developer portfolio from scratch takes time away from what you actually want to showcase: your projects and skills. This template solves that pain by providing a pre-configured foundation with responsive design, dark mode, and smooth animations out of the box. You write your content, and the template handles the presentation.

## Quick Start

Get your portfolio running locally.

```bash
git clone <your-repo-url> portfolio-website
cd portfolio-website
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

> **Tip**: If you see `EACCES` errors during installation, [fix npm permissions](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) or use `npx`.

## Installation

**Prerequisites**: Node.js 18.17+, pnpm 8+

```bash
git clone <your-repo-url> portfolio-website
cd portfolio-website
pnpm install
```

## Usage

### Basic Example: Adding Projects

You showcase your work by updating the `projects` array in `src/data/projects.ts`.

```typescript
// src/data/projects.ts
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "my-awesome-project",
    title: "My Awesome Project",
    subtitle: "A brief description of the project and the problem it solves.",
    category: "Full Stack Dev",
    image: "/projects/my-image.jpg",
    technologies: ["React", "Node.js", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/project",
    problem: "The specific challenge this project addresses.",
    dataOverview: "Overview of data processing.",
    methodology: ["Step 1", "Step 2", "Step 3"],
    results: ["Result 1", "Result 2"]
  }
];
```

### Configuration

You customize the visual appearance and personal details of your portfolio through standard configuration files and components.

| Option/File | Description |
|-------------|-------------|
| `src/components/HeroClient.tsx` | Change your name, titles, social links, and the animated text array |
| `src/components/About.tsx` | Update your personal description, background, and avatar image |
| `src/data/skills.ts` | Edit your skill categories and items |
| `tailwind.config.ts` | Adjust color schemes, themes, and design tokens |

### Advanced Usage: Contact Form

The contact form in `src/components/Contact.tsx` logs submissions to the console by default. You make it functional by integrating a backend or email service.

1. Create an API route in Next.js (`src/app/api/contact/route.ts`).
2. Update the form submission handler to `POST` data to your new endpoint.
3. Use a service like Resend or SendGrid to deliver the email.

If you encounter a `404 Not Found` error when submitting the form, ensure you have correctly created the API route in the `src/app/api/contact/route.ts` file and that it exports a `POST` handler.

## API Reference

The primary data structures you interact with are defined in `src/types/`. For detailed Next.js API reference, see the [Next.js Documentation](https://nextjs.org/docs).

See [full API reference →](https://nextjs.org/docs)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT © [Your Name](https://github.com/yourname)
