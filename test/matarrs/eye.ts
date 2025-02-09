// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import eye from "../../lib/matarrs/eye.js";

// Example 1: Create a 0x0 matrix (empty matrix)
// @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
assert.deepStrictEqual(eye(0), []);

// Example 2: Create a 1x1 identity matrix
// @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
assert.deepStrictEqual(eye(1), [[1]]);

// Example 3: Create a 2x2 identity matrix
// @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
assert.deepStrictEqual(eye(2), [[1, 0], [0, 1]]);

// Example 4: Create a 2x1 identity matrix
// @ts-expect-error TS(2554): Expected 2 arguments, but got 1.
assert.deepStrictEqual(eye([2, 1]), [[1], [0]]);

// Example 5: Create a 2x3 identity matrix
assert.deepStrictEqual(eye(2, 3), [[1, 0, 0], [0, 1, 0]]);
