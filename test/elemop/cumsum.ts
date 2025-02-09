// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import cumsum from "../../lib/elemop/cumsum.js";

// Example 1: Cumulative sum of a 1D array
assert.deepStrictEqual(cumsum([5, 6, 3]), [5, 11, 14]);

// Example 2: Cumulative sum of a matrix along columns (dim=1)
assert.deepStrictEqual(cumsum([[5, 6, 5], [7, 8, -1]]), [[5, 6, 5], [
  12,
  14,
  4,
]]);

// Example 3: Cumulative sum of a matrix along rows (dim=0)
assert.deepStrictEqual(cumsum([[5, 6, 5], [7, 8, -1]], 0), [[5, 11, 16], [
  7,
  15,
  14,
]]);
