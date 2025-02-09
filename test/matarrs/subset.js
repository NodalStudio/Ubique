import assert from 'assert';
import subset from '../../lib/matarrs/subset.js';

// Example 1: Extract a single element from an array
const c = [5, 6, 3];
assert.strictEqual(subset(c, 1), 6);

// Example 2: Extract multiple elements from an array
assert.deepStrictEqual(subset(c, [1, 2]), [6, 3]);

// Example 3: Extract the last element from an array
assert.strictEqual(subset(c, c.length - 1), 3);

// Example 4: Extract a single element from a matrix
const a = [[5, 6, 5], [7, 8, -1]];
assert.deepStrictEqual(subset(a, 0, 1), [[6]]);

// Example 5: Extract a submatrix
assert.deepStrictEqual(subset(a, [0, 1], [1, 2]), [[6, 5], [8, -1]]);

// Example 6: Extract an entire row
assert.deepStrictEqual(subset(a, 0, ':'), [[5, 6, 5]]);

// Example 7: Extract an entire column
assert.deepStrictEqual(subset(a, ':', 0), [[5], [7]]);
