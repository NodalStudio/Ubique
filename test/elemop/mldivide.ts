// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import mldivide from "../../lib/elemop/mldivide.js";

// Example 1: Divide two numbers
assert.strictEqual(mldivide(5, 6), 1.2);

// Example 2: Left matrix division of two square matrices
assert.deepStrictEqual(mldivide([[9, 5], [6, 1]], [[3, 2], [5, 2]]), [[
  1.0476190476190477,
  0.380952380952381,
], [-1.285714285714286, -0.2857142857142857]]);

// Example 3: Scalar division applied to a matrix
assert.deepStrictEqual(mldivide(5, [[9, 5], [6, 1]]), [[1.8, 1], [1.2, 0.2]]);

// Example 4: Left matrix division of a square matrix by a non-square matrix
assert.deepStrictEqual(mldivide([[9, 5], [6, 1]], [[5, 6, 5], [7, 8, -1]]), [[
  1.4285714285714288,
  1.6190476190476193,
  -0.4761904761904764,
], [-1.5714285714285712, -1.7142857142857144, 1.8571428571428574]]);
