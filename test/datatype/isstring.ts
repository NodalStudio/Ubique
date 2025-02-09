// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import isstring from "../../lib/datatype/isstring.js";

// Example 1: Input is a string
assert.strictEqual(isstring("test"), true);

// Example 2: Input is a number
assert.strictEqual(isstring(123), false);

// Example 3: Input is an object
assert.strictEqual(isstring({ key: "value" }), false);

// Example 4: No input provided
try {
  // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
  isstring();
} catch (error) {
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  assert.strictEqual(error.message, "not enough input arguments");
}
