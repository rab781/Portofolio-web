# Contributing to Portfolio Website

First off, thank you for considering contributing to this portfolio template! It's people like you that make this tool better for everyone.

## Getting Started

1.  **Fork the repository** on GitHub.
2.  **Clone your fork** locally:
    ```bash
    git clone https://github.com/your-username/portfolio-website.git
    cd portfolio-website
    ```
3.  **Install dependencies** using `pnpm` (required):
    ```bash
    pnpm install
    ```

## Development Workflow

1.  **Create a branch** for your feature or bug fix:
    ```bash
    git checkout -b my-new-feature
    ```
2.  **Start the development server**:
    ```bash
    pnpm dev
    ```
3.  **Make your changes**.
4.  **Test your changes**:
    ```bash
    pnpm test
    pnpm lint
    pnpm build
    ```
5.  **Commit your changes** with a descriptive commit message.
6.  **Push your branch** to your fork:
    ```bash
    git push origin my-new-feature
    ```
7.  **Open a Pull Request** against the `main` branch of this repository.

## Documentation Contributions

If you are updating documentation:

-   Ensure all code examples are tested and run successfully.
-   Do not assume context.
-   Use second person ("you"), present tense, and active voice.
-   Follow the "One concept per section" rule.

## Code Style

This project uses `eslint` and `prettier` (via Next.js linting). Ensure you run `pnpm lint` before submitting a PR.

## Issues and Feature Requests

If you find a bug or have a feature request, please open an issue describing the problem or proposed feature in detail.
