// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import linspace from "../../lib/matarrs/linspace.js";

// Example 1: Generate 5 linearly spaced points between 1 and 10
assert.deepStrictEqual(linspace(1, 10, 5), [1, 3.25, 5.5, 7.75, 10]);

// Example 2: Generate 3 linearly spaced points between -10 and 10
assert.deepStrictEqual(linspace(-10, 10, 3), [-10, 0, 10]);

// Example 3: Generate 2 linearly spaced points between -5 and 5
assert.deepStrictEqual(linspace(-5, 5, 2), [-5, 5]);

// Example 4: Generate a single point (n = 1), should return only the upper bound
assert.deepStrictEqual(linspace(2, 5, 1), [5]);

// Example 5: Generate 10 linearly spaced points between 0 and 1
assert.deepStrictEqual(
  linspace(0, 1),
  [
    0,
    0.1111111111111111,
    0.2222222222222222,
    0.3333333333333333,
    0.4444444444444444,
    0.5555555555555556,
    0.6666666666666666,
    0.7777777777777777,
    0.8888888888888888,
    1,
  ],
);

// Example 6: Throw an error when fewer than 2 arguments are provided
// @ts-expect-error TS(2554): Expected 2-3 arguments, but got 1.
assert.throws(() => linspace(1), {
  name: "Error",
  message: "Not enough input arguments",
});
