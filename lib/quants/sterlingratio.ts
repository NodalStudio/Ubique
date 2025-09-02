import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { annreturn, cdrawdown, isnumber, max, vectorfun } from "../../index.ts";

/**
 * @function sterlingratio
 * @summary Sterling Ratio
 * @description A risk-adjusted performance measure like Calmar ratio but the denominator is
 * the largest consecutive drawdown (excluded the 10% excess in the original formula).
 * Sterling Ratio = (Annualized Return - Risk Free Rate) / Largest Drawdown
 *
 * @param x asset/portfolio returns
 * @param frisk annual free-risk rate (def: 0)
 * @param t frequency of data. 1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily (def: 252)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Sterling Ratio
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Single asset sterling ratio
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(sterlingratio(x,0,12), 16.701048718978136);
 *
 * // Example 2: Multiple assets sterling ratios
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(sterlingratio(x,0,12), 16.701048718978136);
 * assertEquals(sterlingratio(y,0,12), 1.3190010333058182);
 * ```
 */
export default function sterlingratio(
  x: array,
  frisk?: number,
  t?: number,
  dim?: 0 | 1,
): number;
export default function sterlingratio(
  x: matrix,
  frisk?: number,
  t?: number,
  dim?: 0 | 1,
): array | matrix;
export default function sterlingratio(
  x: numarraymatrix,
  frisk: number = 0,
  t: number = 252,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _sterlingratio = function (a: array, frisk: number, t: number): number {
    const annualReturn = annreturn(a, t) as number;
    const largestDrawdown = max(cdrawdown(a)) as number;
    return (annualReturn - frisk) / largestDrawdown;
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _sterlingratio, frisk, t);
}
