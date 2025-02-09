// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import iscolumn from "../../lib/matarrs/iscolumn.js";

/**
 * Tests for iscolumn function
 */

// Example 1: Valid column vector
assert.strictEqual(iscolumn([[2], [2]]), true);

// Example 2: Row vector (not a column vector)
assert.strictEqual(iscolumn([[2, 2]]), false);

// Example 3: Column vector with multiple rows
assert.strictEqual(iscolumn([[1], [2], [3]]), true);

// Example 4: Square matrix (not a column vector)
assert.strictEqual(iscolumn([[1, 2], [3, 4]]), false);

// Example 5: Single-element column vector
assert.strictEqual(iscolumn([[1]]), true);

// Example 6: Invalid input (not a matrix)
assert.throws(() => iscolumn(5), /Input must be a non-empty matrix/);

// Example 7: Empty matrix (should throw an error)
assert.throws(() => iscolumn([]), /Input must be a non-empty matrix/);
