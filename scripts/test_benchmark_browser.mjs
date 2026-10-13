import { chromium } from "npm:playwright@1.59.1";
import process from "node:process";
const base = process.env.UBIQUE_BASE_URL || "http://127.0.0.1:8873";
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined,
});
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.goto(base + "/benchmark.html");
await page.waitForFunction(() => globalThis.rubiqueReady, { timeout: 30000 });
await page.locator("#begin-link").click();
await page.waitForFunction(
  () =>
    allResults.length === 9 &&
    document.getElementById("sum-mean").textContent !== "—",
  null,
  { timeout: 120000 },
);
const result = await page.evaluate(async () => {
  const results = allResults.map((r) => ({
    name: r.name,
    samples: r.ubiqueSamples.length,
    finite: Number.isFinite(r.speedup),
  }));
  const figure = document.querySelector(".figure");
  await runOneTest(
    {
      name: "deliberate mismatch",
      setup: () => ({ args: [] }),
      rubique: () => 1,
      mathjs: () => 2,
    },
    figure,
    1,
  );
  const rejected = figure.querySelector(".speedup-label").textContent.includes(
    "failed",
  );
  const a = globalThis.rubique.DenseMatrix.from([[1, 2], [3, 4]]),
    out = new globalThis.rubique.DenseMatrix(2, 2);
  let product;
  try {
    a.multiplyInto(a, out);
    product = out.toArray();
  } finally {
    a.dispose();
    out.dispose();
  }
  return { results, rejected, product };
});
const zero = await page.evaluate(async () => {
  const protocol = globalThis.benchmarkProtocol;
  const count = allResults.length;
  globalThis.benchmarkProtocol = {
    ...protocol,
    timeBatch: () => 0,
    calibrateIterations: () => 1,
  };
  try {
    await runOneTest(tests[0], document.querySelector(".figure"), 0);
  } finally {
    globalThis.benchmarkProtocol = protocol;
  }
  return {
    sameCount: allResults.length === count,
    excluded: unresolvedResults.length,
    label: document.querySelector(".speedup-value").textContent,
  };
});
if (!zero.sameCount || zero.excluded !== 1 || zero.label !== "Unresolved") {
  throw new Error("Zero timer was not rejected");
}
console.log(JSON.stringify({ result, zero, errors }));
await page.screenshot({ path: "/tmp/ubique-benchmark.png", fullPage: true });
const downloadPromise = page.waitForEvent("download");
await page.getByRole("button", { name: "Export raw results" }).click();
const download = await downloadPromise;
await download.saveAs("/tmp/ubique-browser-results.json");
const report = JSON.parse(
  await (await import("node:fs/promises")).readFile(
    "/tmp/ubique-browser-results.json",
    "utf8",
  ),
);
if (
  report.results.length !== 9 ||
  !/^[0-9a-f]{64}$/.test(report.metadata.bundleSha256)
) throw new Error("Invalid export");
if (report.unresolvedResults.length !== 1) {
  throw new Error("Missing unresolved raw samples");
}
console.log("Browser export and zero-timer regression verified");
await browser.close();
if (
  errors.length || result.results.length !== 9 || !result.rejected ||
  result.results.some((r) => !r.finite)
) process.exit(1);
