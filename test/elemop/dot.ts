// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import dot from "../../lib/elemop/dot.js";

// Example 1: Dot product of two 1D arrays
assert.strictEqual(dot([5, 6, 3], [0, -3, 2]), -12);

// Example 2: Dot product of two arrays with negative numbers
assert.strictEqual(dot([-1, -2, -3], [-4, -5, -6]), 32);

// Example 3: Dot product of two identical arrays
assert.strictEqual(dot([1, 2, 3], [1, 2, 3]), 14);

// Example 4: Dot product of two arrays with zero values
assert.strictEqual(dot([0, 0, 0], [0, 0, 0]), 0);

// Example 5: Error when input arrays are of different sizes
assert.throws(() => dot([1, 2], [1, 2, 3]), Error, "input size mismatch");

// Example 6: Dot product of two empty arrays (should return 0)
assert.strictEqual(dot([], []), 0);

// Example 7: Dot product of arrays with floating-point numbers
assert.strictEqual(dot([1.5, 2.5, 3.5], [4.5, 5.5, 6.5]), 43.25);

// Example 8: Dot product of arrays with a mix of positive and negative numbers
assert.strictEqual(dot([2, -3, 4], [-1, 5, -6]), -41);

// Example 9: Dot product of single-element arrays
assert.strictEqual(dot([7], [8]), 56);

// Example 10: Dot product of larger arrays
assert.strictEqual(dot([1, 2, 3, 4], [4, 3, 2, 1]), 20);
