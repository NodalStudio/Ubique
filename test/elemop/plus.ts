// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import plus from "../../lib/elemop/plus.js";

// Example 1: Add two numbers
assert.strictEqual(plus(5, 6), 11);

// Example 2: Add two arrays element-wise
assert.deepStrictEqual(plus([5, 6, 4], [3, -1, 0]), [8, 5, 4]);

// Example 3: Add a number to each element of an array
assert.deepStrictEqual(plus([5, 6, 4], 10), [15, 16, 14]);

// Example 4: Add two matrices element-wise
const a = [[5, 6, 5], [7, 8, -1]];
const b = [[-1, 3, -1], [4, 5, 9]];
assert.deepStrictEqual(plus(a, b), [[4, 9, 4], [11, 13, 8]]);

// Example 5: Add a number to each element of a matrix
assert.deepStrictEqual(plus([[1, 2], [3, 4]], 2), [[3, 4], [5, 6]]);
