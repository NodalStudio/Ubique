import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  annreturn,
  drawdown,
  isarray,
  ismatrix,
  vectorfun,
} from "../../index.ts";

/**
 * Calmar Ratio.
 *
 * A risk-adjusted measure like Sharpe ratio that uses maximum drawdown instead of
 * standard deviation for risk.
 * Calmar Ratio = (Annualized Return - Risk Free Rate) / Maximum Drawdown
 *
 * @param x Asset/portfolio returns
 * @param frisk Annual free-risk rate (def: 0)
 * @param t Frequency of data: 1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily (def: 252)
 * @param dim Dimension 0: row, 1: column (def: 0)
 * @returns Calmar Ratio
 * @throws If input arguments must be an array or matrix
 *
 * @example Single array of returns
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(calmarratio(x, 0, 12), 16.70104871897814);
 *
 * ```
 *
 * @example Matrix of returns
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x1 = [0.003, 0.026, 0.015, -0.009, 0.014];
 * const x2 = [0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(calmarratio([x1, x2], 0, 12), [13.690375850324857, 25.379052966087876]);
 *
 * ```
 *
 * @example Different risk-free rate
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 *
 * assertEquals(calmarratio(x, 0.02, 12), 15.272477290406712);
 * ```
 */
export default function calmarratio(
  x: array,
  frisk?: number,
  t?: number,
  dim?: 0 | 1,
): number;
export default function calmarratio(
  x: matrix,
  frisk?: number,
  t?: number,
  dim?: 0 | 1,
): array | matrix;
export default function calmarratio(
  x: numarraymatrix,
  frisk: number = 0,
  t: number = 252,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _calmarratio = function (a: array, frisk: number, t: number): number {
    const annualReturn = annreturn(a, t) as number;
    const maxDrawdown = drawdown(a).maxdd;
    return (annualReturn - frisk) / maxDrawdown;
  };

  if (!isarray(x) && !ismatrix(x)) {
    throw new Error("Input arguments must be an array or matrix");
  }

  return vectorfun(dim, x, _calmarratio, frisk, t);
}
