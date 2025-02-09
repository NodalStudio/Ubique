import erfcinv from "../elmath/erfcinv.ts";

/**
 * @function norminv
 * @summary Computes the inverse of the normal cumulative distribution function (CDF).
 * @description Returns the inverse CDF (quantile function) for a normal distribution with mean `mu` and standard deviation `sigma` at probability `p`.
 * If `mu` and `sigma` are not provided, it defaults to the standard normal distribution (mu = 0, sigma = 1).
 *
 * @param {number} p The probability value in the range (0,1).
 * @param {number} [mu=0] The mean of the normal distribution.
 * @param {number} [sigma=1] The standard deviation of the normal distribution.
 * @returns {number} The inverse CDF (quantile).
 * @throws {Error} If `p` is not in the range (0,1) or `sigma` is not positive.
 *
 * @example
 * import norminv from './norminv.ts';
 *
 * // Example 1: Compute the inverse CDF for standard normal distribution
 * assert.strictEqual(norminv(0.05), -1.6448536127562647);
 *
 * // Example 2: Compute inverse CDF with custom mean and standard deviation
 * assert.strictEqual(norminv(0.01, 10, 2),  5.347304312449656);
 *
 * // Example 3: Compute inverse CDF at median (should return mean)
 * assert.strictEqual(norminv(0.5, 5, 1), 5);
 *
 * // Example 4: Compute inverse CDF for a high probability (should be positive)
 * assert.strictEqual(norminv(0.975, 0, 1), 1.95996);
 *
 * // Example 5: Compute inverse CDF for a low probability (should be negative)
 * assert.strictEqual(norminv(0.025, 0, 1), -1.95996);
 */
export default function norminv(p: any, mu = 0, sigma = 1) {
  if (p <= 0 || p >= 1) {
    throw new Error("Probability value must be in the range (0,1)");
  }
  if (sigma <= 0) {
    throw new Error("Standard deviation must be a positive number");
  }

  const x0 = -Math.sqrt(2) * erfcinv(2 * p);

  return x0 * sigma + mu;
}
