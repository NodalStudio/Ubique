// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import strfind from "../../lib/datatype/strfind.js";

// Example 1: Basic usage with multiple occurrences
assert.deepStrictEqual(strfind("find indices in the string", "in"), [
  1,
  5,
  13,
  23,
]);

// Example 2: Pattern appears only once
assert.deepStrictEqual(strfind("hello world", "world"), [6]);

// Example 3: Pattern does not appear
assert.deepStrictEqual(strfind("hello world", "notfound"), []);

// Example 4: Pattern is longer than the string
assert.strictEqual(strfind("short", "longpattern"), null);

// Example 5: Invalid input (non-string arguments)
try {
  strfind(123, "12");
} catch (e) {
  // @ts-expect-error TS(2571): Object is of type 'unknown'.
  assert.strictEqual(e.message, "Both arguments must be strings");
}
