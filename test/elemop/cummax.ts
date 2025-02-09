// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import cummin from "../../lib/elemop/cummin.js";

// Example 1: Cumulative minimum of a 1D array
assert.deepStrictEqual(cummin([5, 6, 3]), [5, 5, 3]);

// Example 2: Cumulative minimum of a matrix along columns (dim=1)
assert.deepStrictEqual(cummin([[5, 6, 5], [7, 8, -1]]), [[5, 6, 5], [
  5,
  6,
  -1,
]]);

// Example 3: Cumulative minimum of a matrix along rows (dim=0)
assert.deepStrictEqual(cummin([[5, 6, 5], [7, 8, -1]], 0), [[5, 5, 5], [
  7,
  7,
  -1,
]]);
