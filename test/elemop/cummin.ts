// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import cummax from "../../lib/elemop/cummax.js";

// Example 1: Cumulative maximum of a 1D array
assert.deepStrictEqual(cummax([5, 6, 3]), [5, 6, 6]);

// Example 2: Cumulative maximum of a matrix along columns (dim=1)
assert.deepStrictEqual(cummax([[5, 6, 5], [7, 8, -1]]), [[5, 6, 5], [7, 8, 5]]);

// Example 3: Cumulative maximum of a matrix along rows (dim=0)
assert.deepStrictEqual(cummax([[5, 6, 5], [7, 8, -1]], 0), [[5, 6, 6], [
  7,
  8,
  8,
]]);
