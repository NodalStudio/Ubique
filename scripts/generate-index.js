import fs from 'fs';
import path from 'path';

/**
 * Directory containing all `.js` files.
 */
const libDir = path.resolve('./lib');

/**
 * Output file at the root of the project.
 */
const outputFile = path.resolve('./index.js');

/**
 * Recursively get all `.js` files inside `lib/`.
 *
 * @param {string} dir - The directory to scan.
 * @returns {string[]} - List of relative file paths.
 */
const getFiles = (dir) => {
  return fs.readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      return entry.isDirectory() ? getFiles(fullPath) : fullPath;
    })
    .filter((file) => file.endsWith('.js'));
};

/**
 * Generate `index.js` at the root, importing and re-exporting all modules.
 */
const generateIndex = () => {
  if (!fs.existsSync(libDir)) {
    console.error('Error: `lib/` directory does not exist.');
    process.exit(1);
  }

  // Get all JS files inside `lib/`
  const files = getFiles(libDir);

  if (files.length === 0) {
    console.warn('Warning: No `.js` files found in `lib/`.');
    return;
  }

  // Generate import statements
  const imports = files.map((file) => {
    const relativePath = `./${path.relative('.', file).replace(/\\/g, '/')}`;
    const moduleName = path.basename(file, '.js');
    return `import ${moduleName} from '${relativePath}';`;
  });

  // Generate export statement
  const exportNames = files.map((file) => path.basename(file, '.js')).join(', ');
  const exportStatement = `export { ${exportNames} };`;

  // Final content
  const content = `// Auto-generated index.js\n${imports.join('\n')}\n\n${exportStatement}\n`;

  // Write to index.js at the root
  fs.writeFileSync(outputFile, content, 'utf8');
  console.log('✅ index.js generated successfully at the root.');
};

// Run the script
generateIndex();
