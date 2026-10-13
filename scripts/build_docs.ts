import {
  dirname,
  join,
  relative,
  resolve,
} from "https://deno.land/std@0.224.0/path/mod.ts";

import { buildLearn } from "./build_learn.ts";
import {
  brandFiles,
  brandHead,
  siteFooter,
  siteHeader,
} from "./brand_chrome.ts";

const docsOutput = "./docs";
const docArgs = [
  "doc",
  "--html",
  "--name=Ubique",
  `--output=${docsOutput}`,
  "lib/",
];

const docCommand = new Deno.Command(Deno.execPath(), {
  args: docArgs,
  stdout: "inherit",
  stderr: "inherit",
});

const docProcess = docCommand.spawn();
const docStatus = await docProcess.status;

if (!docStatus.success) {
  console.error("Documentation generation failed.");
  Deno.exit(docStatus.code ?? 1);
}

const assetFiles = [
  "styles.css",
  "page.css",
  "reset.css",
  "comrak.css",
  "prism.css",
  "prism.js",
  "script.js",
  "darkmode_toggle.js",
  "search_index.js",
  "fuse.js",
  "search.js",
  "nodal.css",
  "nodal.js",
  "favicon.svg",
  "ubique-docs.css",
];

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function pathToRoot(docsRoot: string, dir: string): string {
  const relativeDir = relative(docsRoot, dir);
  if (relativeDir === "" || relativeDir === ".") return ".";
  const segments = relativeDir.replace(/\\/g, "/").split("/").filter(Boolean);
  if (segments.length === 0) {
    return ".";
  }
  return segments.map(() => "..").join("/");
}

async function* walkHtml(dir: string): AsyncGenerator<string> {
  for await (const entry of Deno.readDir(dir)) {
    const entryPath = join(dir, entry.name);
    if (entry.isDirectory) {
      yield* walkHtml(entryPath);
    } else if (entry.isFile && entry.name.endsWith(".html")) {
      yield entryPath;
    }
  }
}

type FixDocAssetsOptions = {
  root?: string;
  assets?: string[];
};

async function fixDocAssets(
  options: FixDocAssetsOptions = {},
): Promise<number> {
  const docsRootArg = options.root ?? "./docs";
  const docsRoot = resolve(Deno.cwd(), docsRootArg);
  const assets = options.assets ?? assetFiles;
  let filesUpdated = 0;

  for await (const filePath of walkHtml(docsRoot)) {
    const original = await Deno.readTextFile(filePath);
    let updated = original;
    let changed = false;

    const prefix = pathToRoot(docsRoot, dirname(filePath));

    for (const asset of assets) {
      const pattern = new RegExp(
        `(href|src)="([^"]*?)${escapeRegExp(asset)}"`,
        "g",
      );
      const replacementPath = prefix === "." ? asset : `${prefix}/${asset}`;
      updated = updated.replace(pattern, (_match, attr, _currentPath) => {
        changed = true;
        return `${attr}="${replacementPath}"`;
      });
    }

    if (changed && updated !== original) {
      await Deno.writeTextFile(filePath, updated);
      filesUpdated += 1;
    }
  }

  return filesUpdated;
}

async function fixDocLinks(options: FixDocAssetsOptions = {}): Promise<number> {
  const docsRootArg = options.root ?? "./docs";
  const docsRoot = resolve(Deno.cwd(), docsRootArg);
  let filesUpdated = 0;

  for await (const filePath of walkHtml(docsRoot)) {
    const original = await Deno.readTextFile(filePath);

    // Replace all backslashes in href attributes with forward slashes
    const updated = original.replace(/href="([^"]*?)"/g, (_match, path) => {
      const normalized = path.replace(/\\/g, "/");
      return `href="${normalized}"`;
    });

    if (updated !== original) {
      await Deno.writeTextFile(filePath, updated);
      filesUpdated += 1;
    }
  }

  return filesUpdated;
}

/**
 * Dresses every deno-doc page in the Nodal Studio chrome: brand layer and
 * favicon in <head>, studio header and footer around the generated content.
 * Deno's own top bar stays as a sticky sub-bar (breadcrumbs + search). The
 * dark theme is dropped: the brand is cream and ink. On index.html the .toc
 * sidebar is hidden; the landing script builds the catalogue there.
 */
