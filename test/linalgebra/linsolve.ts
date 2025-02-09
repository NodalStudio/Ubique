// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import linsolve from "../../lib/linalgebra/linsolve.js";
import eye from "../../lib/matarrs/eye.js";

// Example 1: Solve linear system with a vector
assert.deepStrictEqual(
  linsolve([[1, 1, -1], [1, -2, 3], [2, 3, 1]], [5, 6, 3]),
  [5.846153846153846, -2.3846153846153846, -1.5384615384615385],
);

// Example 2: Solve linear system with a matrix
assert.deepStrictEqual(
  linsolve([[1, 1, -1], [1, -2, 3], [2, 3, 1]], [[4], [-6], [7]]),
  [1, 2, -0.9999999999999999],
);

// Example 3: Solve linear system with identity matrix
// @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
assert.deepStrictEqual(linsolve([[1, 1, -1], [1, -2, 3], [2, 3, 1]], eye(3)), [
  [0.846153846153846, 0.3076923076923077, -0.07692307692307707],
  [-0.3846153846153846, -0.23076923076923078, 0.30769230769230776],
  [-0.5384615384615384, 0.07692307692307691, 0.23076923076923078],
]);

// Example 4: Throw error for mismatched dimensions
assert.throws(
  () => linsolve([[1, 1, -1], [1, -2, 3]], [5, 6, 3]),
  Error,
  "matrix dimensions must agree",
);

// Example 5: Throw error for non-square matrix
assert.throws(
  () => linsolve([[1, 1], [1, -2, 3]], [5, 6, 3]),
  Error,
  "matrix must be square",
);

// Example 6: Throw error for singular matrix
assert.throws(
  () => linsolve([[1, 2], [2, 4]], [3, 6]),
  Error,
  "matrix is singular",
);
