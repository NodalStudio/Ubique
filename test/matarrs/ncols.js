import assert from 'assert';
import ncols from '../../lib/matarrs/ncols.js';

// Example 1: Row vector
assert.strictEqual(ncols([5, 6, 7]), 3);

// Example 2: Matrix with multiple rows
assert.strictEqual(ncols([[3, 2, 7], [4, 5, 6]]), 3);

// Example 3: Single element array
assert.strictEqual(ncols([5]), 1);

// Example 4: Single element matrix (1x1)
assert.strictEqual(ncols([[5]]), 1);

// Example 5: Empty array (treated as 1D)
assert.strictEqual(ncols([]), 0);

// Example 6: Empty matrix (array of empty arrays)
assert.strictEqual(ncols([[]]), 0);

// Example 7: Non-array input (should throw an error)
assert.throws(() => { ncols(5) }, Error);

// Example 8: 2D matrix with a single row
assert.strictEqual(ncols([[1, 2, 3, 4]]), 4);

// Example 9: 2D matrix with varying row lengths (should throw an error)
assert.throws(() => { ncols([[1, 2], [3, 4, 5]]) }, Error);

// Example 10: Multi-dimensional array (should be treated as a 2D matrix)
assert.strictEqual(ncols([[1, 2], [3, 4]]), 2);
