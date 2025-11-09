# Workspace Monorepo

A pnpm + Turbo monorepo that hosts the full stack for the Workspace demo experience:

- **Frontend** – Vite + React SPA that renders the UI and consumes the backend API.
- **Backend** – Express + TypeScript API that exposes `/api/health` and `/api/projects` endpoints using the shared domain types.
- **Shared packages** – Design system components, hooks, type definitions, and shared toolchain configs for ESLint and TypeScript.

## Folder structure

```
.
├── apps
│   ├── backend         # Express API (NodeNext, typed routes)
│   └── frontend        # Vite/React client consuming the backend
├── packages
│   ├── shared          # UI components, hooks, and domain/types
│   ├── eslint-config   # Reusable ESLint configuration presets
│   └── typescript-config # Shared tsconfig presets (base/react)
├── turbo.json          # Turbo pipeline definition
├── pnpm-workspace.yaml # Workspace definition for pnpm
└── ...
```

| Package           | Location                     | Description                                                                    |
| ----------------- | ---------------------------- | ------------------------------------------------------------------------------ |
| Frontend app      | `apps/frontend`              | Vite React client; see its README for commands and env variables.              |
| Backend app       | `apps/backend`               | Express API using shared types; documents routes and env variables in-package. |
| Shared UI/types   | `packages/shared`            | Components, hooks, and TypeScript domain models consumed by all apps.          |
| ESLint config     | `packages/eslint-config`     | Source of `@workspace/eslint-config`. Includes base + React presets.           |
| TypeScript config | `packages/typescript-config` | Source of `@workspace/typescript-config` presets.                              |

## Prerequisites

- **Node.js** 20 (LTS) or newer
- **pnpm** 10.x (the repo declares `pnpm@10.20.0`)
- Optional: `turbo` installed globally for stand-alone usage, though the repo uses the local binary via `pnpm` scripts.

## Installation

```bash
pnpm install
```

This installs dependencies for every workspace using pnpm's recursive install.

## Development workflow

- **Run everything**: `pnpm dev` → runs `turbo dev`, which starts every package that defines a `dev` script (frontend, backend).
- **Target a single app**: `pnpm --filter <package> dev` (e.g., `pnpm --filter backend dev`).
- **Shared package development**: import the shared components/types via `@workspace/shared/*`.

## Building & production assets

- **Build all packages**: `pnpm build` → executes `turbo build` so each package runs its own build pipeline.
- **Build a specific package**: `pnpm --filter <package> build`.
- **Clean artifacts**: `pnpm clean` to remove `dist`, `.turbo`, nested `node_modules`, etc.

After building:

- Backend output lives in `apps/backend/dist`, with `server.js` plus the `routes/` directory.
- Frontend production bundle is emitted to `apps/frontend/dist/` by Vite.

## Environment variables

| Variable       | Used by  | Description                                                                                 |
| -------------- | -------- | ------------------------------------------------------------------------------------------- |
| `PORT`         | Backend  | Port for Express (default `4000`).                                                          |
| `CORS_ORIGINS` | Backend  | Comma-separated allow-list for cross-origin requests (defaults to `http://localhost:5173`). |
| `VITE_API_URL` | Frontend | Base URL for API requests (defaults to `http://localhost:4000/api`).                        |

Create `.env` files at the package level if you need to override defaults. Remember `.env*` files are ignored by git.

## Useful pnpm/Turbo snippets

```bash
pnpm --filter frontend lint    # run ESLint for the frontend
pnpm --filter backend start    # run the compiled API server from dist
```

Each package contains its own README with additional details, scripts, and troubleshooting notes.
