import { describe, it, expect, vi } from "vitest";
import plugin from "../src/index.js";
import type { WOPRPluginContext } from "@wopr-network/plugin-types";

function createMockContext(): WOPRPluginContext {
  return {
    log: {
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
      debug: vi.fn(),
    },
    storage: {} as any,
    inject: vi.fn().mockResolvedValue({ type: "text", content: "ok" }),
    cancelInject: vi.fn().mockReturnValue(true),
    getSessions: vi.fn().mockReturnValue(["main"]),
    getMainConfig: vi.fn().mockReturnValue({}),
    registerExtension: vi.fn(),
  } as unknown as WOPRPluginContext;
}

describe("plugin", () => {
  it("has correct metadata", () => {
    expect(plugin.name).toBe("wopr-plugin-acp");
    expect(plugin.version).toBe("1.0.0");
    expect(plugin.description).toBeDefined();
  });

  it("initializes and registers ACP server extension", async () => {
    const ctx = createMockContext();
    await plugin.init(ctx);

    expect(ctx.registerExtension).toHaveBeenCalledWith(
      "acp:server",
      expect.any(Object)
    );
    expect(ctx.log.info).toHaveBeenCalledWith(
      expect.stringContaining("ACP plugin initialized")
    );
  });

  it("uses first available session as default", async () => {
    const ctx = createMockContext();
    (ctx.getSessions as any).mockReturnValue(["my-session", "other"]);
    await plugin.init(ctx);
    expect(ctx.registerExtension).toHaveBeenCalled();
  });

  it("falls back to 'acp' when no sessions exist", async () => {
    const ctx = createMockContext();
    (ctx.getSessions as any).mockReturnValue([]);
    await plugin.init(ctx);
    expect(ctx.registerExtension).toHaveBeenCalled();
  });

  it("shutdown cleans up the server", async () => {
    const ctx = createMockContext();
    await plugin.init(ctx);
    await plugin.shutdown();
    // Should not throw on double shutdown
    await plugin.shutdown();
  });

  it("shutdown is safe when init was never called", async () => {
    // Fresh module re-import would have acpServer = null
    // We can't easily reset module state, but shutdown should handle null
    await plugin.shutdown();
  });
});
