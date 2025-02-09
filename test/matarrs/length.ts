// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import length from "../../lib/matarrs/length.js";

/**
 * Tests for length function
 */

// Example 1: Length of a 1D array (vector)
assert.strictEqual(length([3, 5, 6]), 3);

// Example 2: Length of a single element (should be 1)
assert.strictEqual(length(5), 1);

// Example 3: Length of a 2D array (matrix)
assert.strictEqual(length([[5, 4], [-1, 2]]), 2);

// Example 4: Empty array (should be 0)
assert.strictEqual(length([]), 0);

// Example 5: Invalid input (should throw an error)
// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
assert.throws(() => length(), /Not enough input arguments/);
