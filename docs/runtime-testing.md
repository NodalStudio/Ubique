# Cross-Runtime Testing Guide

Rubique is published through [JSR](https://jsr.io/), which automatically emits runtime-specific bundles so the library can be consumed from Deno, Node.js, Bun, Cloudflare Workers, and modern browsers. To keep the compatibility badge on JSR green, you can wire a small matrix of smoke tests that executes the same behavioral assertions in each runtime. This guide outlines a practical setup you can drop into the repository today.

---

## 1. Core smoke test

Create a single TypeScript test file (for example, `test/runtime/smoke.ts`) that focuses on
simple value-level assertions instead of exhaustive coverage. That keeps the test fast and
portable across runtimes.

```ts
// test/runtime/smoke.ts
import * as rubique from "../../index.ts";
import type {
  array as RubiqueArray,
  matrix as RubiqueMatrix,
} from "../../lib/types.d.ts";

export async function runSmokeSuite(): Promise<void> {
  const vector: RubiqueArray<number> = [1, 2, 3, 4];
  const matrix: RubiqueMatrix<number> = [
    [1, 2],
    [3, 4],
  ];

  const sum = rubique.sum(vector);
  if (sum !== 10) throw new Error(`sum failed: expected 10, received ${sum}`);

  const inverse = rubique.inv(matrix) as RubiqueMatrix<number>;
  const expected = [
    [-2, 1],
    [1.5, -0.5],
  ];
  inverse.flat().forEach((value, index) => {
    const target = expected.flat()[index];
    if (Math.abs(value - target) > 1e-9) {
      throw new Error(
        `inv mismatch at index ${index}: expected ${target}, received ${value}`
      );
    }
  });

  const average = rubique.mean(vector) as number;
  if (Math.abs(average - 2.5) > 1e-9) {
    throw new Error(`mean failed: expected 2.5, received ${average}`);
  }
}
```

Each runtime will execute this same entry point, but the harness will differ.

---

## 2. Deno

Deno already runs doc-tests via `deno task test`. To include the runtime smoke suite, add a thin
wrapper that imports the `runSmokeSuite` function. Deno can execute TypeScript directly.

```ts
// test/runtime/deno.test.ts
import { runSmokeSuite } from "./smoke.ts";
import { assertEquals } from "jsr:@std/assert@1";

Deno.test("rubique smoke (deno)", async () => {
  await runSmokeSuite();
  assertEquals(true, true); // ensures the test registers a pass when no error is thrown
});
```

Run it locally:

```powershell
deno test --allow-read test/runtime/deno.test.ts
```

Add the file to the existing `deno task test` command or register a new task such as
`"test:deno": "deno test --allow-read test/runtime/deno.test.ts"`.

---

## 3. Node.js

Node cannot execute TypeScript out of the box, so the CI job installs runtime dependencies on the fly
and evaluates the suite through [`tsx`](https://github.com/esbuild-kit/tsx). No `package.json` is
needed—each run installs the transient dependencies with `--no-save` so nothing is committed.

```powershell
npm install --no-save dayjs
npm exec --yes tsx test/runtime/node-smoke.ts
```

Both commands create a local `node_modules/` cache. Delete it afterwards if you are running the suite
outside CI: `Remove-Item -Recurse -Force node_modules` (PowerShell) or `rm -rf node_modules` (Unix).

The helper file is a thin wrapper around the shared suite:

```ts
// test/runtime/node-smoke.ts
import { runSmokeSuite } from "./smoke.ts";

runSmokeSuite()
  .then(() => console.log("Runtime smoke suite completed successfully (node)."))
  .catch((error) => {
    console.error("Runtime smoke suite failed (node)", error);
    throw error;
  });
```

---

## 4. Bun

Bun can execute TypeScript directly. Use the same wrapper pattern and rely on Bun's module loader to
compile the code on the fly:

```ts
// test/runtime/bun-smoke.ts
import { runSmokeSuite } from "./smoke.ts";

runSmokeSuite()
  .then(() => console.log("Runtime smoke suite completed successfully (bun)."))
  .catch((error) => {
    console.error("Runtime smoke suite failed (bun)", error);
    throw error;
  });
```

Run locally (requires Bun to be installed):

```powershell
bun test/runtime/bun-smoke.ts
```

---

## 5. Cloudflare Workers

For Workers, export a default `fetch` handler that simply calls the shared suite. You can execute it
inside the `workerd` sandbox using either Miniflare or Wrangler:

```ts
// test/runtime/worker-smoke.ts
import { runSmokeSuite } from "./smoke.ts";

export default {
  async fetch(): Promise<Response> {
    await runSmokeSuite();
    return new Response("ok");
  },
};
```

Run it with Wrangler's test harness:

```powershell
npm install --no-save wrangler
npx wrangler dev --test --modules test/runtime/worker-smoke.ts
```

If you prefer Miniflare:

```powershell
npm install --no-save miniflare
npx miniflare test/runtime/worker-smoke.ts --modules --test --watch=false
```

---

## 6. Browsers

To exercise the suite in a real browser, use the small module entrypoint and execute it through
[`@vitest/browser`](https://vitest.dev/guide/browser) or Playwright:

```ts
// test/runtime/browser-smoke.ts
import { runSmokeSuite } from "./smoke.ts";

(async () => {
  await runSmokeSuite();
  console.log("Runtime smoke suite completed in browser context");
})();
```

Vitest browser runner:

```powershell
npm install --no-save vitest @vitest/browser playwright
npx vitest run --browser --include test/runtime/browser-smoke.ts
```

Playwright alternative:

1. Bundle the file with esbuild: `deno run -A npm:esbuild test/runtime/browser-smoke.ts --bundle --format=esm --outfile=dist/browser-smoke.js`
2. Load the bundle inside a Playwright test and assert that the console logs the success message.

---

## 7. GitHub Actions matrix

Below is a ready-to-use workflow (`.github/workflows/runtime-compat.yml`) that builds once and runs the
smoke tests across all runtimes in parallel. The job names match the JSR compatibility badges.

```yaml
name: Runtime compatibility

on:
  pull_request:
  push:
    branches: [main]

jobs:
  deno:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: denoland/setup-deno@v1
        with:
          deno-version: v1.x
      - run: deno task build
      - run: deno test --allow-read test/runtime/deno.test.ts

  node:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: denoland/setup-deno@v1
        with:
          deno-version: v1.x
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install --no-save dayjs
      - run: npm exec --yes tsx test/runtime/node-smoke.ts

  bun:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
        with:
          bun-version: latest
      - uses: denoland/setup-deno@v1
        with:
          deno-version: v1.x
      - run: bun install dayjs
      - run: bun test/runtime/bun-smoke.ts

  workers:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: denoland/setup-deno@v1
        with:
          deno-version: v1.x
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install --no-save wrangler
      - run: npx wrangler dev --test --modules test/runtime/worker-smoke.ts

  browser:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: denoland/setup-deno@v1
        with:
          deno-version: v1.x
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install --no-save vitest @vitest/browser playwright
      - run: npx vitest run --browser --include test/runtime/browser-smoke.ts
```

You can parameterize the shared steps through a composite action or a reusable workflow once the basic
smoke tests are passing.

---

## 8. Recommended folder structure

```
📦 test/runtime
 ├─ smoke.ts              # shared assertions + helpers
 ├─ deno.test.ts          # Deno wrapper (invoked by deno test)
 ├─ node-smoke.ts         # Node entry (tsx)
 ├─ bun-smoke.ts          # Bun entry
 ├─ worker-smoke.ts       # Cloudflare Worker module
 └─ browser-smoke.ts      # Browser entry for Vitest/Playwright
```

---

## 9. Local workflow overview

| Runtime            | Command(s)                                                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| Deno               | `deno test --allow-read test/runtime/deno.test.ts`                                                                              |
| Node.js            | `npm install --no-save dayjs`<br>`npm exec --yes tsx test/runtime/node-smoke.ts`                                                |
| Bun                | `bun test/runtime/bun-smoke.ts`                                                                                                 |
| Cloudflare Workers | `npm install --no-save wrangler`<br>`npx wrangler dev --test --modules test/runtime/worker-smoke.ts`                            |
| Browser            | `npm install --no-save vitest @vitest/browser playwright`<br>`npx vitest run --browser --include test/runtime/browser-smoke.ts` |

Run the Deno build first to ensure the Wasm artifacts are fresh. The Node, Bun, and Worker suites
consume the generated bundle automatically, while the browser suite loads it via Vitest's browser entry.

---

## 10. Next steps

1. Keep the shared `runSmokeSuite` focused on fast, deterministic checks that cover WebAssembly and
   pure TypeScript branches alike.
2. Extend the suite when bugs appear—adding one regression test automatically protects every runtime.
3. Wire the `Runtime compatibility` workflow into CI so JSR badges stay accurate.
4. For browser and Worker runs, consider promoting the optional tooling (Miniflare/Playwright) to
   reusable GitHub Actions steps once the manual commands feel stable.

With this structure, every pull request proves Rubique remains portable across the runtimes advertised
on its package page, and regressions get caught before they reach users.
