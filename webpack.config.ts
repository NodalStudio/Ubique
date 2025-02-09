import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './index.js',
  output: {
    filename: 'ubique.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ubique',
    libraryTarget: 'umd',
  },
  mode: 'production',
};
