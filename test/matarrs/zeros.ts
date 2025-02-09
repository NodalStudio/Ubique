// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import zeros from "../../lib/matarrs/zeros.js";

// Example 1: Create a 1x1 matrix of zeros (default behavior)
// @ts-expect-error TS(2554): Expected 2 arguments, but got 0.
assert.deepStrictEqual(zeros(), [[0]]);

// Example 2: Create a 2x2 square matrix of zeros
// @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
assert.deepStrictEqual(zeros(2), [[0, 0], [0, 0]]);

// Example 3: Create a 2x3 matrix of zeros
assert.deepStrictEqual(zeros(2, 3), [[0, 0, 0], [0, 0, 0]]);

// Example 4: Create a 2x1 matrix of zeros using array input
// @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
assert.deepStrictEqual(zeros([2, 1]), [[0], [0]]);
