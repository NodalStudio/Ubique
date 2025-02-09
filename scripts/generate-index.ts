import { basename } from "https://deno.land/std/path/mod.ts";

/**
 * Directory containing all `.ts` files.
 */
const LIB_DIR = "./lib";

/**
 * Output file at the root of the project.
 */
const OUTPUT_FILE = "./index.ts";

/**
 * Recursively get all `.ts` files inside `lib/`, excluding `.d.ts` files.
 *
 * @param {string} dir - The directory to scan.
 * @returns {Promise<string[]>} - List of relative file paths.
 */
async function getFiles(dir: string): Promise<string[]> {
  const entries: string[] = [];

  for await (const entry of Deno.readDir(dir)) {
    const fullPath = `${dir}/${entry.name}`;

    if (entry.isDirectory) {
      const subFiles = await getFiles(fullPath);
      entries.push(...subFiles);
    } else if (
      entry.name.endsWith(".ts") &&
      !entry.name.endsWith(".d.ts") &&
      entry.name !== "index.ts"
    ) {
      entries.push(fullPath);
    }
  }

  return entries;
}

/**
 * Generate `index.ts` at the root, importing and re-exporting all modules.
 */
async function generateIndex() {
  try {
    // Check if the lib directory exists
    const libExists = await Deno.stat(LIB_DIR)
      .then(() => true)
      .catch(() => false);

    if (!libExists) {
      console.error("❌ Error: `lib/` directory does not exist.");
      Deno.exit(1);
    }

    // Get all `.ts` files inside `lib/`
    const files = await getFiles(LIB_DIR);

    if (files.length === 0) {
      console.warn("⚠️ Warning: No `.ts` files found in `lib/`.");
      return;
    }

    // Generate import statements with default imports
    const imports = files.map((file) => {
      // Normalize path to always start with './' and use forward slashes
      const relativePath = file.replace(/^\.?\//, "./").replace(/\\/g, "/");
      // Use the file's basename (without .ts) as the module name
      const moduleName = basename(relativePath, ".ts");
      return `import ${moduleName} from '${relativePath}';`;
    });

    // Generate export statement that re-exports all modules
    const exportNames = files
      .map((file) => {
        const relativePath = file.replace(LIB_DIR + "/", "");
        return basename(relativePath, ".ts");
      })
      .join(", ");

    const exportStatement = `export { ${exportNames} };`;

    // Final content for index.ts
    const content = `// Auto-generated index.ts\n${
      imports.join("\n")
    }\n\n${exportStatement}\n`;

    // Write to index.ts at the project root
    await Deno.writeTextFile(OUTPUT_FILE, content);
    console.log("✅ index.ts generated successfully at the root.");
  } catch (error) {
    console.error("❌ Error generating index.ts:", error);
    Deno.exit(1);
  }
}

// Run the script
await generateIndex();
