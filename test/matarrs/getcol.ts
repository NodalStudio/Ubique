// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import getcol from "../../lib/matarrs/getcol.js";

// Example 1: Get the first column
assert.deepStrictEqual(getcol([[5, 6, 5], [7, 8, -1]], 0), [5, 7]); // [ 5, 7 ]

// Example 2: Get the third column
assert.deepStrictEqual(getcol([[5, 6, 5], [7, 8, -1]], 2), [5, -1]); // [ 5, -1 ]

// Example 3: Invalid column index (out of bounds)
assert.throws(
  () => {
    getcol([[5, 6, 5], [7, 8, -1]], 3);
  },
  Error,
  "Column index must be an integer between 0 and N - 1 columns",
);

// Example 4: Invalid input (not a matrix)
assert.throws(
  () => {
    getcol([5, 6, 7], 1);
  },
  Error,
  "Input must be a matrix (2D array)",
);
