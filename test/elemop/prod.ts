// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import prod from "../../lib/elemop/prod.js";

// Example 1: Product of a vector
assert.strictEqual(prod([5, 6, 3]), 90);

// Example 2: Product of matrix elements along rows
assert.deepStrictEqual(prod([[5, 6, 5], [7, 8, -1]], 0), [150, -56]);

// Example 3: Product of matrix elements along columns
assert.deepStrictEqual(prod([[5, 6, 5], [7, 8, -1]], 1), [35, 48, -5]);
