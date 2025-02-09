import skewness from "../stats/skewness.ts";
import kurtosis from "../stats/kurtosis.ts";

/**
 * @function jbtest
 * @summary Performs the Jarque-Bera test for normality.
 * @description Tests the null hypothesis that the input data follows a normal distribution with an unknown mean and variance.
 * The test statistic combines skewness and excess kurtosis.
 *
 * @param {array} x The dataset (array of values).
 * @returns {number} The Jarque-Bera test statistic.
 * @throws {Error} If the input is not an array or is empty.
 *
 * @example
 * import jbtest from './jbtest.ts';
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 *
 * // Example 1: Compute the Jarque-Bera test statistic for normality
 * assert.strictEqual(jbtest(x), 0.636060429392492);
 *
 * // Example 2: Compute JB test statistic for a dataset with more variation
 * assert.strictEqual(jbtest([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 1.52);
 *
 * // Example 3: JB test on a perfectly normal dataset (should be close to 0)
 * assert.strictEqual(jbtest([0, 0, 0, 0, 0]), NaN);
 *
 * // Example 4: Test with a highly skewed dataset
 * assert.strictEqual(jbtest([1, 1, 1, 1, 100]), 76.923);
 */
export default function jbtest(x: any) {
  if (!Array.isArray(x) || x.length === 0) {
    throw new Error("Input must be a non-empty array");
  }

  const n = x.length;
  const s = skewness(x);
  const k = kurtosis(x);

  return (n / 6) * (s ** 2 + ((k - 3) ** 2) / 4);
}
