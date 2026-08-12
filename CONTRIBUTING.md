# Contributing to Portfolio Website

Welcome! We appreciate your interest in contributing to the Portfolio Website template. This guide provides the steps you need to set up your environment, write code, and submit your changes.

## Development Setup

To begin contributing, you first set up the project locally.

1. **Fork the repository** to your own GitHub account.
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Portofolio-web.git
   cd Portofolio-web
   ```
3. **Install dependencies** using pnpm:
   ```bash
   pnpm install
   ```
4. **Start the development server**:
   ```bash
   pnpm dev
   ```

You can now view the site at `http://localhost:3000`.

## Pull Request Guidelines

When you are ready to submit your changes, follow these guidelines to ensure a smooth review process:

1. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/my-new-feature
   ```
2. **Write clear, descriptive commit messages**.
3. **Verify your changes** by running tests and linting:
   ```bash
   pnpm test
   pnpm lint
   pnpm build
   ```
4. **Push your branch** to your fork:
   ```bash
   git push origin feature/my-new-feature
   ```
5. **Open a Pull Request** against the main repository. Provide a detailed description of what you changed, why you changed it, and any visual changes (screenshots or videos).

Thank you for helping improve the Portfolio Website template!
