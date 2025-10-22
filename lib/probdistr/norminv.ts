import erfcinv from "../elmath/erfcinv.ts";

/**
 * Computes the inverse of the normal cumulative distribution function (CDF).
 *
 * Returns the inverse CDF (quantile function) for a normal distribution with mean `mu` and standard deviation `sigma` at probability `p`.
 * If `mu` and `sigma` are not provided, it defaults to the standard normal distribution (mu = 0, sigma = 1).
 *
 * @param p The probability value in the range (0,1).
 * @param mu The mean of the normal distribution. Defaults to 0.
 * @param sigma The standard deviation of the normal distribution. Defaults to 1.
 * @returns The inverse CDF (quantile).
 * @throws If `p` is not in the range (0,1) or `sigma` is not positive.
 *
 * @example Compute the inverse CDF for standard normal distribution
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(norminv(0.05), -1.6448536127562647);
 *
 * ```
 *
 * @example Compute inverse CDF with custom mean and standard deviation
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(norminv(0.01, 10, 2),  5.347304312449656);
 *
 * ```
 *
 * @example Compute inverse CDF at median (should return mean)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(norminv(0.5, 5, 1), 5);
 *
 * ```
 *
 * @example Compute inverse CDF for a high probability (should be positive)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(norminv(0.975, 0, 1), 1.9599639471668915);
 *
 * ```
 *
 * @example Compute inverse CDF for a low probability (should be negative)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(norminv(0.025, 0, 1), -1.9599639471668922);
 * ```
 */
export default function norminv(p: number, mu = 0, sigma = 1): number {
  if (p <= 0 || p >= 1) {
    throw new Error("Probability value must be in the range (0,1)");
  }
  if (sigma <= 0) {
    throw new Error("Standard deviation must be a positive number");
  }

  const x0 = -Math.sqrt(2) * erfcinv(2 * p);

  return x0 * sigma + mu;
}
