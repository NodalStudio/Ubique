// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import isfunction from "../../lib/datatype/isfunction.js";

// Test case 1: Inline function
assert.strictEqual(
  isfunction(function (a: any) {
    return console.log(a);
  }),
  true,
  "Inline function should return true",
);

// Test case 2: Built-in function
assert.strictEqual(
  isfunction(Math.log),
  true,
  "Built-in function should return true",
);

// Test case 3: Not a function (number)
assert.strictEqual(isfunction(42), false, "Number should return false");

// Test case 4: Not a function (string)
assert.strictEqual(isfunction("hello"), false, "String should return false");
