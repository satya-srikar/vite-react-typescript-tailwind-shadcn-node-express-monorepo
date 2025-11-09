# Backend API (apps/backend)

Express + TypeScript service that backs the Workspace demo UI. It exposes small sample endpoints that are fully typed using `@workspace/shared/types` and ships with sensible defaults so the frontend and Storybook can fetch data immediately.

## Features

- NodeNext + strict TypeScript configuration shared via `@workspace/typescript-config`.
- `/api/health` and `/api/projects` routes with strongly typed responses.
- Shared domain models live in `packages/shared/src/types` so both the server and React apps stay in sync.
- CORS middleware with an allow-list that can be tuned via env vars.

## Scripts

Run all commands from the repo root using `pnpm --filter backend <command>`:

| Command | Description |
| --- | --- |
| `pnpm --filter backend dev` | Starts the API with `tsx watch src/server.ts` (reloads on changes). |
| `pnpm --filter backend build` | Type-checks and emits compiled output to `apps/backend/dist`. |
| `pnpm --filter backend start` | Runs the compiled server (`node dist/server.js`). |

## Environment variables

| Variable | Default | Notes |
| --- | --- | --- |
| `PORT` | `4000` | Listening port for the HTTP server. |
| `CORS_ORIGINS` | `http://localhost:5173` | Comma-separated list of allowed origins for API requests. |

Set these via a `.env` file inside `apps/backend` or through your process manager.

## API routes

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Returns a `HealthStatus` payload indicating service state and latency. |
| `GET` | `/api/projects` | Returns an `ApiResponse<ProjectSummary[]>` list of sample projects. |
| `GET` | `/` | Basic health message for uptime checks. |

All responses follow the shared `ApiResponse<T>` union, so the frontend can rely on consistent success/error shapes.

## Development workflow

1. Install dependencies from the repo root (`pnpm install`).
2. Start the API: `pnpm --filter backend dev` (defaults to `http://localhost:4000`).
3. Update or add routes under `src/routes/` and the shared types under `packages/shared/src/types` as needed.
4. Build for deployment with `pnpm --filter backend build`; deploy the contents of `apps/backend/dist`.

The backend does not persist data—it is a simple demo service for showcasing the shared types and UI integration.
