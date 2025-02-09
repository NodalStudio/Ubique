// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import ndims from "../../lib/matarrs/ndims.js";

// Example 1: 1D array
assert.strictEqual(ndims([3, 5, 6]), 2);

// Example 2: 2D array
assert.strictEqual(ndims([[3, 2, 7], [4, 5, 6]]), 2);
