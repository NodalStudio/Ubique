import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  annreturn,
  isarray,
  ismatrix,
  ulcerindex,
  vectorfun,
} from "../../index.ts";

/**
 * @function martinratio
 * @summary Martin Ratio
 * @description A risk-adjusted performance measure that uses the Ulcer Index to adjust for risk.
 * Martin Ratio = (Portfolio Return - RiskFree) / Ulcer Index
 *
 * @param x Asset/portfolio returns
 * @param frisk Annual free-risk rate (defaults to 0)
 * @param t Frequency of data. 1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily (defaults to 252)
 * @param mode Drawdown calculation mode: 'return' or 'geometric' (defaults to 'return')
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise) (defaults to 0)
 * @returns Martin Ratio
 * @throws {Error} If input is not an array or matrix
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Martin ratio for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(martinratio(x, 0, 12), 44.42545597931942);
 *
 * // Example 2: Martin ratio for multiple assets
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(martinratio(x, 0, 12), 44.42545597931942);
 * assertEquals(martinratio(y, 0, 12), 2.438364078885411);
 *
 * // Example 3: Martin ratio with geometric mode
 * assertEquals(martinratio(x, 0.02, 12, "geometric"), 40.3700870722293);
 * ```
 */
export default function martinratio(
  x: array,
  frisk?: number,
  t?: number,
  mode?: string,
  dim?: 0 | 1,
): number;
export default function martinratio(
  x: matrix,
  frisk?: number,
  t?: number,
  mode?: string,
  dim?: 0 | 1,
): array | matrix;
export default function martinratio(
  x: numarraymatrix,
  frisk: number = 0,
  t: number = 252,
  mode: string = "return",
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _martinratio = function (
    a: array,
    frisk: number,
    t: number,
    mode: string,
  ): number {
    const annualReturn = annreturn(a, t);
    return (annualReturn - frisk) / ulcerindex(a, mode);
  };

  if (!isarray(x)) {
    throw new Error("Input arguments must be an array or matrix");
  }

  return vectorfun(dim, x, (a: array) => _martinratio(a, frisk, t, mode));
}
