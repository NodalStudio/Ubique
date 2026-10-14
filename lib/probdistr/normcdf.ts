import { erfc } from "../../index.ts";

/**
 * Computes the cumulative distribution function (CDF) of a normal distribution.
 *
 * Calculates the probability that a normally distributed random variable with mean `mu` and standard deviation `sigma` is less than or equal to `x`.
 * If `mu` and `sigma` are not provided, it defaults to the standard normal distribution (mu = 0, sigma = 1).
 *
 * @param x The value at which to evaluate the CDF
 * @param mu The mean of the normal distribution (defaults to 0)
 * @param sigma The standard deviation of the normal distribution (defaults to 1)
 * @returns The cumulative probability for x
 * @throws If sigma is not a positive number
 *
 * @example Compute standard normal CDF at x = 2
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(normcdf(2), 0.9772498680518208, 4.886249340259104e-13);
 *
 * ```
 *
 * @example Compute normal CDF with custom mean and standard deviation
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(normcdf(0, 1, 2), 0.3085375387259869, 1.5426876936299345e-13);
 *
 * ```
 *
 * @example Compute normal CDF at the mean (should be close to 0.5)
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(normcdf(10, 10, 3), 0.5, 2.5e-13);
 *
 * ```
 *
 * @example Compute normal CDF for negative values
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(normcdf(-1.5, 0, 1), 0.06680720126885807, 3.3403600634429036e-14);
 *
 * ```
 *
 * @example Compute normal CDF for a very large value (should be close to 1)
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(normcdf(100, 50, 10), 0.9999997133484281, 4.99999856674214e-13);
 * ```
 */
export default function normcdf(
  x: number,
  mu: number = 0,
  sigma: number = 1,
): number {
  if (sigma <= 0) {
    throw new Error("Standard deviation must be a positive number");
  }

  const z = (x - mu) / (sigma * Math.sqrt(2));

  return 0.5 * erfc(-z);
}
