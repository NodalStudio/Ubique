import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { arrayfun, isnumber, mean, minus, vectorfun } from "../../index.ts";

/**
 * Mean absolute deviation.
 *
 * Calculates the mean absolute deviation of values from their mean.
 * MAD is the average of absolute deviations from the mean, providing a measure of variability.
 *
 * @param x Input array or matrix
 * @param dim Dimension along which to compute MAD. Default is 0
 * @returns Mean absolute deviation values
 * @throws When input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Simple MAD calculation
 * assertEquals(mad([1, 2, 3, 4, 5]), 1.2);
 *
 * // Example 2: MAD with spread data
 * assertEquals(mad([1, 3, 5, 7, 9]), 2.4);
 *
 * // Example 3: Matrix MAD
 * assertEquals(mad([[1, 2], [3, 4]]), [0.5, 0.5]);
 * ```
 */
export default function mad(x: array, dim?: 0 | 1): number;
export default function mad(x: matrix, dim?: 0 | 1): array;
export default function mad(x: numarraymatrix, dim: 0 | 1 = 0): numarraymatrix {
  const _mad = function (a: number[]) {
    return mean(arrayfun(minus(a, mean(a)), Math.abs));
  };

  if (isnumber(x)) {
    return 0;
  }

  return vectorfun(dim, x, _mad);
}
