// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import isundefined from "../../lib/datatype/isundefined.js";

// Example 1: Input is undefined
assert.strictEqual(isundefined(undefined), true);

// Example 2: Input is defined (null)
assert.strictEqual(isundefined(null), false);

// Example 3: Input is defined (string)
assert.strictEqual(isundefined("test"), false);

// Example 4: No input provided
try {
  // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
  isundefined();
} catch (error) {
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  assert.strictEqual(error.message, "not enough input arguments");
}
