/**
 * @function normpdf
 * @summary Computes the probability density function (PDF) of a normal distribution.
 * @description Returns the PDF of the normal distribution with mean `mu` and standard deviation `sigma`, evaluated at `x`.
 * If `mu` and `sigma` are not provided, it defaults to the standard normal distribution (mu = 0, sigma = 1).
 *
 * @param {number} x The value at which to evaluate the PDF.
 * @param {number} [mu=0] The mean of the normal distribution.
 * @param {number} [sigma=1] The standard deviation of the normal distribution.
 * @returns {number} The probability density function value at `x`.
 * @throws {Error} If `sigma` is not a positive number.
 *
 * @example
 * import normpdf from './normpdf.ts';
 *
 * // Example 1: Compute the standard normal PDF at x = 1
 * assert.strictEqual(normpdf(1), 0.241971);
 *
 * // Example 2: Compute normal PDF with custom mean and standard deviation
 * assert.strictEqual(normpdf(0, 10, 2), 0.0022159);
 *
 * // Example 3: Compute normal PDF at the mean (should be maximum)
 * assert.strictEqual(normpdf(5, 5, 1), 0.398942);
 *
 * // Example 4: Compute normal PDF for a large value (should be small)
 * assert.strictEqual(normpdf(100, 50, 10), 7.6946e-7);
 *
 * // Example 5: Compute normal PDF for a negative value
 * assert.strictEqual(normpdf(-1, 0, 1), 0.241971);
 */
export default function normpdf(x: any, mu = 0, sigma = 1) {
  if (sigma <= 0) {
    throw new Error("Standard deviation must be a positive number");
  }

  const coefficient = 1 / (Math.sqrt(2 * Math.PI) * sigma);
  const exponent = -0.5 * ((x - mu) / sigma) ** 2;

  return coefficient * Math.exp(exponent);
}
