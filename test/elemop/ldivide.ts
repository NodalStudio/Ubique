// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import ldivide from "../../lib/elemop/ldivide.js";

// Example 1: Single number division
assert.strictEqual(ldivide(5, 10), 2);

// Example 2: Scalar divided by array
assert.deepStrictEqual(ldivide([1, 2, 3], 6), [6, 3, 2]);

// Example 3: Scalar divided by array with negative numbers
assert.deepStrictEqual(ldivide(2, [-12, -8, -4]), [-6, -4, -2]);

// Example 4: Element-wise division of two arrays
assert.deepStrictEqual(ldivide([5, 10, 3], [10, 20, 30]), [2, 2, 10]);

// Example 5: Element-wise division of two matrices
assert.deepStrictEqual(ldivide([[5, 5], [6, 1]], [[10, 2], [6, 2]]), [
  [2, 0.4],
  [1, 2],
]);

// Example 6: Scalar divided by matrix
assert.deepStrictEqual(ldivide([[3, 5], [6, 1]], 3), [[1, 0.6], [0.5, 3]]);
