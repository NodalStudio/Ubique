import { chromium } from "npm:playwright@1.59.1";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import process from "node:process";
const base = process.env.UBIQUE_BASE_URL || "http://127.0.0.1:8873";
const artifacts = process.env.UBIQUE_BROWSER_ARTIFACTS || "/tmp";
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined,
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } }),
  errors = [];
page.on("pageerror", (e) => errors.push(e.message));
await page.goto(base + "/learn.html");
assert.equal(await page.locator("#matrix").count(), 1);
assert.equal(await page.locator("#regression").count(), 1);
assert.equal(await page.locator("#csv").count(), 0);
assert.equal(await page.locator("input[type=file]").count(), 0);
assert.equal(
  await page.locator('footer a[href="https://nodalstudio.io/"]').count(),
  1,
);
assert.equal(await page.locator('a[href="lab.html"]').count(), 0);
assert.deepEqual(
  await page.locator("main section[id]").evaluateAll((nodes) =>
    nodes.map((n) => n.id)
  ),
  ["matrix", "regression"],
);
await page.waitForFunction(() =>
  document.querySelector("#fit-status").textContent.includes("slope")
);
await page.check("#offset");
await page.waitForFunction(() =>
  document.querySelector("#fit-status").textContent.includes("e+11")
);
await page.click("#add-point");
await page.waitForFunction(() =>
  document.querySelector("#fit-status").textContent.startsWith("10 points")
);
await page.selectOption("#size", "10");
await page.click("#measure");
await page.waitForFunction(() =>
  document.querySelector("#matrix-status").textContent.includes("gate passed")
);
const download = page.waitForEvent("download");
await page.click("#download");
const d = await download;
const path = await d.path();
const data = JSON.parse(await fs.readFile(path, "utf8"));
assert.equal(data.experiments.matrix.result.samples.resident.length, 9);
assert.equal(data.experiments.regression.input.points.length, 10);
assert.equal("csv" in data.experiments, false);
await fs.writeFile(
  artifacts + "/ubique-lab-report.json",
  JSON.stringify(data, null, 2),
);
await page.screenshot({
  path: artifacts + "/ubique-lab-desktop.png",
  fullPage: true,
});
await page.goto(base + "/learn.html");
await page.waitForFunction(() =>
  document.querySelector("#wasm-result").textContent.includes("42")
);
await page.click("#dot-next");
assert.match(await page.locator("#dot-result").innerText(), /19 — complete/);
await page.click("#walk-next");
assert.match(await page.locator("#walk-status").innerText(), /offset 4/);
await page.selectOption("#walk-mode", "row");
await page.click("#walk-next");
assert.match(await page.locator("#walk-status").innerText(), /offset 1/);
await page.click("#teach-run");
await page.waitForFunction(() =>
  document.querySelector("#teach-result").textContent.includes(
    "Maximum absolute error",
  )
);
const td = page.waitForEvent("download");
await page.click("#teach-download");
const t = JSON.parse(await fs.readFile(await (await td).path(), "utf8"));
assert.equal(t.samples.tile.length, 9);
await page.screenshot({
  path: artifacts + "/ubique-learn-desktop.png",
  fullPage: true,
});
for (const url of ["learn.html"]) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + "/" + url);
  assert(
    await page.evaluate(() =>
      document.documentElement.scrollWidth <= globalThis.innerWidth
    ),
  );
  await page.screenshot({
    path: artifacts + "/ubique-" + url + "-mobile.png",
    fullPage: true,
  });
}
await page.goto(base + "/lab.html#regression");
await page.waitForURL("**/learn.html#regression");
assert.deepEqual(errors, []);
console.log(
  "PASS: embedded experiments, no CSV/upload flow, translated regression, resident benchmark correctness/raw export, tutorial dot/memory/WASM/kernels/export, desktop/mobile overflow, zero page errors",
);
await browser.close();
