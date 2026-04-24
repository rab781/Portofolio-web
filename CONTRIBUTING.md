# Contributing to Portfolio Website

Welcome! We appreciate your interest in making this template better.

## Local Development Setup

To run this project locally, you need [Node.js 18.17+](https://nodejs.org/) and [pnpm 8+](https://pnpm.io/) installed.

1. Clone the repository and navigate into the directory:

```bash
git clone https://github.com/rab781/Portofolio-web.git
cd portfolio-website
```

2. Install dependencies:

```bash
pnpm install
```

> **Tip**: If you see `EACCES` errors during installation, ensure your node environment permissions are correct or use a node version manager like `nvm` or `fnm`.

3. Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your local instance.

## Verification Workflow

Before submitting any changes, you must verify your code passes all checks:

```bash
pnpm lint
pnpm test
pnpm build
```

If your tests fail with `ERR_UNKNOWN_FILE_EXTENSION` when running single files via node, remember that `.ts`/`.tsx` files cannot be executed directly this way. Use the configured `pnpm test` script instead.

## Contribution Guidelines

1. **Test your code**: Every new component or significant change must run successfully. Check your changes visually in the development server and run the automated tests.
2. **Commit messages**: Use descriptive commit messages. Provide a concise title and elaborate in the description if necessary.
3. **Documentation**: If you change configuration files or how a component works, update the `README.md` to match the new behavior.

## Submitting a Pull Request

1. Create a new branch from `main`: `git checkout -b your-feature-branch`.
2. Commit your changes: `git commit -m "feat: your feature"`.
3. Push to your fork and submit a Pull Request.
4. Ensure all CI checks pass on your PR. We will review your changes and provide feedback.