// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import isnull from "../../lib/datatype/isnull.js";

// Example 1: Input is `null`
assert.strictEqual(isnull(null), true);

// Example 2: Input is `undefined`
assert.strictEqual(isnull(undefined), false);

// Example 3: Input is a number (not `null`)
assert.strictEqual(isnull(0), false);

// Example 4: Input is an empty string (not `null`)
assert.strictEqual(isnull(""), false);
