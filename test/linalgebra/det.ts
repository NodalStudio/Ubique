// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import det from "../../lib/linalgebra/det.js";

// Example 1: Determinant of a 2x2 matrix
assert.strictEqual(det([[1, 5], [6, 2]]), -28);

// Example 2: Determinant of another 2x2 matrix
assert.strictEqual(det([[2, 2], [2, 3]]), 2);

// Example 3: Determinant of a 3x3 matrix
assert.strictEqual(det([[1, 2, 3], [0, 4, 5], [1, 0, 6]]), 22);

// Example 4: Determinant of a 3x3 matrix with zeros
assert.strictEqual(det([[0, 2, 3], [0, 4, 5], [1, 0, 6]]), -2);

// Example 5: Determinant of an identity matrix
assert.strictEqual(det([[1, 0], [0, 1]]), 1);

// Example 6: Determinant of a 4x4 matrix (should be 0 due to linear dependence)
assert.strictEqual(
  det([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]),
  6.212279628615467e-30,
);

// Example 7: Determinant of a larger matrix
assert.strictEqual(det([[4, 8, 2], [4, 6, 8], [4, 2, 8]]), 96);

// Example 8: Determinant of a matrix with fractional values
assert.strictEqual(det([[-40.54, 34.02], [91.81, 57.47]]), -5453.21);