const sourceBase = "https://github.com/NodalStudio/Ubique/blob/HEAD/";

async function brandDocPages(
  options: FixDocAssetsOptions = {},
): Promise<number> {
  const docsRoot = resolve(Deno.cwd(), options.root ?? "./docs");
  let filesUpdated = 0;

  for await (const filePath of walkHtml(docsRoot)) {
    const original = await Deno.readTextFile(filePath);
    if (!original.includes('<div class="ddoc">')) continue;
    if (original.includes('class="ns-head"')) continue;
    const root = pathToRoot(docsRoot, dirname(filePath));
    const isIndexPage = relative(docsRoot, filePath) === "index.html";

    const updated = original
      .replace(/<script src="[^"]*darkmode_toggle\.js"><\/script>/, "")
      // "function&nbsp;mean": the kind becomes a kicker above the name.
      .replace(/(<span class="text-[A-Za-z]+">[^<]*<\/span>)&nbsp;/, "$1")
      // Source buttons point at the build machine's disk; send them to GitHub.
      .replace(
        /(class="sourceButton"\s*href=")([^"]*)"/g,
        (_m, start: string, href: string) => {
          const path = href.replace(/&#x2F;/g, "/").replace(/\\/g, "/");
          const lib = path.lastIndexOf("/lib/");
          return lib === -1
            ? `${start}${href}"`
            : `${start}${sourceBase}${path.slice(lib + 1)}"`;
        },
      )
      .replace(
        /<\/head>/,
        `${
          brandHead(root)
        }<link rel="stylesheet" href="${root}/ubique-docs.css">` +
          (isIndexPage ? "<style>.toc { display: none; }</style>" : "") +
          "</head>",
      )
      .replace(
        /<body>/,
        `<body class="ns${isIndexPage ? " ns-api-home" : ""}">${
          siteHeader("api", root)
        }<div id="main">`,
      )
      .replace(/<\/body>/, `</div>${siteFooter()}</body>`);

    if (updated !== original) {
      await Deno.writeTextFile(filePath, updated);
      filesUpdated += 1;
    }
  }

  return filesUpdated;
}

function extractFirstSentence(value: string): string {
  const trimmed = value.trim();
  if (trimmed === "") return "";
  const punctuationIndex = trimmed.search(/[.!?]/);
  if (punctuationIndex === -1) {
    return trimmed;
  }
  return trimmed.slice(0, punctuationIndex + 1).trim();
}

async function trimSearchIndexDocs(fileUrl: URL): Promise<boolean> {
  const content = await Deno.readTextFile(fileUrl);
  const prefix = "window.DENO_DOC_SEARCH_INDEX";
  const prefixIndex = content.indexOf(prefix);
  if (prefixIndex === -1) {
    console.warn("Unable to locate DENO_DOC_SEARCH_INDEX payload.");
    return false;
  }

  const equalsIndex = content.indexOf("=", prefixIndex + prefix.length);
  if (equalsIndex === -1) {
    console.warn("Malformed search index assignment.");
    return false;
  }

  const jsonStart = content.indexOf("{", equalsIndex);
  if (jsonStart === -1) {
    console.warn("Unable to locate search index JSON start.");
    return false;
  }

  const assignmentEnd = content.indexOf("};", jsonStart);
  if (assignmentEnd === -1) {
    console.warn("Unable to locate search index JSON end.");
    return false;
  }

  const jsonPayload = content.slice(jsonStart, assignmentEnd + 1);

  let data;

  try {
    data = JSON.parse(jsonPayload);
  } catch (error) {
    console.warn("Failed to parse search index JSON:", error);
    return false;
  }

  if (!Array.isArray(data?.nodes)) {
    console.warn("Unexpected search index format: missing nodes array.");
    return false;
  }

  let changed = false;

  for (const node of data.nodes) {
    if (typeof node.doc === "string" && node.doc.length > 0) {
      const summary = extractFirstSentence(node.doc);
      if (summary !== node.doc) {
        node.doc = summary;
        changed = true;
      }
    }
  }

  if (!changed) return false;

  const updatedPayload = JSON.stringify(data);
  const updatedContent = content.slice(0, jsonStart) +
    updatedPayload +
    content.slice(assignmentEnd + 1);

  await Deno.writeTextFile(fileUrl, updatedContent);
  return true;
}

