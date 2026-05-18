# Portfolio Website

> A production-ready Next.js 15 developer portfolio template that handles the presentation so you can focus on showcasing your work.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Why This Exists

Building a modern, accessible, and performant developer portfolio from scratch takes time away from what you actually want to showcase: your projects and skills. This template provides a pre-configured foundation with responsive design, dark mode, and smooth animations out of the box so you can focus on content instead of configuration.

## Quick Start

```bash
git clone https://github.com/rab781/Portofolio-web.git
cd Portofolio-web
pnpm install && pnpm dev
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

### Basic Example

You update your personal details by modifying the components in the `src/components/` directory.

```tsx
// src/components/HeroClient.tsx
export default function HeroClient() {
  return (
    <section>
      <h1>Your Name</h1>
      <h2>Full Stack Developer</h2>
    </section>
  );
}
```

### Configuration

You customize the visual appearance of your portfolio through standard configuration files.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tailwind.config.ts` | `file` | - | Adjust color schemes, themes, and design tokens |
| `src/app/globals.css` | `file` | - | Add global CSS variables and base styles |
| `src/app/layout.tsx` | `file` | - | Configure SEO metadata and change fonts |

### Advanced Usage

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

The contact form in `src/components/Contact.tsx` logs submissions to the console by default. You make it functional by integrating a backend or email service. Create an API route in Next.js (`src/app/api/contact/route.ts`) and use a service like Resend or SendGrid to deliver the email.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT © [rab781](https://github.com/rab781)
