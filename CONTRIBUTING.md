# Contributing to Portfolio Website

First off, thank you for considering contributing to the Portfolio Website template!

This guide provides instructions on how you can contribute to the project.

## How Can You Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to see if the problem has already been reported. If you create a bug report, include as many details as possible:

*   Use a clear and descriptive title.
*   Describe the exact steps to reproduce the problem.
*   Provide specific examples to demonstrate the steps.

### Suggesting Enhancements

If you have an idea for a new feature or an improvement to an existing one, create an issue with the following details:

*   Use a clear and descriptive title.
*   Provide a step-by-step description of the suggested enhancement.
*   Explain why this enhancement is useful.

### Submitting Pull Requests

1.  **Fork the repository** to your own GitHub account.
2.  **Create a new branch** for your feature or bug fix (`git checkout -b feature/your-feature-name` or `git checkout -b fix/your-bug-fix`).
3.  **Make your changes**. Ensure your code follows the existing style and conventions.
4.  **Test your changes** thoroughly. Run `pnpm test`, `pnpm lint`, and `pnpm build` to verify your changes do not introduce regressions.
5.  **Commit your changes** with clear and descriptive commit messages (`git commit -m 'Add some feature'`).
6.  **Push your branch** to your fork (`git push origin feature/your-feature-name`).
7.  **Open a Pull Request** against the `main` branch of this repository. Provide a detailed description of your changes in the PR.

## Development Setup

To set up the project locally for development, follow the installation instructions in the [README.md](README.md#installation).

## Code Style

This project uses ESLint and Prettier for code formatting. You must run `pnpm lint` before submitting a pull request to ensure your code complies with the project's standards.

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.
