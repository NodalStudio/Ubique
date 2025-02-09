// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import sign from "../../lib/elmath/sign.js";

// Example 1: Sign of a single number
assert.strictEqual(sign(-0.5), -1);

// Example 2: Sign of an array of numbers
assert.deepStrictEqual(sign([0.1, -0.5]), [1, -1]);

// Example 3: Sign of a matrix of numbers
assert.deepStrictEqual(sign([[5, -2], [-3, 4]]), [[1, -1], [-1, 1]]);
