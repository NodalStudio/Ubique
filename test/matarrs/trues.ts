// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import trues from "../../lib/matarrs/trues.js";

// Example 1: Create an empty array
// @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
assert.deepStrictEqual(trues(0), []);

// Example 2: Create a 1x1 matrix of `true`
// @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
assert.deepStrictEqual(trues(1), [[true]]);

// Example 3: Create a 2x2 matrix of `true`
// @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
assert.deepStrictEqual(trues(2), [[true, true], [true, true]]);

// Example 4: Create a 2x1 matrix of `true`
// @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
assert.deepStrictEqual(trues([2, 1]), [[true], [true]]);

// Example 5: Create a 2x3 matrix of `true`
assert.deepStrictEqual(trues(2, 3), [[true, true, true], [true, true, true]]);

// Example 6: Invalid input (no arguments)
// @ts-expect-error TS(2554): Expected 2 arguments, but got 0.
assert.throws(() => trues(), /Invalid dimensions/);
