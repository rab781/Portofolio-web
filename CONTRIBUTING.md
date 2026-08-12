# Contributing to Portfolio Website

First off, thank you for considering contributing to this portfolio template! It's people like you that make this template such a great tool for developers.

## Development Setup

To get your development environment set up:

1.  **Fork and clone** the repository to your local machine.
2.  **Install dependencies**: We strictly use `pnpm`.
    ```bash
    pnpm install
    ```
    > **Tip**: If `pnpm install` fails due to network timeouts, check your connection or registry settings.
3.  **Run the development server**:
    ```bash
    pnpm dev
    ```
    The application will be available at [http://localhost:3000](http://localhost:3000).

## Code Quality Standards

Before submitting your changes, you ensure they meet our quality gates:

1.  **Run formatting and linting**:
    ```bash
    pnpm lint
    ```
2.  **Run tests**:
    ```bash
    pnpm test
    ```
3.  **Build the project** to catch any compilation errors:
    ```bash
    pnpm build
    ```

## Submitting Changes

1.  Create a new branch from `master` for your feature or bugfix.
2.  Commit your changes with clear, descriptive messages.
3.  Push your branch and open a Pull Request.
4.  In your PR description, explain **what** you changed and **why**. If you modified UI components, include before/after screenshots.

If you have questions, please open an issue first to discuss your proposed changes!