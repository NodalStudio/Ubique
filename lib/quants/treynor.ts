import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isarray, ismatrix, linearreg, mean, vectorfun } from "../../index.ts";

/**
 * @function treynor
 * @summary Treynor Ratio
 * @description Computes the Treynor ratio, a risk-adjusted performance measure that uses beta
 * (systematic risk) instead of standard deviation. It measures excess return per unit of systematic risk.
 *
 * @param x Asset/portfolio returns
 * @param y Benchmark/market returns
 * @param frisk Risk-free rate (defaults to 0)
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise) (defaults to 0)
 * @returns The Treynor ratio
 * @throws If input is a number or insufficient arguments provided
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Treynor ratio for a single asset against benchmark
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * const z = [0.04, -0.022, 0.043, 0.028, -0.078, -0.011, 0.033, -0.049, 0.09, 0.087];
 * assertEquals(treynor(x, z, 0.01/12), -0.09568702060685172);
 *
 * // Example 2: Treynor ratio for multiple assets against benchmark
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(treynor(x, z, 0.01/12), -0.09568702060685172);
 * assertEquals(treynor(y, z, 0.01/12), 0.029862503769903546);
 *
 * // Example 3: Treynor ratio with zero risk-free rate
 * assertEquals(treynor(x, z), -0.10035923840992064);
 * ```
 */
export default function treynor(
  x: array,
  y: array,
  frisk?: number,
  dim?: 0 | 1,
): number;
export default function treynor(
  x: matrix,
  y: array,
  frisk?: number,
  dim?: 0 | 1,
): array | matrix;
export default function treynor(
  x: numarraymatrix,
  y: array,
  frisk: number = 0,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _treynor = function (a: array, b: array, frisk: number): number {
    const beta = linearreg(a, b).beta;
    return (mean(a) - frisk) / beta;
  };

  if (!isarray(x) && !ismatrix(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, (a: array) => _treynor(a, y, frisk));
}
