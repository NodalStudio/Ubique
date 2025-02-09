const cmd = new Deno.Command("wasm-pack", {
  args: ["build", "--target", "bundler"],
  cwd: "ubique_wasm",
});

console.log("🚀 Building WebAssembly in ubique_wasm...");
const { success } = await cmd.output();

if (success) {
  console.log("✅ Build completed successfully!");
  (new Deno.Command("rm", {
    args: [".gitignore"],
    cwd: "ubique_wasm/pkg",
  })).spawn();
} else {
  console.error("❌ Build failed.");
  Deno.exit(1);
}
