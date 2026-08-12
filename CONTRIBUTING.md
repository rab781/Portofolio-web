# Contributing to Portfolio Website

First off, thank you for considering contributing to the Portfolio Website! It's people like you that make this template a great resource for everyone.

## Prerequisites

Before you start, make sure you have the following installed:
- Node.js 18.17+
- pnpm 8+

## Local Development Setup

1. Fork the repository and clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Portofolio-web.git
   cd Portofolio-web
   ```

2. Install the dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Making Changes

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
   or
   ```bash
   git checkout -b fix/your-bugfix-name
   ```

2. Make your changes in the code. Ensure you follow the project's coding style and structure.
3. Test your changes locally to ensure they work as expected.
   ```bash
   pnpm test
   pnpm lint
   pnpm build
   ```

## Committing Changes

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification for our commit messages.

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting, missing semi colons, etc
- `refactor:` for refactoring production code, eg. renaming a variable
- `test:` for adding missing tests, refactoring tests; no production code change
- `chore:` for updating build tasks, package manager configs, etc; no production code change

Example:
```bash
git commit -m "feat: add new contact form integration"
```

## Creating a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
2. Open a Pull Request from your fork to the `main` branch of the original repository.
3. Provide a clear and descriptive title for your PR.
4. Fill out the PR template with details about what you changed, why, and how to test it.
5. Wait for a review from the maintainers. We might suggest some changes before merging.

## Issues and Feature Requests

If you find a bug or have an idea for a new feature, please open an issue before starting work on a PR. This allows us to discuss the proposal and ensure it aligns with the project's goals.

When opening an issue, please provide as much context as possible, including steps to reproduce bugs or detailed descriptions for feature requests.

Thank you again for contributing!
