import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    browser: {
      enabled: false, // Enable only when using --browser flag
      provider: "playwright",
      name: "chromium",
      headless: true,
    },
  },
});
