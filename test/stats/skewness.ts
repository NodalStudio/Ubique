// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import skewness from "../../lib/stats/skewness.js";

// Example dataset
const x = [
  0.003,
  0.026,
  0.015,
  -0.009,
  0.014,
  0.024,
  0.015,
  0.066,
  -0.014,
  0.039,
];
const y = [
  -0.005,
  0.081,
  0.04,
  -0.037,
  -0.061,
  0.058,
  -0.049,
  -0.021,
  0.062,
  0.058,
];

// Example 1: Compute skewness of an array
assert.strictEqual(skewness(x), 0.617481);

// Example 2: Compute skewness with bias correction
assert.strictEqual(skewness(x, 0), 0.64892);

// Example 3: Compute skewness for a matrix along rows
assert.deepStrictEqual(skewness([[...x], [...y]]), [[0.617481], [-0.118909]]);

// Example 4: Compute skewness for a matrix along columns
assert.deepStrictEqual(skewness([[0.003, 0.026], [0.015, -0.009]], 1, 1), [[
  1.223,
], [-1.223]]);

// Example 5: Compute skewness for a dataset with equal elements (should be NaN)
assert.strictEqual(skewness([1, 1, 1, 1, 1]), NaN);
