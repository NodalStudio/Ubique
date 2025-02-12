import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./dist");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./dist",
  shims: {
    deno: true,
  },
  compilerOptions: {
    target: "ES2017",
    lib: ["ES2017"],
  },
  package: {
    name: "ubique",
    version: "1.0.0",
    description:
      "A mathematical and quantitative library for JavaScript and Deno",
    license: "MIT",
    repository: {
      type: "git",
      url: "https://github.com/maxto/ubique.git",
    },
    bugs: {
      url: "https://github.com/maxto/ubique/issues",
    },
    keywords: [
      "mathematics",
      "matrix",
      "arithmetic",
      "statistics",
      "linear algebra",
      "matlab",
      "regression",
      "finance",
      "quantitative analysis",
    ],
    main: "./ubique.cjs.js",
    module: "./ubique.esm.js",
    types: "./ubique.d.ts",
    engines: {
      node: ">=12",
    },
  },
  typeCheck: "single",
  test: false,
});
