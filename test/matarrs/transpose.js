import assert from 'assert';
import transpose from '../../lib/matarrs/transpose.js';

// Example 1: Transpose a 2x3 matrix
assert.deepStrictEqual(transpose([[5, 6, 5], [7, 8, -1]]), [[5, 7], [6, 8], [5, -1]]);

// Example 2: Transpose a 1D array (row vector)
assert.deepStrictEqual(transpose([5, 6, 3]), [[5], [6], [3]]);

// Example 3: Transpose a single number (scalar)
assert.strictEqual(transpose(5), 5);

// Example 4: Transpose a square matrix
assert.deepStrictEqual(transpose([[1, 2], [3, 4]]), [[1, 3], [2, 4]]);
