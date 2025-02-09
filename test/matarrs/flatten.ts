// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import flatten from "../../lib/matarrs/flatten.js";

// Example 1: Flatten a 2x2 matrix (row-wise by default)
assert.deepStrictEqual(flatten([[5, 6], [7, 8]]), [5, 6, 7, 8]);

// Example 2: Flatten a 3x3 matrix by rows
assert.deepStrictEqual(flatten([[1, 1, -1], [1, -2, 3], [2, 3, 1]]), [
  1,
  1,
  -1,
  1,
  -2,
  3,
  2,
  3,
  1,
]);

// Example 3: Flatten a 3x3 matrix by columns (dim = 1)
assert.deepStrictEqual(flatten([[1, 1, -1], [1, -2, 3], [2, 3, 1]], 1), [
  1,
  1,
  2,
  1,
  -2,
  3,
  -1,
  3,
  1,
]);
