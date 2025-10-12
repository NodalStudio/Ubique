import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  annreturn,
  cdrawdown,
  isarray,
  ismatrix,
  power,
  sqrt,
  sum,
  vectorfun,
} from "../../index.ts";

/**
 * Computes the Burke Ratio.
 *
 * The Burke Ratio is a risk-adjusted performance metric that accounts for drawdowns.
 * In 'simple' mode, it calculates the excess return over the risk-free rate divided by the square root
 * of the sum of squared drawdowns. In 'modified' mode, the result is scaled by the square root of the number of data points.
 *
 * @param x Asset or portfolio returns
 * @param frisk Annual risk-free rate
 * @param t Frequency: 252 (daily), 52 (weekly), 12 (monthly), 4 (quarterly)
 * @param mode Calculation mode: 'simple' or 'modified'
 * @param dim Dimension: 0 (row-wise), 1 (column-wise)
 * @returns The computed Burke Ratio
 * @throws If an invalid mode is provided or if input arguments are invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Burke ratio for a single asset with simple mode
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(burkeratio(x, 0, 12), 8.282140961596584);
 *
 * // Example 2: Burke ratio with modified mode
 * assertEquals(burkeratio(x, 0, 12, "modified"), 26.190429341222337);
 *
 * // Example 3: Burke ratio for multiple assets (matrix)
 * const x1 = [0.003, 0.026, 0.015, -0.009, 0.014];
 * const x2 = [0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(burkeratio([x1, x2], 0, 12), [9.680557600757295, 17.94570045241343]);
 * ```
 */
export default function burkeratio(
  x: array,
  frisk?: number,
  t?: number,
  mode?: "simple" | "modified",
  dim?: 0 | 1,
): number;
export default function burkeratio(
  x: matrix,
  frisk?: number,
  t?: number,
  mode?: "simple" | "modified",
  dim?: 0 | 1,
): array;
export default function burkeratio(
  x: numarraymatrix,
  frisk = 0,
  t = 252,
  mode = "simple",
  dim: 0 | 1 = 0,
): number | array | matrix {
  if (!isarray(x) && !ismatrix(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, (a: array) => {
    const annRet = annreturn(a, t);
    const dd = sqrt(sum(power(cdrawdown(a), 2)));
    return mode === "simple"
      ? (annRet - frisk) / dd
      : ((annRet - frisk) / dd) * sqrt(a.length);
  });
}
