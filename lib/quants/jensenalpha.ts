import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isarray, ismatrix, linearreg, mean, vectorfun } from "../../index.ts";

/**
 * @function jensenalpha
 * @summary Jensen alpha
 * @description Ex-post alpha calculated with regression line. Free-risk is the average free-risk
 * for the timeframe selected. Jensen alpha measures the excess return of a portfolio over the
 * theoretical expected return based on the portfolio's beta and CAPM model.
 *
 * @param x asset/portfolio values
 * @param y benchmark values
 * @param frisk free-risk (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Jensen alpha value
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Single asset vs benchmark
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(jensenalpha(x,y), 0.01760907323602524);
 *
 * // Example 2: Multiple assets vs benchmark
 * var z = [0.04,-0.022,0.043,0.028,-0.078,-0.011,0.033,-0.049,0.09,0.087];
 * assertEquals(jensenalpha(x,z), 0.02077158416670001);
 * assertEquals(jensenalpha(y,z), 0.006256147026618015);
 * ```
 */
export default function jensenalpha(
  x: array,
  y: array,
  frisk?: number,
  dim?: 0 | 1,
): number;
export default function jensenalpha(
  x: matrix,
  y: array,
  frisk?: number,
  dim?: 0 | 1,
): array | matrix;
export default function jensenalpha(
  x: numarraymatrix,
  y: array,
  frisk: number = 0,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _ja = function (a: array, b: array, frisk: number): number {
    const beta = linearreg(a, b).beta;
    return (mean(a) as number) - frisk - beta * ((mean(b) as number) - frisk);
  };

  if (!isarray(x) || !isarray(y)) {
    throw new Error("Inputs must be arrays or matrices");
  }

  return vectorfun(dim, x, (a: array) => _ja(a, y, frisk));
}
