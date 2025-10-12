import {
  dirname,
  join,
  relative,
  resolve,
} from "https://deno.land/std@0.224.0/path/mod.ts";

const docsOutput = "./docs";
const docArgs = [
  "doc",
  "--html",
  "--name=Rubique",
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
  options: FixDocAssetsOptions = {}
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
        "g"
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
  const updatedContent =
    content.slice(0, jsonStart) +
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

const cssAppend = await Deno.readTextFile(landingCssUrl);
const cssAppendTrimmed = cssAppend.trim();
const landingCssMarker = "/* rubique landing overrides */";
const pageCss = await Deno.readTextFile(targetCssUrl);

const escapedMarker = landingCssMarker.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
const landingBlockRegex = new RegExp(`\n?${escapedMarker}[\\s\\S]*$`);
const baseCss = pageCss.replace(landingBlockRegex, "");
const normalized = baseCss.endsWith("\n") ? baseCss : `${baseCss}\n`;
await Deno.writeTextFile(targetCssUrl, `${normalized}${cssAppendTrimmed}\n`);

await Deno.copyFile(benchmarkHtmlUrl, targetBenchmarkUrl);

const updated = await fixDocAssets({ root: docsOutput });
const searchIndexUrl = new URL("../docs/search_index.js", import.meta.url);
const trimmed = await trimSearchIndexDocs(searchIndexUrl);
console.log(
  `Documentation built successfully. Normalized asset paths in ${updated} HTML file(s).` +
    (trimmed ? " Trimmed search index summaries." : "")
);
