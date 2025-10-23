import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser/providers/playwright";

export default defineConfig({
  test: {
    browser: {
      enabled: false, // Enable only when using --browser flag
      provider: playwright(),
      name: "chromium",
      headless: true,
    },
  },
});
