/**
 * @function normpdf
 * @summary Computes the probability density function (PDF) of a normal distribution.
 * @description Returns the PDF of the normal distribution with mean `mu` and standard deviation `sigma`, evaluated at `x`.
 * If `mu` and `sigma` are not provided, it defaults to the standard normal distribution (mu = 0, sigma = 1).
 *
 * @param x The value at which to evaluate the PDF
 * @param mu The mean of the normal distribution (defaults to 0)
 * @param sigma The standard deviation of the normal distribution (defaults to 1)
 * @returns The probability density function value at x
 * @throws If sigma is not a positive number
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Compute the standard normal PDF at x = 1
 * assertEquals(normpdf(1), 0.24197072451914337);
 *
 * // Example 2: Compute normal PDF with custom mean and standard deviation
 * assertEquals(normpdf(0, 10, 2), 7.433597573671488e-7);
 *
 * // Example 3: Compute normal PDF at the mean (should be maximum)
 * assertEquals(normpdf(5, 5, 1), 0.3989422804014327);
 *
 * // Example 4: Compute normal PDF for a large value (should be small)
 * assertEquals(normpdf(100, 50, 10), 1.486719514734298e-7);
 *
 * // Example 5: Compute normal PDF for a negative value
 * assertEquals(normpdf(-1, 0, 1), 0.24197072451914337);
 * ```
 */
export default function normpdf(
  x: number,
  mu: number = 0,
  sigma: number = 1,
): number {
  if (sigma <= 0) {
    throw new Error("Standard deviation must be a positive number");
  }

  const coefficient = 1 / (Math.sqrt(2 * Math.PI) * sigma);
  const exponent = -0.5 * ((x - mu) / sigma) ** 2;

  return coefficient * Math.exp(exponent);
}
