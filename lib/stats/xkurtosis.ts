import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  arrayfun,
  isarray,
  ismatrix,
  isnumber,
  kurtosis,
} from "../../index.ts";

/**
 * Excess kurtosis.
 *
 * Calculates the excess kurtosis (kurtosis - 3) which measures the "tailedness"
 * relative to a normal distribution. Zero excess kurtosis indicates normal-like tails.
 *
 * @param x Input array or matrix
 * @param flag Normalization flag (0: bias correction, 1: simple). Default is 1
 * @param dim Dimension along which to compute excess kurtosis. Default is 0
 * @returns Excess kurtosis values
 * @throws When input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Normal-like distribution
 * assertEquals(xkurtosis([1, 2, 3, 4, 5]), -1.3);
 *
 * // Example 2: Heavy-tailed distribution
 * assertEquals(xkurtosis([1, 2, 3, 10]), -0.7696000000000001);
 *
 * // Example 3: Matrix excess kurtosis
 * assertEquals(xkurtosis([[1, 2, 3], [4, 5, 6]]), [-1.5, -1.5]);
 * ```
 */
export default function xkurtosis(x: array, flag?: 0 | 1, dim?: 0 | 1): number;
export default function xkurtosis(x: matrix, flag?: 0 | 1, dim?: 0 | 1): array;
export default function xkurtosis(
  x: numarraymatrix,
  flag: 0 | 1 = 1,
  dim: 0 | 1 = 0,
): numarraymatrix {
  let kurt: numarraymatrix;
  if (isarray(x)) {
    kurt = kurtosis(x as array, flag, dim);
  } else if (ismatrix(x)) {
    kurt = kurtosis(x as matrix, flag, dim);
  } else {
    throw new Error("Invalid input type");
  }

  if (isnumber(kurt)) {
    return kurt - 3;
  }

  return arrayfun(
    kurt as array | matrix,
    (a: number) => a - 3,
  ) as numarraymatrix;
}
