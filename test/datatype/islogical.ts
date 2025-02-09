// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import islogical from "../../lib/datatype/islogical.js";

// Example 1: Boolean true
assert.strictEqual(islogical(true), true);

// Example 2: Boolean false
assert.strictEqual(islogical(false), true);

// Example 3: Not a boolean (number)
assert.strictEqual(islogical(1), false);

// Example 4: Not a boolean (string)
assert.strictEqual(islogical("true"), false);
