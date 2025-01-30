import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const CONFIG = {
  directories: ['lib'],
  ignoreFiles: ['index.js', '.test.js', '.spec.js'],
  extensions: ['.js'],
};

async function fileExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

async function findJsFiles(dir) {
  const files = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        files.push(...await findJsFiles(fullPath));
      } else if (
        CONFIG.extensions.includes(path.extname(entry.name)) &&
        !CONFIG.ignoreFiles.some(ignore => entry.name.includes(ignore))
      ) {
        const name = path.basename(entry.name, '.js');
        files.push({
          name,
          fullPath,
          relativePath: './' + path.basename(entry.name)
        });
      }
    }
  } catch (error) {
    console.warn(`Warning: Could not process directory ${dir}:`, error.message);
  }

  return files;
}

async function generateIndexForDir(dir) {
  const files = await findJsFiles(dir);

  if (files.length === 0) {
    return;
  }

  files.sort((a, b) => a.name.localeCompare(b.name));

  const indexContent = [
    '/**',
    ' * @fileoverview Index file for ' + path.relative(projectRoot, dir),
    ' * @generated This file is auto-generated. Do not edit directly.',
    ' */',
    '',
    ...files.map(file => `export { ${file.name} } from '${file.relativePath}';`),
  ].join('\n');

  const indexPath = path.join(dir, 'index.js');
  await fs.writeFile(indexPath, indexContent);
  console.log(`✓ Generated ${path.relative(projectRoot, indexPath)}`);

  return files;
}

async function generateRootIndex() {
  const allExports = [];

  for (const dir of CONFIG.directories) {
    const dirPath = path.join(projectRoot, dir);
    if (await fileExists(dirPath)) {
      const files = await generateIndexForDir(dirPath);
      if (files) {
        allExports.push({
          dirName: dir,
          files: files.map(f => ({
            name: f.name,
            path: `@/${dir}/${path.basename(f.relativePath)}`
          }))
        });
      }
    }
  }

  const rootIndexContent = [
    '/**',
    ' * @fileoverview Root index file',
    ' * @generated This file is auto-generated. Do not edit directly.',
    ' */',
    '',
    ...allExports.flatMap(({dirName, files}) => [
      `// ${dirName}`,
      ...files.map(f => `export { ${f.name} } from '${f.path}';`),
      ''
    ])
  ].join('\n');

  await fs.writeFile(path.join(projectRoot, 'index.js'), rootIndexContent);
  console.log('✓ Generated root index.js');
}

console.log('Generating index files...');
generateRootIndex()
  .then(() => console.log('Done!'))
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
