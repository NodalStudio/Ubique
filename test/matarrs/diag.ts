import assert from 'assert';
import diag from '../../lib/matarrs/diag.js';

// Example 1: Create a diagonal matrix from a vector
assert.deepStrictEqual(diag([5, 6, -3]), [[5, 0, 0], [0, 6, 0], [0, 0, -3]]);

// Example 2: Create a diagonal matrix with k = 1
assert.deepStrictEqual(diag([5, 6, -3], 1), [[0, 5, 0, 0], [0, 0, 6, 0], [0, 0, 0, -3], [0, 0, 0, 0]]);

// Example 3: Create a diagonal matrix with k = -1
assert.deepStrictEqual(diag([5, 6, -3], -1), [[0, 0, 0, 0], [5, 0, 0, 0], [0, 6, 0, 0], [0, 0, -3, 0]]);

// Example 4: Extract the main diagonal from a matrix
assert.deepStrictEqual(diag([[5, 0, 0], [0, 6, 0], [0, 0, -3]]), [5, 6, -3]);

// Example 5: Extract the first superdiagonal from a matrix
assert.deepStrictEqual(diag([[0, 5, 0, 0], [0, 0, 6, 0], [0, 0, 0, -3], [0, 0, 0, 0]], 1), [5, 6, -3]);

// Example 6: Extract the first subdiagonal from a matrix
assert.deepStrictEqual(diag([[0, 0, 0, 0], [5, 0, 0, 0], [0, 6, 0, 0], [0, 0, -3, 0]], -1), [5, 6, -3]);

// Example 7: Extract a diagonal out of bounds (diagonal 2)
assert.deepStrictEqual(diag([[5, 0, 0], [0, 6, 0], [0, 0, -3]], 2), [0]);
