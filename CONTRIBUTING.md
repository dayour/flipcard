# Contributing to flipcard

Thanks for contributing to **flipcard**.

## Prerequisites

- Node.js 20+
- npm 10+
- Git

## Workspace setup

```bash
npm install
npm run build:libs
```

Useful commands:

```bash
npm run dev
npm run flipdeck
npm run lint
npm run typecheck
npm run test
npm run build
```

## Adding a flipdeck deck

Add deck entries close to the package they document:

- React deck entries: `packages/react/stories/*.stories.tsx`
- Package-local source deck entries: `packages/*/src/**/*.stories.tsx`
- Web component deck entries: `packages/vanilla/stories/*.stories.ts`

Prefer deck entries that demonstrate:

- the default path
- controlled and uncontrolled behavior
- schema / manifest usage
- accessibility or theming variants

## Adding a package

1. Create the package under `packages/<name>`.
2. Add a `package.json`, `tsconfig.json`, source entrypoint, and README.
3. Export clean public APIs.
4. Add tests and at least one flipdeck deck entry when UI-facing.
5. Wire the package into root scripts or workspace references if needed.

## Testing

Before opening a pull request, run:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Pull requests

- Keep changes focused and documented.
- Add or update flipdeck deck entries for UI behavior changes.
- Conventional Commits are encouraged.

## Code of Conduct

This project follows the [Microsoft Open Source Code of Conduct](./CODE_OF_CONDUCT.md).
