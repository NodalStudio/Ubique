import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { annreturn, isnumber, painindex, vectorfun } from "../../index.ts";

/**
 * @function painratio
 * @summary Pain Ratio
 * @description A risk-adjusted measure with free risk and Pain index.
 * Pain Ratio = (Portfolio Return - RiskFree) / Pain Index
 *
 * It measures how much return is earned for each unit of pain (drawdown) experienced.
 *
 * @param x asset/portfolio returns
 * @param frisk annual free-risk rate (def: 0)
 * @param t frequency of data. 1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily (def: 252)
 * @param mode drawdown calculation. 'return','geometric' (def: 'return')
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Pain Ratio value(s)
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Single array of returns
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(painratio(x,0,12), 101.04495520047377);
 *
 * // Example 2: Multiple arrays
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(painratio(x,0,12), 101.04495520047377);
 * assertEquals(painratio(y,0,12), 3.235687223114222);
 * ```
 */
export default function painratio(
  x: array,
  frisk?: number,
  t?: number,
  mode?: string,
  dim?: 0 | 1,
): number;
export default function painratio(
  x: matrix,
  frisk?: number,
  t?: number,
  mode?: string,
  dim?: 0 | 1,
): array | matrix;
export default function painratio(
  x: numarraymatrix,
  frisk: number = 0,
  t: number = 252,
  mode: string = "geometric",
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _painratio = function (
    a: array,
    frisk: number,
    t: number,
    mode: string,
  ): number {
    const annualReturn = annreturn(a, t);
    return (annualReturn - frisk) / painindex(a, mode);
  };

  if (isnumber(x)) {
    throw new Error("input arguments must be an array or matrix");
  }

  return vectorfun(dim, x, _painratio, frisk, t, mode);
}
