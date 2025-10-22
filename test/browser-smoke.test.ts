import { describe, it } from "vitest";
import { runSmokeSuite } from "./smoke.ts";

describe("Browser Runtime Smoke Tests", () => {
  it("should run all smoke tests in browser environment", async () => {
    await runSmokeSuite();
  });
});
