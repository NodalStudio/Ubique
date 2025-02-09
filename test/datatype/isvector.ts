// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import isvector from "../../lib/datatype/isvector.js";

// Example 1: A row vector
assert.strictEqual(isvector([[5, 6, 7]]), true);

// Example 2: A column vector
assert.strictEqual(isvector([[5], [6], [7]]), true);

// Example 3: A matrix with more than one row and column
assert.strictEqual(isvector([[1, 2], [3, 4]]), false);

// Example 4: Not a matrix (invalid input)
assert.strictEqual(isvector(123), false);

// Example 5: Empty matrix
assert.strictEqual(isvector([]), false);
