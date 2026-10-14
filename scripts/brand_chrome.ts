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
      link("learn", "learn.html", "Guide")
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
