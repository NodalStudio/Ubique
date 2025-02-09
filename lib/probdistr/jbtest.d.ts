import { array } from '../types';

/**
 * @function jbtest
 * @summary Performs the Jarque-Bera test for normality.
 * @description Tests the null hypothesis that the input data follows a normal distribution with an unknown mean and variance.
 * The test statistic combines skewness and excess kurtosis.
 *
 * @param x The dataset (array of values).
 * @returns The Jarque-Bera test statistic.
 * @throws If the input is not an array or is empty.
 *
 * @example
 * // Example 1: Compute the Jarque-Bera test statistic for normality
 * assert.strictEqual(jbtest([0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039]), 0.6360604293924916);
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
export function jbtest(x: array): number;
