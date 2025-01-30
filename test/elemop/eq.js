import assert from 'assert';
import { eq } from '../../lib/elemop/eq.js';
// /root/ubique/lib/elemop/eq.js

// Example 1: Equality comparison between two numbers
assert.strictEqual(eq(5, 5), true);

// Example 2: Equality comparison between a number and an array
assert.deepStrictEqual(eq(5, [5, 6, 3]), [true, false, false]);

// Example 3: Equality comparison between a number and a matrix
assert.deepStrictEqual(eq(5, [[5, 6], [3, 5]]), [[true, false], [false, true]]);

// Example 4: Equality comparison between an array and a number
assert.deepStrictEqual(eq([5, 6, 3], 5), [true, false, false]);

// Example 5: Equality comparison between a matrix and a number
assert.deepStrictEqual(eq([[5, 6], [3, 5]], 5), [[true, false], [false, true]]);

// Example 6: Equality comparison between two arrays
assert.deepStrictEqual(eq([5, 6, 3], [2, 6, 0]), [false, true, false]);

// Example 7: Equality comparison between two matrices
assert.deepStrictEqual(eq([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[true, true], [false, false]]);
