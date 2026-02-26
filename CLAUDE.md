# wopr-plugin-acp

## Build & Test

```bash
npm run build      # tsc
npm run check      # biome lint + tsc --noEmit
npm run test       # vitest run
npm run lint       # biome check
npm run lint:fix   # biome check --fix
npm run format     # biome format --write
```

## Architecture

ACP (Agent Client Protocol) IDE integration via NDJSON-over-stdio. The plugin registers an `AcpServer` extension that editors (Zed, VS Code) connect to as a subprocess.

- `src/index.ts` — Plugin entry, lifecycle (init/shutdown), extension registration
- `src/server.ts` — AcpServer class, NDJSON transport, JSON-RPC handler
- `src/context.ts` — Editor context management (files, selections, diagnostics, cursor)
- `src/types.ts` — Zod schemas and TypeScript types for the ACP wire protocol

## Plugin Contract

This is a WOPR plugin. It imports from `@wopr-network/plugin-types` only. It does NOT import core internals.

## Issue Tracking

Linear: WOPR team — issues prefixed `WOP-`
