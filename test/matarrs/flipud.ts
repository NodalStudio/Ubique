// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import flipud from "../../lib/matarrs/flipud.js";

// Example 1: Flip a 2D matrix upside down
assert.deepStrictEqual(flipud([[1, 4], [2, 5], [3, 6]]), [[3, 6], [2, 5], [
  1,
  4,
]]);

// Example 2: Flip a single number (should return the number itself)
assert.strictEqual(flipud(5), 5);

// Example 3: Invalid input (should throw an error for non-matrix, non-number input)
assert.throws(
  () => {
    flipud("invalid");
  },
  Error,
  "Unknown input arguments",
);

// Example 4: No input provided (should throw an error)
// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
assert.throws(
  () => {
    flipud();
  },
  Error,
  "Not enough input arguments",
);
