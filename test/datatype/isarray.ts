// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import isarray from "../../lib/datatype/isarray.js";

// Example 1: A valid 1D array of numbers
assert.strictEqual(isarray([1.4, 2.3, 3]), true);

// Example 2: An array with mixed types
assert.strictEqual(isarray([1, "a", {}]), true);

// Example 3: An empty array
assert.strictEqual(isarray([]), true);

// Example 4: Not an array (single number)
assert.strictEqual(isarray(123), false);

// Example 5: A 2D array (array of arrays)
assert.strictEqual(isarray([[1], [2], [3]]), false);
