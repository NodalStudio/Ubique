// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import isinteger from "../../lib/datatype/isinteger.js";

// Example 1: An integer
assert.strictEqual(isinteger(5), true);

// Example 2: A non-integer number
assert.strictEqual(isinteger(5.5), false);

// Example 3: Not a number (string)
assert.strictEqual(isinteger("5"), false);

// Example 4: Not a number (null)
assert.strictEqual(isinteger(null), false);
