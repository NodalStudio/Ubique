import { chromium } from "npm:playwright@1.59.1";
import assert from "node:assert/strict";
const base = process.env.UBIQUE_BASE_URL || "http://127.0.0.1:8873";
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined,
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
try {
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    for (
      const path of [
        "/",
        "/learn.html",
        "/benchmark.html",
        "/linalgebra/matmul.ts/~/matmul.html",
      ]
    ) {
      await page.goto(base + path);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(
        await page.locator(".ns-badge,.api-hero,.ns-hero").count(),
        0,
      );
      assert.ok(
        await page.evaluate(() =>
          document.documentElement.scrollWidth <= innerWidth
        ),
        `overflow ${width} ${path}`,
      );
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base + "/");
  const boxes = await page.evaluate(
    () => [
      document.querySelector(".api-filters").getBoundingClientRect().right,
      document.querySelector(".docs-intro").getBoundingClientRect().left,
    ],
  );
  assert.ok(boxes[0] < boxes[1], "sidebar must not overlap content");
  assert.equal(await page.locator("#cat-internal").count(), 0);
  for (
    const [path, expected] of [
      ["/linalgebra/matmul.ts/~/matmul.html", "[[19,22],[43,50]]"],
      ["/linalgebra/dense_matrix.ts/~/DenseMatrix.html", "[[19,22],[43,50]]"],
      ["/linalgebra/factorize.ts/~/factorize.html", "[2,3]"],
    ]
  ) {
    await page.goto(base + path);
    const panel = page.locator(".doc-example");
    await panel.locator("button").click();
    await page.waitForFunction(() =>
      document.querySelector(".doc-example output")?.textContent !== "Ready."
    );
    const result = await panel.locator("output").textContent();
    assert.deepEqual(
      JSON.parse(result).map((x) => Array.isArray(x) ? x : x),
      JSON.parse(expected),
    );
    if (path.includes("matmul")) {
      for (const backend of ["js", "wasm"]) {
        await panel.locator("select").selectOption(backend);
        await panel.locator("button").click();
        await page.waitForFunction(() =>
          !document.querySelector(".doc-example button").disabled
        );
        assert.equal(await panel.locator("output").textContent(), expected);
      }
    }
    await panel.locator("textarea").first().fill("[[1],[2,3]]");
    await panel.locator("button").click();
    assert.match(await panel.locator("output").textContent(), /rectangular/);
  }
  assert.deepEqual(errors, []);
  console.log(
    "Documentation: desktop/mobile layout, API examples and validation passed.",
  );
} finally {
  await browser.close();
}
