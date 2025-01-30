import assert from 'assert';
import { le } from '../../lib/elemop/le.js';

// Example 1: Comparison between two numbers
assert.strictEqual(le(5, 5), true);

// Example 2: Comparison between a number and an array
assert.deepStrictEqual(le(5, [5, 6, 3]), [true, true, false]);

// Example 3: Comparison between a number and a matrix
assert.deepStrictEqual(le(5, [[5, 6], [3, 5]]), [[true, true], [false, true]]);

// Example 4: Comparison between an array and a number
assert.deepStrictEqual(le([5, 6, 3], 5), [true, false, true]);

// Example 5: Comparison between a matrix and a number
assert.deepStrictEqual(le([[5, 6], [3, 5]], 5), [[true, false], [true, true]]);

// Example 6: Comparison between two arrays
assert.deepStrictEqual(le([5, 6, 3], [2, 6, 0]), [false, true, false]);

// Example 7: Comparison between two matrices
assert.deepStrictEqual(le([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[true, true], [true, true]]);
