import assert from 'assert';
import cat from '../../lib/matarrs/cat.js';

// Example 1: Vertical Concatenation (dim = 0) with numbers
assert.deepStrictEqual(cat(0, 1, 2, 3, 4), [[1], [2], [3], [4]]);

// Example 2: Vertical Concatenation (dim = 0) with arrays
assert.deepStrictEqual(cat(0, [5, 6, 3], [0.5, -3, 2.3]), [[5, 6, 3], [0.5, -3, 2.3]]);

// Example 3: Vertical Concatenation (dim = 0) with matrix and array
assert.deepStrictEqual(cat(0, [[5, 6, 5], [7, 8, -1]], [5, 6, 3]), [[5, 6, 5], [7, 8, -1], [5, 6, 3]]);

// Example 4: Horizontal Concatenation (dim = 1) with numbers
assert.deepStrictEqual(cat(1, 1, 2, 3, 4), [[1, 2, 3, 4]]);

// Example 5: Horizontal Concatenation (dim = 1) with arrays
assert.deepStrictEqual(cat(1, [5, 6, 3], [0.5, -3, 2.3]), [[5, 6, 3, 0.5, -3, 2.3]]);

// Example 6: Horizontal Concatenation (dim = 1) with matrix and arrays
assert.deepStrictEqual(cat(1, [[2, 3, 4]], [5, 6, 3], [0.5, -3, 2.3]), [[2, 3, 4, 5, 6, 3, 0.5, -3, 2.3]]);
