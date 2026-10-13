/**
 * Nodal Studio chrome shared by every generated Ubique page: header, footer and
 * the <head> links of the brand layer (scripts/assets/brand). Paths are relative
 * to the docs root; build_docs.ts rewrites them for nested API pages.
 */
export type Section = "api" | "learn" | "benchmark";

export const brandFiles = [
  "nodal.css",
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

export const badge =
  `<svg class="ns-badge" viewBox="0 0 114.17 114.16" aria-hidden="true" focusable="false"><path class="b-bg" d="M27.01 0h60.16c14.85 0 27 12.15 27 27v60.16c0 14.85-12.15 27-27 27H27.01c-14.85 0-27-12.15-27-27V27.01C0 12.15 12.15 0 27.01 0z"/><path class="b-st" stroke-width="12" stroke-miterlimit="10" d="M22.03 15.58v83.01"/><path class="b-st" stroke-width="12" stroke-linejoin="bevel" stroke-miterlimit="10" d="M23.2 18.7l41.52 65.79.11.07c2.96 5.04 9.16 8.48 16.01 8.48 9.8 0 17.74-7.04 17.74-15.72 0-4.46-1.26-7.61-3.4-10.21l-28.57-22.31c-2.14-2.6-3.05-5.52-3.05-8.97 0-8.68 7.94-15.72 17.74-15.72 6.85 0 12.79 3.44 15.75 8.48"/></svg>`;

/** Full-width 6px rule that closes an ink block, as on the studio site. */
export const nsRule =
  `<svg class="ns-rule" viewBox="0 0 1200 48" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 24h1200"/></svg>`;

export function brandHead(root = "."): string {
  return `<link rel="icon" href="${root}/favicon.svg" type="image/svg+xml">` +
    `<link rel="preload" href="${root}/fonts/display.woff2" as="font" type="font/woff2" crossorigin>` +
    `<link rel="preload" href="${root}/fonts/body.woff2" as="font" type="font/woff2" crossorigin>` +
    `<link rel="stylesheet" href="${root}/nodal.css">` +
    `<script src="${root}/nodal.js" defer></script>`;
}

export function siteHeader(current: Section, root = "."): string {
  const link = (key: Section, href: string, label: string) =>
    `<a href="${root}/${href}"${
      key === current ? ' aria-current="page"' : ""
    }>${label}</a>`;
  return `<a class="ns-skip" href="#main">Skip to content</a>` +
    `<header class="ns-head"><a class="ns-brand" href="${root}/index.html" aria-label="Ubique — API reference">${badge}<span class="ns-brand-name logotype">Ubique</span><span class="ns-brand-sub">by Nodal Studio</span></a>` +
    `<nav class="ns-nav" aria-label="Main">${link("api", "index.html", "API")}${
      link("learn", "learn.html", "Learn")
    }${
      link("benchmark", "benchmark.html", "Benchmark")
    }<a class="ns-hide-sm" href="https://github.com/NodalStudio/Ubique">GitHub ↗</a></nav></header>`;
}

export function siteFooter(note = ""): string {
  return `<footer class="ns-foot"><span>© ${
    new Date().getFullYear()
  } <a class="logotype" href="https://nodalstudio.io/">Nodal Studio</a> · Ubique, MIT</span>` +
    `<nav class="ns-foot-links" aria-label="Footer links"><a href="https://jsr.io/@nodalstudio/ubique">JSR</a><a href="https://www.npmjs.com/package/ubique">npm</a><a href="https://github.com/NodalStudio/Ubique">GitHub</a></nav>` +
    (note ? `<p class="ns-foot-note">${note}</p>` : "") +
    `</footer>`;
}
