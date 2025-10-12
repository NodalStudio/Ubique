import type { array } from "../types.d.ts";
import { kurtosis, skewness } from "../../index.ts";

/**
 * Performs the Jarque-Bera test for normality.
 *
 * Tests the null hypothesis that the input data follows a normal distribution with an unknown mean and variance.
 * The test statistic combines skewness and excess kurtosis.
 *
 * @param x The dataset (array of values).
 * @returns The Jarque-Bera test statistic.
 * @throws If the input is not an array or is empty.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 *
 * // Example 1: Compute the Jarque-Bera test statistic for normality
 * assertEquals(jbtest(x), 0.6360604293924916);
 *
 * // Example 2: Compute JB test statistic for a dataset with more variation
 * assertEquals(jbtest([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), 0.6244872972145701);
 *
 * // Example 3: JB test on a perfectly normal dataset (should be close to 0)
 * assertEquals(jbtest([0, 0, 0, 0, 0]), NaN);
 *
 * // Example 4: Test with a highly skewed dataset
 * assertEquals(jbtest([1, 1, 1, 1, 100]), 1.888020833333333);
 * ```
 */
export default function jbtest(x: array): number {
  if (!Array.isArray(x) || x.length === 0) {
    throw new Error("Input must be a non-empty array");
  }

  const n = x.length;
  const s = skewness(x) as number;
  const k = kurtosis(x) as number;

  return (n / 6) * (s ** 2 + ((k - 3) ** 2) / 4);
}
