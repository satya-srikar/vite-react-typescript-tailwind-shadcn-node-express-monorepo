# @workspace/eslint-config

Reusable ESLint presets that keep every workspace aligned. There are two entry points:

- `@workspace/eslint-config/base` – strict TypeScript + JavaScript rules.
- `@workspace/eslint-config/react` – extends the base config and layers on `react-hooks` and `react-refresh` rules for React apps.

## Installation

Each workspace already depends on this package via the root `pnpm install`. To consume it inside a project-level ESLint config:

```js
// eslint.config.js
import base from "@workspace/eslint-config/base";
export default base;
```

or for React packages:

```js
import react from "@workspace/eslint-config/react";
export default react;
```

## What’s inside

- Based on `@eslint/js` recommended config + `typescript-eslint` strict type-checked presets.
- Enforces type-only imports, warns on unused vars (with `_` escape hatch), and disallows stray `console.log`.
- React preset ensures the Hooks rules and React Refresh guardrails are always on.

## Development

Because this package exports pure config objects, there are no build steps. If you add new rules or plugins:

1. Update `base.js` or `react.js`.
2. Bump dependencies in `package.json` if the plugin list changes.
3. Re-run ESLint in consumer packages to confirm the new behavior.

Peer dependencies (`eslint`, `typescript`) are declared so consuming packages must provide matching versions.