const assetsDirUrl = new URL("../scripts/assets/", import.meta.url);

const landingScriptUrl = new URL("./landing_script.js", assetsDirUrl);
const landingCssUrl = new URL("./landing.css", assetsDirUrl);
const benchmarkHtmlUrl = new URL("./benchmark.html", assetsDirUrl);
const targetScriptUrl = new URL("../docs/script.js", import.meta.url);
const targetCssUrl = new URL("../docs/page.css", import.meta.url);
const targetBenchmarkUrl = new URL("../docs/benchmark.html", import.meta.url);

const scriptOverride = await Deno.readTextFile(landingScriptUrl);
await Deno.writeTextFile(targetScriptUrl, scriptOverride);

await Deno.copyFile(landingCssUrl, `${docsOutput}/ubique-docs.css`);
// Older builds appended the landing overrides to page.css; strip them.
const landingCssMarker = "/* rubique landing overrides */";
const pageCss = await Deno.readTextFile(targetCssUrl);
const markerIndex = pageCss.indexOf(landingCssMarker);
if (markerIndex !== -1) {
  await Deno.writeTextFile(
    targetCssUrl,
    pageCss.slice(0, markerIndex).trimEnd() + "\n",
  );
}

for (const file of brandFiles) {
  await Deno.mkdir(dirname(`${docsOutput}/${file}`), { recursive: true });
  await Deno.copyFile(
    new URL(`brand/${file}`, assetsDirUrl),
    `${docsOutput}/${file}`,
  );
}

const benchmarkHtml = (await Deno.readTextFile(benchmarkHtmlUrl))
  .replace("<!--ns:head-->", brandHead())
  .replace("<!--ns:header-->", siteHeader("benchmark"))
  .replace(
    "<!--ns:footer-->",
    siteFooter(
      "Timings come from your device and browser; they are not universal guarantees. Inputs are seeded, results are checked before timing.",
    ),
  );
await Deno.writeTextFile(targetBenchmarkUrl, benchmarkHtml);

// Benchmark the source being documented, never a stale remote package.
for (
  const [entry, output] of [["index.ts", "ubique.js"], [
    "scripts/article_worker.ts",
    "article_worker.js",
  ], [
    "scripts/benchmark_helpers.ts",
    "benchmark_helpers.js",
  ]]
) {
  const result = await new Deno.Command(Deno.execPath(), {
    args: [
      "bundle",
      "--platform=browser",
      entry,
      "--output",
      `${docsOutput}/${output}`,
    ],
    stdout: "inherit",
    stderr: "inherit",
  }).output();
  if (!result.success) throw new Error(`Failed to bundle ${entry}`);
}

for (const file of ["article.css", "article_experiments.js", "learn.js"]) {
  await Deno.copyFile(new URL(file, assetsDirUrl), `${docsOutput}/${file}`);
}
await buildLearn(docsOutput);

const bundleBytes = await Deno.readFile(`${docsOutput}/ubique.js`);
const digest = new Uint8Array(
  await crypto.subtle.digest("SHA-256", bundleBytes),
);
await Deno.writeTextFile(
  `${docsOutput}/benchmark_build.json`,
  JSON.stringify(
    {
      source: Deno.env.get("GITHUB_SHA")
        ? `https://github.com/NodalStudio/Ubique/commit/${Deno.env.get("GITHUB_SHA")}`
        : "local checkout (package release pending)",
      builtAt: new Date().toISOString(),
      bundleSha256: Array.from(digest, (b) => b.toString(16).padStart(2, "0"))
        .join(""),
      mathjs: "15.2.0",
    },
    null,
    2,
  ),
);

const assetsUpdated = await fixDocAssets({ root: docsOutput });
const linksUpdated = await fixDocLinks({ root: docsOutput });
const pagesBranded = await brandDocPages({ root: docsOutput });
const searchIndexUrl = new URL("../docs/search_index.js", import.meta.url);
const trimmed = await trimSearchIndexDocs(searchIndexUrl);
console.log(
  `Documentation built successfully. Normalized asset paths in ${assetsUpdated} HTML file(s), ` +
    `fixed links in ${linksUpdated} HTML file(s).` +
    (pagesBranded ? ` Branded ${pagesBranded} API page(s).` : "") +
    (trimmed ? " Trimmed search index summaries." : ""),
);
