import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";

export default defineConfig({
  test: {
    browser: {
      enabled: false, // Enable only when using --browser flag
      provider: playwright(),
      instances: [
        {
          browser: "chromium",
        },
      ],
    },
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/deno.test.ts", // Exclude Deno-specific tests
      "**/bun-smoke.ts",
      "**/node-smoke.ts",
    ],
  },
  optimizeDeps: {
    entries: ["test/browser-smoke.test.ts"], // Only scan browser test files
    include: [
      "dayjs",
      "dayjs/plugin/utc.js",
      "dayjs/plugin/isoWeek.js",
      "dayjs/plugin/arraySupport.js",
      "dayjs/plugin/customParseFormat.js",
      "dayjs/plugin/toArray.js",
    ],
  },
});
