# @workspace/shared

Design system + domain layer consumed by every app in the monorepo. It provides:

- **UI components** (Shadcn-inspired primitives) under `src/components/shadcn/`.
- **Hooks** such as `useIsMobile` for responsive behavior.
- **Utility functions** in `src/lib/` (`cn`, etc.).
- **Global styles** and PostCSS config tokens.
- **Shared API/domain types** under `src/types/` so the backend and frontend stay in sync.

## Usage

Import pieces via the package exports to avoid deep relative paths:

```ts
import { Button } from "@workspace/shared/components/shadcn/button";
import type { HealthStatus } from "@workspace/shared/types";
import "@workspace/shared/global.css";
```

## Structure

```
src/
├── components/        # UI primitives
├── hooks/             # React hooks (e.g., useIsMobile)
├── lib/               # Utilities shared by components
├── styles/            # Global CSS + tokens
└── types/             # ApiResponse, ProjectSummary, etc.
```

The package is marked `"type": "module"` and uses the shared TypeScript config via `@workspace/typescript-config/react-library`.

## Scripts

| Command | Description |
| --- | --- |
| `pnpm --filter @workspace/shared lint` | Run ESLint with the shared config. |

Components are authored in TypeScript/React but no build step runs here—bundlers import the source directly via path aliases.

## Adding new exports

1. Create the component/hook/type inside `src/`.
2. Update the `exports` map in `package.json` if you add a new top-level namespace.
3. Re-export the file from `src/index.ts` if you introduce aggregated modules.
4. Update Storybook (apps/storybook) and consumer apps to cover the new surface area.

## Styling

`@workspace/shared/global.css` defines base tokens for Tailwind-like utility classes. Apps import it in their entrypoints (`main.tsx` / Storybook preview) so component styles stay consistent.
