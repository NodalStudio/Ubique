import assert from 'assert';
import sum from '../../lib/elemop/sum.js';

// Example 1: Sum of elements in a 1D array
assert.strictEqual(sum([5, 6, 3]), 14);

// Example 2: Sum of elements across rows in a 2D array
assert.deepStrictEqual(sum([[5, 6, 5], [7, 8, -1]], 0), [[16], [14]]);

// Example 3: Sum of elements across columns in a 2D array
assert.deepStrictEqual(sum([[5, 6, 5], [7, 8, -1]], 1), [[12, 14, 4]]);
