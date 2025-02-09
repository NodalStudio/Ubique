// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import mtimes from "../../lib/elemop/mtimes.js";

// Example 1: Multiply two numbers
assert.strictEqual(mtimes(5, 6), 30);

// Example 2: Multiply an array by a scalar
assert.deepStrictEqual(mtimes([5, 6, 3], 3), [15, 18, 9]);

// Example 3: Multiply a matrix by a scalar
assert.deepStrictEqual(mtimes([[5, 6, 5], [7, 8, -1]], 3), [[15, 18, 15], [
  21,
  24,
  -3,
]]);

// Example 4: Multiply a 1x3 matrix by a 3x1 matrix
assert.deepStrictEqual(mtimes([[5, 6, 3]], [[3], [4], [5]]), [[54]]);

// Example 5: Multiply a 2x3 matrix by a 3x1 matrix
assert.deepStrictEqual(mtimes([[5, 6, 5], [7, 8, -1]], [[5], [6], [3]]), [
  [76],
  [80],
]);
