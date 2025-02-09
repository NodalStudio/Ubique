import assert from 'assert';
import ge from '../../lib/elemop/ge.js';

// Example 1: Comparison between two numbers
assert.strictEqual(ge(5, 5), true);

// Example 2: Comparison between a number and an array
assert.deepStrictEqual(ge(5, [5, 6, 3]), [true, false, true]);

// Example 3: Comparison between a number and a matrix
assert.deepStrictEqual(ge(5, [[5, 6], [3, 5]]), [[true, false], [true, true]]);

// Example 4: Comparison between an array and a number
assert.deepStrictEqual(ge([5, 6, 3], 5), [true, true, false]);

// Example 5: Comparison between a matrix and a number
assert.deepStrictEqual(ge([[5, 6], [3, 5]], 5), [[true, true], [false, true]]);

// Example 6: Comparison between two arrays
assert.deepStrictEqual(ge([5, 6, 3], [2, 6, 0]), [true, true, true]);

// Example 7: Comparison between two matrices
assert.deepStrictEqual(ge([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[true, true], [false, false]]);
