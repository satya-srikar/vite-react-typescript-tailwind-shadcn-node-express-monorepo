# Frontend App (apps/frontend)

A Vite + React SPA that renders the Workspace dashboard, consumes the shared `@workspace/shared` component library, and fetches data from the backend API.

## Features

- TypeScript React app bootstrapped with Vite.
- Imports UI primitives, hooks, and domain types from `@workspace/shared`.
- Fetches `/api/health` and `/api/projects` on load, showing the same types the backend emits.
- Tailwind-style utility classes; global styles come from the shared package.

## Scripts

Run from the repo root with `pnpm --filter frontend <command>`:

| Command | Description |
| --- | --- |
| `pnpm --filter frontend dev` | Starts Vite dev server (default `http://localhost:5173`). |
| `pnpm --filter frontend build` | Type-checks via `tsc -b` and emits a production bundle in `apps/frontend/dist`. |
| `pnpm --filter frontend preview` | Serves the built assets locally for smoke testing. |
| `pnpm --filter frontend lint` | Runs ESLint using the shared config. |

## Environment variables

| Variable | Default | Notes |
| --- | --- | --- |
| `VITE_API_URL` | `http://localhost:4000/api` | Base URL for backend requests. Must include `/api`. |

Create an `.env.local` (ignored by git) if you need to point at a different backend.

## Development workflow

1. Ensure the backend is running (`pnpm --filter backend dev`).
2. Start the frontend: `pnpm --filter frontend dev`.
3. Visit `http://localhost:5173` to see live data flowing from the API.
4. Use shared components/types directly: `import { Button } from "@workspace/shared/components/shadcn/button";` or `import type { HealthStatus } from "@workspace/shared/types";`.

## Production build

Run `pnpm --filter frontend build` to produce the optimized bundle. Deploy the contents of `apps/frontend/dist/` with any static host (Netlify, Vercel, etc.).
