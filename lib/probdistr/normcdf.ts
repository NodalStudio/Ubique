import { erf } from "../../index.ts";

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
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Compute standard normal CDF at x = 2
 * assertEquals(normcdf(2), 0.9772498701098755);
 *
 * // Example 2: Compute normal CDF with custom mean and standard deviation
 * assertEquals(normcdf(0, 1, 2), 0.30853751691860176);
 *
 * // Example 3: Compute normal CDF at the mean (should be close to 0.5)
 * assertEquals(normcdf(10, 10, 3), 0.5);
 *
 * // Example 4: Compute normal CDF for negative values
 * assertEquals(normcdf(-1.5, 0, 1), 0.06680720195906442);
 *
 * // Example 5: Compute normal CDF for a very large value (should be close to 1)
 * assertEquals(normcdf(100, 50, 10), 0.9999997133484314);
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

  return 0.5 * (1 + erf(z));
}
