import { build, emptyDir } from "jsr:@deno/dnt@0.41.3";

await emptyDir("./npm");

await build({
  entryPoints: ["./index.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
  },
  test: false,
  typeCheck: "both",
  declaration: "separate",
  compilerOptions: {
    lib: ["ES2021", "DOM"],
  },
  filterDiagnostic(diagnostic) {
    // Ignore vitest errors since we're not including tests
    if (
      diagnostic.file?.fileName.includes("test.ts") ||
      diagnostic.file?.fileName.includes("vitest")
    ) {
      return false;
    }
    return true;
  },
  package: {
    name: "ubique",
    version: Deno.args[0] || "1.0.0",
    description:
      "A high-performance mathematical and quantitative library, leveraging WebAssembly for efficient linear algebra and numerical computations",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/NodalStudio/Ubique.git",
    },
    bugs: {
      url: "https://github.com/NodalStudio/Ubique/issues",
    },
    dependencies: {
      dayjs: "^1.11.13",
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
      "wasm",
      "webassembly",
    ],
    contributors: [
      {
        name: "Benoît Mayer",
        email: "mayer.benoit@gmail.com",
        url: "https://github.com/bemayer",
      },
      {
        name: "Max Todaro",
        email: "m.todaro.ge@gmail.com",
        url: "https://github.com/maxto",
      },
    ],
  },
  postBuild() {
    // Copy important files to npm output directory
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README_NPM.md", "npm/README.md");
    console.log("✓ Copied LICENSE and README_NPM.md");
    console.log("✓ WASM is inlined in rs_lib.js (no separate .wasm file needed)");
  },
});
