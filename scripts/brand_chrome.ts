/**
 * Nodal Studio chrome shared by every generated Ubique page: header, footer and
 * the <head> links of the brand layer (scripts/assets/brand). Paths are relative
 * to the docs root; build_docs.ts rewrites them for nested API pages.
 */
export type Section = "api" | "learn" | "benchmark";

export const brandFiles = [
  "nodal.css",
  "docs.css",
  "docs_examples.js",
  "nodal.js",
  "favicon.svg",
  "og.png",
  "fonts/display.woff2",
  "fonts/display-medium.woff2",
  "fonts/body.woff2",
  "fonts/body-medium.woff2",
  "fonts/body-semibold.woff2",
  "fonts/body-bold.woff2",
  "fonts/body-italic.woff2",
  "fonts/mono.woff2",
  "fonts/mono-medium.woff2",
  "fonts/OFL-JetBrainsMono.txt",
];

/** Absolute base of the published docs, for the social cards. */
export const siteBase = "https://nodalstudio.github.io/Ubique/";

/**
 * Open Graph and Twitter tags, so that LinkedIn, Slack and the rest show a
 * title, a description and the brand card instead of nothing. `path` is the
 * page's path from the docs root ("learn.html", "linalgebra/index.html").
 */
export function socialHead(
  { title, description, path }: {
    title: string;
    description: string;
    path: string;
  },
): string {
  const esc = (v: string) => v.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
  const url = siteBase + path.replace(/^\.?\//, "");
  return `<meta property="og:type" content="website">` +
    `<meta property="og:site_name" content="Ubique">` +
    `<meta property="og:title" content="${esc(title)}">` +
    `<meta property="og:description" content="${esc(description)}">` +
    `<meta property="og:url" content="${url}">` +
    `<meta property="og:image" content="${siteBase}og.png">` +
    `<meta property="og:image:width" content="1200">` +
    `<meta property="og:image:height" content="630">` +
    `<meta property="og:image:alt" content="Ubique — Numerical and financial computing in TypeScript">` +
    `<meta name="twitter:card" content="summary_large_image">` +
    `<meta name="twitter:title" content="${esc(title)}">` +
    `<meta name="twitter:description" content="${esc(description)}">` +
    `<meta name="twitter:image" content="${siteBase}og.png">`;
}

export function brandHead(root = "."): string {
  return `<link rel="icon" href="${root}/favicon.svg" type="image/svg+xml">` +
    `<link rel="preload" href="${root}/fonts/display.woff2" as="font" type="font/woff2" crossorigin>` +
    `<link rel="preload" href="${root}/fonts/body.woff2" as="font" type="font/woff2" crossorigin>` +
    `<link rel="stylesheet" href="${root}/nodal.css">` +
    `<script type="module" src="${root}/docs_examples.js"></script>`;
}

export function siteHeader(current: Section, root = "."): string {
  const link = (key: Section, href: string, label: string) =>
    `<a href="${root}/${href}"${
      key === current ? ' aria-current="page"' : ""
    }>${label}</a>`;
  return `<a class="ns-skip" href="#main">Skip to content</a>` +
    `<header class="ns-head"><a class="ns-brand" href="${root}/index.html" aria-label="Ubique — API reference"><span class="ns-brand-name">Ubique</span><span class="ns-brand-sub">v1.0.4</span></a>` +
    `<nav class="ns-nav" aria-label="Main">${link("api", "index.html", "API")}${
      link("learn", "learn.html", "Under the hood")
    }${
      link("benchmark", "benchmark.html", "Benchmark")
    }<a class="ns-hide-sm" href="https://github.com/NodalStudio/Ubique">GitHub ↗</a></nav></header>`;
}

export function siteFooter(note = ""): string {
  return `<footer class="ns-foot"><span>Ubique · MIT · Maintained by <a href="https://nodalstudio.io/">Nodal Studio</a></span>` +
    `<nav class="ns-foot-links" aria-label="Footer links"><a href="https://jsr.io/@nodalstudio/ubique">JSR</a><a href="https://www.npmjs.com/package/ubique">npm</a><a href="https://github.com/NodalStudio/Ubique">GitHub</a></nav>` +
    (note ? `<p class="ns-foot-note">${note}</p>` : "") +
    `</footer>`;
}
