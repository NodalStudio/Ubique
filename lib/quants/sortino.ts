import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { downsiderisk, isnumber, mean, vectorfun } from "../../index.ts";

/**
 * Sortino Ratio.
 *
 * Calculates the Sortino ratio, a risk-adjusted performance measure that uses downside risk
 * instead of standard deviation. It measures the return of an investment relative to the risk of negative returns.
 *
 * Uses (mean(x) - frisk) / sqrt(mean(min(x - MAR, 0)^2)).
 * frisk sets the numerator threshold; MAR sets the downside threshold.
 *
 * @param x Asset/portfolio returns
 * @param frisk Risk-free rate (defaults to 0)
 * @param mar Minimum acceptable return threshold (defaults to 0)
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise) (defaults to 0)
 * @returns Sortino Ratio
 * @throws If input is a number (not supported)
 *
 * @example Sortino ratio for a single asset
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertAlmostEquals(sortino(x), 3.4010510161478655, 1.7005255080739327e-12);
 *
 * ```
 *
 * @example Sortino ratio with custom MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(sortino([0.1, -0.2, 0.05, -0.1], 0), -0.33541019662496846, 1.6770509831248422e-13);
 *
 * ```
 *
 * @example Sortino ratio with no downside
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(sortino([0.01, 0.02, 0.03], 0), Infinity);
 * ```
 */
export default function sortino(
  x: array,
  frisk?: number,
  mar?: number,
  dim?: 0 | 1,
): number;
/**
 * Sortino Ratio.
 *
 * Calculates the Sortino ratio, a risk-adjusted performance measure that uses downside risk
 * instead of standard deviation. It measures the return of an investment relative to the risk of negative returns.
 *
 * Uses (mean(x) - frisk) / sqrt(mean(min(x - MAR, 0)^2)).
 * frisk sets the numerator threshold; MAR sets the downside threshold.
 *
 * @param x Asset/portfolio returns
 * @param frisk Risk-free rate (defaults to 0)
 * @param mar Minimum acceptable return threshold (defaults to 0)
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise) (defaults to 0)
 * @returns Sortino Ratio
 * @throws If input is a number (not supported)
 *
 * @example Sortino ratio for a single asset
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertAlmostEquals(sortino(x), 3.4010510161478655, 1.7005255080739327e-12);
 *
 * ```
 *
 * @example Sortino ratio with custom MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(sortino([0.1, -0.2, 0.05, -0.1], 0), -0.33541019662496846, 1.6770509831248422e-13);
 *
 * ```
 *
 * @example Sortino ratio with no downside
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(sortino([0.01, 0.02, 0.03], 0), Infinity);
 * ```
 */
export default function sortino(
  x: matrix,
  frisk?: number,
  mar?: number,
  dim?: 0 | 1,
): array | matrix;
/**
 * Sortino Ratio.
 *
 * Calculates the Sortino ratio, a risk-adjusted performance measure that uses downside risk
 * instead of standard deviation. It measures the return of an investment relative to the risk of negative returns.
 *
 * Uses (mean(x) - frisk) / sqrt(mean(min(x - MAR, 0)^2)).
 * frisk sets the numerator threshold; MAR sets the downside threshold.
 *
 * @param x Asset/portfolio returns
 * @param frisk Risk-free rate (defaults to 0)
 * @param mar Minimum acceptable return threshold (defaults to 0)
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise) (defaults to 0)
 * @returns Sortino Ratio
 * @throws If input is a number (not supported)
 *
 * @example Sortino ratio for a single asset
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertAlmostEquals(sortino(x), 3.4010510161478655, 1.7005255080739327e-12);
 *
 * ```
 *
 * @example Sortino ratio with custom MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(sortino([0.1, -0.2, 0.05, -0.1], 0), -0.33541019662496846, 1.6770509831248422e-13);
 *
 * ```
 *
 * @example Sortino ratio with no downside
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(sortino([0.01, 0.02, 0.03], 0), Infinity);
 * ```
 */
export default function sortino(
  x: numarraymatrix,
  frisk: number = 0,
  mar: number = 0,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _sortino = function (a: array, frisk: number, mar: number): number {
    return (mean(a) - frisk) / downsiderisk(a, mar);
  };

  if (isnumber(x)) {
    throw new Error("Input must be an array or matrix, not a number");
  }

  return vectorfun(dim, x, _sortino, frisk, mar);
}
