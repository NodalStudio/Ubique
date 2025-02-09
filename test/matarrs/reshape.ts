import assert from 'assert';
import reshape from '../../lib/matarrs/reshape.js';

// Example 1: Reshape a row vector into a column vector
assert.deepStrictEqual(reshape([5, 6, 3], 3, 1), [[5], [6], [3]]);

// Example 2: Reshape a column vector into a row vector
assert.deepStrictEqual(reshape([5, 6, 3], 1, 3), [[5, 6, 3]]);

// Example 3: Reshape a 2x3 matrix into a 3x2 matrix (row-wise)
assert.deepStrictEqual(reshape([[-1, 3, -1], [4, 5, 9]], 3, 2), [[-1, 3], [-1, 4], [5, 9]]);

// Example 4: Reshape a 2x3 matrix into a 3x2 matrix (column-wise)
assert.deepStrictEqual(reshape([[-1, 3, -1], [4, 5, 9]], 3, 2, 1), [[-1, 4], [3, 5], [-1, 9]]);

// Example 5: Reshape into a single-column matrix
assert.deepStrictEqual(reshape([[-1, 3, -1], [4, 5, 9]], 6, 1), [[-1], [3], [-1], [4], [5], [9]]);

// Example 6: Reshape into a single-column matrix (column-wise)
assert.deepStrictEqual(reshape([[-1, 3, -1], [4, 5, 9]], 6, 1, 1), [[-1], [4], [3], [5], [-1], [9]]);
