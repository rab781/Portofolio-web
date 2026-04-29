# Contributing to Portfolio Website

First off, thank you for considering contributing to the Portfolio Website template! It's people like you that make this template a great tool for developers everywhere.

## Development Workflow

### Prerequisites

You need the following installed:
- Node.js 18.17+
- pnpm 8+

### Setup

1. Fork and clone the repository.
2. Install dependencies:

```bash
pnpm install
```

> **Note:** If `pnpm install` fails due to network timeouts, check your internet connection or use a different network.

3. Start the development server:

```bash
pnpm dev
```

### Making Changes

1. Create a new branch for your feature or bugfix: `git checkout -b feature/my-feature-name`.
2. Make your changes and ensure tests and linting pass:

```bash
pnpm lint
pnpm test
pnpm build
```

3. Commit your changes using descriptive commit messages.

## Submitting Pull Requests

1. Push your branch to your fork.
2. Open a Pull Request against the `main` branch.
3. Provide a clear description of the problem you are solving and how your changes address it. Include screenshots or videos if you are making UI changes.

## Code of Conduct

Please treat everyone with respect and adhere to standard community guidelines.
