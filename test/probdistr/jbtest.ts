// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import jbtest from "../../lib/probdistr/jbtest.js";

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

// Example 1: Compute the Jarque-Bera test statistic for normality
assert.strictEqual(jbtest(x), 0.6360604293924916);

// Example 2: Compute JB test statistic for a dataset with more variation
assert.strictEqual(jbtest([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 0.6244872972145701);

// Example 3: JB test on a perfectly normal dataset (should be close to 0)
assert.strictEqual(jbtest([0, 0, 0, 0, 0]), NaN);

// Example 4: Test with a highly skewed dataset
assert.strictEqual(jbtest([1, 1, 1, 1, 100]), 1.888020833333333);

// Example 5: Test with negative skewness
assert.strictEqual(
  jbtest([-1, -2, -3, -4, -5, -6, -7, -8, -9, -10]),
  0.6244872972145701,
);
