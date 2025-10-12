import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { drawdown, isnumber, sum, vectorfun } from "../../index.ts";

/**
 * Pain Index.
 *
 * Mean value of the drawdowns, similar to Ulcer Index.
 * It measures the depth, duration, and frequency of losses.
 *
 * @param x asset/portfolio returns
 * @param mode drawdown calculation. 'return','geometric' (def: 'return')
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Pain Index
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Single array of returns
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(painindex(x), 0.0023000000000000034);
 *
 * // Example 2: Multiple arrays
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(painindex(x), 0.0023000000000000034);
 * assertEquals(painindex(y), 0.042955093457969766);
 * ```
 */
export default function painindex(
  x: array,
  mode?: string,
  dim?: 0 | 1,
): number;
export default function painindex(
  x: matrix,
  mode?: string,
  dim?: 0 | 1,
): array | matrix;
export default function painindex(
  x: numarraymatrix,
  mode: string = "return",
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _painindex = function (a: array, mode: string): number {
    const dd = drawdown(a, mode).dd;
    const n = a.length;
    return (sum(dd) as number) / n;
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _painindex, mode);
}
