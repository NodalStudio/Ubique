/**
 * @function norminv
 * @summary Computes the inverse of the normal cumulative distribution function (CDF).
 * @description Returns the inverse CDF (quantile function) for a normal distribution with mean `mu` and standard deviation `sigma` at probability `p`.
 * If `mu` and `sigma` are not provided, it defaults to the standard normal distribution (mu = 0, sigma = 1).
 *
 * @param p The probability value in the range (0,1).
 * @param mu The mean of the normal distribution.
 * @param sigma The standard deviation of the normal distribution.
 * @returns The inverse CDF (quantile).
 * @throws If `p` is not in the range (0,1) or `sigma` is not positive.
 *
 * @example
 * // Example 1: Compute the inverse CDF for standard normal distribution
 * assert.strictEqual(norminv(0.05), -1.6448536127562647);
 *
 * // Example 2: Compute inverse CDF with custom mean and standard deviation
 * assert.strictEqual(norminv(0.01, 10, 2), 5.347304312449656);
 *
 * // Example 3: Compute inverse CDF at median (should return mean)
 * assert.strictEqual(norminv(0.5, 5, 1), 5);
 *
 * // Example 4: Compute inverse CDF for a high probability (should be positive)
 * assert.strictEqual(norminv(0.975, 0, 1), 1.9599639471668915);
 *
 * // Example 5: Compute inverse CDF for a low probability (should be negative)
 * assert.strictEqual(norminv(0.025, 0, 1), -1.9599639471668922);
 */
export function norminv(p: number, mu?: number, sigma?: number): number;
