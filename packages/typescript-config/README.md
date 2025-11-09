# @workspace/typescript-config

Centralized `tsconfig` presets consumed by every TypeScript project in the monorepo. Shipping configs keeps compiler options in sync and prevents copy/paste drift.

## Available configs

| Export | Extends | Intended for |
| --- | --- | --- |
| `@workspace/typescript-config/base` | ES2022 target, Node types | Backend/Node packages and general libraries. |
| `@workspace/typescript-config/react-app` | `base` + React JSX + `vite/client` types | Frontend Vite apps. |
| `@workspace/typescript-config/react-library` | `base` + JSX + declaration emit toggles | Shared component libraries (e.g., `@workspace/shared`). |

## Usage

In a package-level `tsconfig.json`:

```json
{
  "extends": "@workspace/typescript-config/react-app",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

Because the configs live in a workspace package, TypeScript resolves them via pnpm’s symlinks with no extra tooling.

## Updating the configs

1. Modify the relevant JSON file (`base.json`, `react-app.json`, `react-library.json`).
2. Keep shared rules in `base` whenever possible so they fan out automatically.
3. After making changes, run `pnpm --filter <package> tsc --noEmit` in consumer packages (or simply `pnpm build`) to verify nothing regresses.

The package intentionally publishes only JSON files—no build step or scripts are required.
