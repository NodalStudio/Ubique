// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import gt from "../../lib/elemop/gt.js";

// Example 1: Comparison between two numbers
assert.strictEqual(gt(5, 5), false);

// Example 2: Comparison between a number and an array
assert.deepStrictEqual(gt(5, [5, 6, 3]), [false, false, true]);

// Example 3: Comparison between a number and a matrix
assert.deepStrictEqual(gt(5, [[5, 6], [3, 5]]), [[false, false], [
  true,
  false,
]]);

// Example 4: Comparison between an array and a number
assert.deepStrictEqual(gt([5, 6, 3], 5), [false, true, false]);

// Example 5: Comparison between a matrix and a number
assert.deepStrictEqual(gt([[5, 6], [3, 5]], 5), [[false, true], [
  false,
  false,
]]);

// Example 6: Comparison between two arrays
assert.deepStrictEqual(gt([5, 6, 3], [2, 6, 0]), [true, false, true]);

// Example 7: Comparison between two matrices
assert.deepStrictEqual(gt([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [
  [false, false],
  [false, false],
]);
