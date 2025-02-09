import fs from 'fs';
import path from 'path';

/**
 * Directory containing all `.js` files to modify.
 */
const libDir = path.resolve('./test');

/**
 * Regular expression to match named imports.
 */
const namedImportRegex = /import\s*\{\s*([a-zA-Z0-9_]+)\s*\}\s*from\s*['"](.+?)['"];/g;

/**
 * Recursively get all `.js` files inside `lib/`.
 *
 * @param {string} dir - The directory to scan.
 * @returns {string[]} - List of `.js` file paths.
 */
const getFiles = (dir) => {
  return fs.readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? getFiles(fullPath) : fullPath;
    })
    .filter(file => file.endsWith('.js'));
};

/**
 * Converts named imports to default imports inside each file.
 *
 * @param {string} file - The file to process.
 */
const convertImports = (file) => {
  const content = fs.readFileSync(file, 'utf8');

  // Replace all named imports with default imports
  const updatedContent = content.replace(namedImportRegex, (_, name, path) => {
    return `import ${name} from '${path}';`;
  });

  if (content !== updatedContent) {
    fs.writeFileSync(file, updatedContent, 'utf8');
    console.log(`✅ Converted imports in: ${file}`);
  }
};

/**
 * Process all `.js` files inside `lib/` and replace named imports.
 */
const processFiles = () => {
  if (!fs.existsSync(libDir)) {
    console.error('Error: `lib/` directory does not exist.');
    process.exit(1);
  }

  const files = getFiles(libDir);

  if (files.length === 0) {
    console.warn('Warning: No `.js` files found in `lib/`.');
    return;
  }

  files.forEach(convertImports);
  console.log(`✅ All named imports replaced with default imports.`);
};

// Run the script
processFiles();
