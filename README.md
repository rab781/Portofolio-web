# Portfolio Website

> A production-ready Next.js 15 developer portfolio template with TypeScript, Tailwind CSS, and Framer Motion.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why This Exists

Building a modern, accessible, and performant developer portfolio from scratch takes time away from what you actually want to showcase: your projects and skills. This template provides a pre-configured foundation with responsive design, dark mode, and smooth animations out of the box. You write your content, and the template handles the presentation.

## Quick Start

You can get your portfolio running locally in just a few steps.

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
  - Content: Edit your skill categories and items in `src/data/skills.ts` (see the `skillCategories` export).
  - Layout/Animation: Customize how skills are displayed and animated in `src/components/Skills.tsx`.

### Configuration

You customize the visual appearance of your portfolio through standard configuration files.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tailwind.config.ts` | `file` | - | Adjust color schemes, themes, and design tokens |
| `src/app/globals.css` | `file` | - | Add global CSS variables and base styles |
| `src/app/layout.tsx` | `file` | - | Configure SEO metadata and change fonts |

### Advanced Usage

You showcase your work by adding new projects to the `projects` array in `src/data/projects.ts`.

```typescript
import type { Project } from "@/types/project";

export const projects: Project[] = [
  // ... existing projects
  {
    id: "my-awesome-project",
    title: "My Awesome Project",
    subtitle: "A brief description of the project.",
    category: "Web Development",
    image: "/projects/awesome-project.jpg",
    technologies: ["React", "Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com/yourusername/project",
    problem: "The problem this project solves.",
    dataOverview: "Overview of the data used.",
    methodology: ["Step 1: Planning", "Step 2: Execution"],
    results: ["Increased efficiency by 50%", "Delivered on time"]
  }
];
```

## API Reference

The contact form in `src/components/Contact.tsx` submits data to a built-in Next.js API route. You integrate it with an external email service for production use.

- **Endpoint**: `/api/contact`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "subject": "string",
    "message": "string"
  }
  ```
- **Responses**:
  - `200 OK`: `{"message": "Message sent successfully"}`
  - `400 Bad Request`: `{"error": "Missing required fields"}` or `{"error": "Invalid email address"}`
  - `500 Internal Server Error`: `{"error": "Internal server error"}`

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT © [Your Name](https://github.com/yourname)
