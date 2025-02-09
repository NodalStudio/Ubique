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
 * Check if a TypeScript file has a default export.
 *
 * @param {string} filePath - Path to the TypeScript file
 * @returns {Promise<boolean>} - Whether the file has a default export
 */
async function hasDefaultExport(filePath: string): Promise<boolean> {
  try {
    const content = await Deno.readTextFile(filePath);

    // Regular expressions to match different forms of default exports
    const patterns = [
      /export\s+default\s+/, // export default ...
      /export\s*{\s*.*\s+as\s+default\s*}/, // export { something as default }
      /export\s*=\s*/, // export = ...
    ];

    return patterns.some((pattern) => pattern.test(content));
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return false;
  }
}

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

interface ModuleInfo {
  path: string;
  name: string;
  hasDefaultExport: boolean;
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

    // Analyze each file for default exports
    const moduleInfos: ModuleInfo[] = await Promise.all(
      files.map(async (file) => {
        const hasDefault = await hasDefaultExport(file);
        return {
          path: file.replace(/^\.?\//, "./").replace(/\\/g, "/"),
          name: basename(file, ".ts"),
          hasDefaultExport: hasDefault,
        };
      }),
    );

    // Generate import statements only for modules with default exports
    const imports = moduleInfos
      .filter((module) => module.hasDefaultExport)
      .map((module) => `import ${module.name} from '${module.path}';`);

    // Generate export statement that re-exports only modules with default exports
    const exportNames = moduleInfos
      .filter((module) => module.hasDefaultExport)
      .map((module) => module.name)
      .join(", ");

    // Generate warning for modules without default exports
    const skippedModules = moduleInfos
      .filter((module) => !module.hasDefaultExport)
      .map((module) => module.path);

    if (skippedModules.length > 0) {
      console.warn("⚠️ Skipped modules without default exports:");
      skippedModules.forEach((path) => console.warn(`  - ${path}`));
    }

    // Final content for index.ts
    const content = [
      "// Auto-generated index.ts",
      imports.length > 0 ? imports.join("\n") : "",
      exportNames
        ? `\nexport { ${exportNames} };`
        : "// No default exports found",
      "",
    ].filter(Boolean).join("\n");

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
