import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { arrayfun, isnumber, kurtosis } from "../../index.ts";

/**
 * @function xkurtosis
 * @summary Excess kurtosis
 * @description Calculates the excess kurtosis (kurtosis - 3) of the values in array x
 *
 * @param x The input array or matrix
 * @param flag Optional normalization flag (0: bias correction, 1: simple). Default is 1
 * @param dim Optional dimension along which to compute excess kurtosis. Default is 0 (rows)
 * @returns The excess kurtosis value(s)
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { xkurtosis, cat } from "../../index.ts";
 *
 * // Example 1: Calculate excess kurtosis of an array
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(xkurtosis(x), 0.037581);
 *
 * // Example 2: Calculate excess kurtosis for each row in a matrix
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(xkurtosis(cat(0, x, y)), [[0.037581], [-1.602358]]);
 * ```
 */
export default function xkurtosis(x: array, flag?: 0 | 1, dim?: 0 | 1): number;
export default function xkurtosis(
  x: matrix,
  flag?: 0 | 1,
  dim?: 0 | 1,
): array | matrix;
export default function xkurtosis(
  x: array | matrix,
  flag: 0 | 1 = 1,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const kurt = kurtosis(x, flag, dim) as number | array | matrix;

  if (isnumber(kurt)) {
    return (kurt as number) - 3;
  }

  return arrayfun(kurt, (a: number) => a - 3);
}
