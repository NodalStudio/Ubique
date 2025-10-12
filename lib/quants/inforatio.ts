import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isarray, mean, minus, std, vectorfun } from "../../index.ts";

/**
 * Information Ratio.
 *
 * Measures portfolio returns in excess of a benchmark relative to the
 * volatility of those excess returns. The information ratio measures the skill of
 * an asset manager to generate excess returns relative to a benchmark.
 *
 * @param x asset/portfolio returns
 * @param y benchmark returns
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Information Ratio
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Information ratio between a single asset and benchmark
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(inforatio(x,y), 0.09369148584852913);
 * ```
 */
export default function inforatio(
  x: array,
  y: array,
  dim?: 0 | 1,
): number;
export default function inforatio(
  x: matrix,
  y: array,
  dim?: 0 | 1,
): array | matrix;
export default function inforatio(
  x: numarraymatrix,
  y: array,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _inforatio = function (a: array, b: array): number {
    const diff = minus(a, b) as array;
    return (mean(diff) as number) / (std(diff) as number);
  };

  if (!isarray(x) || !isarray(y)) {
    throw new Error("Inputs must be arrays or matrices");
  }

  return vectorfun(dim, x, (a: array) => _inforatio(a, y));
}
