import erf from "../elmath/erf.ts";

/**
 * @function normcdf
 * @summary Computes the cumulative distribution function (CDF) of a normal distribution.
 * @description Calculates the probability that a normally distributed random variable with mean `mu` and standard deviation `sigma` is less than or equal to `x`.
 * If `mu` and `sigma` are not provided, it defaults to the standard normal distribution (mu = 0, sigma = 1).
 *
 * @param {number} x The value at which to evaluate the CDF.
 * @param {number} [mu=0] The mean of the normal distribution.
 * @param {number} [sigma=1] The standard deviation of the normal distribution.
 * @returns {number} The cumulative probability for `x`.
 * @throws {Error} If `sigma` is not a positive number.
 *
 * @example
 * import normcdf from './normcdf.ts';
 *
 * // Example 1: Compute standard normal CDF at x = 2
 * assert.strictEqual(normcdf(2), 0.97725);
 *
 * // Example 2: Compute normal CDF with custom mean and standard deviation
 * assert.strictEqual(normcdf(0, 1, 2), 0.30854);
 *
 * // Example 3: Compute normal CDF at the mean (should be close to 0.5)
 * assert.strictEqual(normcdf(10, 10, 3), 0.5);
 *
 * // Example 4: Compute normal CDF for negative values
 * assert.strictEqual(normcdf(-1.5, 0, 1), 0.06681);
 *
 * // Example 5: Compute normal CDF for a very large value (should be close to 1)
 * assert.strictEqual(normcdf(100, 50, 10), 1);
 */
export default function normcdf(x: any, mu = 0, sigma = 1) {
  if (sigma <= 0) {
    throw new Error("Standard deviation must be a positive number");
  }

  const z = (x - mu) / (sigma * Math.sqrt(2));

  return 0.5 * (1 + erf(z));
}
