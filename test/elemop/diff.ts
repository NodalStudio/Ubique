// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import diff from "../../lib/elemop/diff.js";

// Example 1: Differences in a 1D array
assert.deepStrictEqual(diff([5, 6, 3]), [1, -3]);

// Example 2: Differences in a matrix along columns (dim=1)
assert.deepStrictEqual(diff([[5, 6, 5], [7, 8, -1]]), [[2, 2, -6]]);

// Example 3: Differences in a matrix along columns (dim=1)
assert.deepStrictEqual(diff([[5, 6, 5], [7, 8, -1], [1, 2, 3]]), [[2, 2, -6], [
  -6,
  -6,
  4,
]]);

// Example 4: Differences in a matrix along rows (dim=0)
assert.deepStrictEqual(diff([[5, 6, 5], [7, 8, -1]], 0), [[1, -1], [1, -9]]);
