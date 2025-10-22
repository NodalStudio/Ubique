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
 * @example Simple MAD calculation
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mad([1, 2, 3, 4, 5]), 1.2);
 *
 * ```
 *
 * @example MAD with spread data
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mad([1, 3, 5, 7, 9]), 2.4);
 *
 * ```
 *
 * @example Matrix MAD
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mad([[1, 2], [3, 4]]), [0.5, 0.5]);
 * ```
 */
export default function mad(x: array, dim?: 0 | 1): number;
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
 * @example Simple MAD calculation
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mad([1, 2, 3, 4, 5]), 1.2);
 *
 * ```
 *
 * @example MAD with spread data
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mad([1, 3, 5, 7, 9]), 2.4);
 *
 * ```
 *
 * @example Matrix MAD
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mad([[1, 2], [3, 4]]), [0.5, 0.5]);
 * ```
 */
export default function mad(x: matrix, dim?: 0 | 1): array;
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
 * @example Simple MAD calculation
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mad([1, 2, 3, 4, 5]), 1.2);
 *
 * ```
 *
 * @example MAD with spread data
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mad([1, 3, 5, 7, 9]), 2.4);
 *
 * ```
 *
 * @example Matrix MAD
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mad([[1, 2], [3, 4]]), [0.5, 0.5]);
 * ```
 */
export default function mad(x: numarraymatrix, dim: 0 | 1 = 0): numarraymatrix {
  const _mad = function (a: number[]) {
    return mean(arrayfun(minus(a, mean(a)), Math.abs));
  };

  if (isnumber(x)) {
    return 0;
  }

  return vectorfun(dim, x, _mad);
}
