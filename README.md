# @wopr-network/wopr-plugin-acp

> ACP (Agent Client Protocol) IDE integration plugin for WOPR — connect Zed, VS Code, and other editors via NDJSON stdio.

## Install

```bash
npm install @wopr-network/wopr-plugin-acp
```

## Usage

```bash
wopr plugin install github:wopr-network/wopr-plugin-acp
```

Then configure via `wopr configure --plugin @wopr-network/wopr-plugin-acp`.

## Configuration

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `default_session` | string | No | Default session name to route IDE requests to (default: first active session) |

## What it does

The ACP plugin implements the Agent Client Protocol over NDJSON-formatted stdio, enabling direct integration between WOPR agents and IDE extensions for Zed and VS Code. The IDE sends requests (chat messages, context updates) via JSON-RPC over stdin/stdout, and the plugin routes them through the WOPR session bridge — streaming responses back as they are generated. This makes WOPR agents natively accessible from within your editor without a browser.

## License

MIT
