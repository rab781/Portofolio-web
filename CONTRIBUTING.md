# Contributing Guidelines

Thank you for your interest in contributing to the Portfolio Website! This document provides guidelines to ensure a smooth contribution process.

## Local Development Setup

To set up the project locally, you will need Node.js (18.17+) and pnpm (8+).

1. Clone the repository and navigate to the project root.
2. Run `pnpm install` to install dependencies.
3. Start the development server with `pnpm dev`.

If you experience network timeouts during `pnpm install`, try using `pnpm install --network-concurrency 1`. If `pnpm dev` fails with a "port in use" error, use `kill $(lsof -t -i :3000) 2>/dev/null || true`.

## Testing and Linting

Before opening a pull request, ensure that your code passes the project's quality checks:

1. Run `pnpm lint` to verify that there are no ESLint errors.
2. Run `pnpm build` to verify that the TypeScript builds correctly.
3. Run `pnpm test` to run the Jest test suite.

Code without tests is incomplete. If you are adding a new feature, please add tests, or explain in the Pull Request why the change does not require testing.

## Documentation

- Ensure any new configurations or setup changes are documented in `README.md`.
- Ensure all components are well documented, and complex logic is commented.

## Pull Request Process

1. Fork the repository and create a new branch from `main`.
2. Make your changes, testing them locally.
3. Commit your changes with a clear and concise commit message.
4. Push your branch to your fork.
5. Open a Pull Request against the `main` branch.
6. Describe the problem your changes solve and how you verified them.

## Issues

If you find a bug or have a feature request, please open an issue describing the problem or requested feature clearly. Provide steps to reproduce bugs.