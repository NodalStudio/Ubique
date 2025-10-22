import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, vectorfun } from "../../index.ts";

/**
 * Percentage of positive values in array or matrix.
 *
 * Calculates the percentage of positive (non-negative) values in an array or matrix.
 * This is a common metric to assess the consistency of returns.
 *
 * @param x array of elements
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Percentage of positive values
 *
 * @example Percentage of positive values in a single array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(percpos(x), 0.8);
 *
 * ```
 *
 * @example Percentage of positive values in different array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(percpos(y), 0.5);
 *
 * ```
 *
 * @example Percentage of positive values with threshold
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(percpos([0.05, 0.03, -0.02, 0.08]), 0.75);
 * ```
 */
export default function percpos(
  x: array,
  dim?: 0 | 1,
): number;
export default function percpos(
  x: matrix,
  dim?: 0 | 1,
): array | matrix;
export default function percpos(
  x: numarraymatrix,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _percpos = function (a: array): number {
    let count = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] >= 0) {
        count++;
      }
    }
    return count / a.length;
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _percpos);
}
