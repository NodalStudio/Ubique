// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import cumprod from "../../lib/elemop/cumprod.js";

// Example 1: Cumulative product of a 1D array
assert.deepStrictEqual(cumprod([5, 6, 3]), [5, 30, 90]);

// Example 2: Cumulative product of a matrix along columns (dim=1)
assert.deepStrictEqual(cumprod([[5, 6, 5], [7, 8, -1]]), [[5, 6, 5], [
  35,
  48,
  -5,
]]);

// Example 3: Cumulative product of a matrix along rows (dim=0)
assert.deepStrictEqual(cumprod([[5, 6, 5], [7, 8, -1]], 0), [[5, 30, 150], [
  7,
  56,
  -56,
]]);
