import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, moment, vectorfun } from "../../index.ts";

/**
 * Computes the kurtosis of a dataset.
 *
 * Kurtosis measures the "tailedness" of a probability distribution.
 * A higher kurtosis indicates heavier tails, while a lower kurtosis suggests lighter tails.
 * Default is the sample kurtosis (excess kurtosis relative to normal distribution).
 *
 * @param x Input array or matrix
 * @param flag Bias correction flag (0 for bias correction, 1 for simple calculation). Default is 1
 * @param dim Dimension to compute along (0 for rows, 1 for columns). Default is 0
 * @returns Computed kurtosis values
 * @throws When input is invalid
 *
 * @example Simple array kurtosis
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(kurtosis([1, 2, 3, 4, 5]), 1.7);
 *
 * ```
 *
 * @example Normal distribution approximation
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(kurtosis([1, 2, 3, 4, 5, 6, 7]), 1.75);
 *
 * ```
 *
 * @example Matrix kurtosis
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(kurtosis([[1, 2, 3], [4, 5, 6]]), [1.5, 1.5]);
 * ```
 */
export default function kurtosis(x: array, flag?: 0 | 1, dim?: 0 | 1): number;
export default function kurtosis(x: matrix, flag?: 0 | 1, dim?: 0 | 1): array;
export default function kurtosis(
  x: numarraymatrix,
  flag: 0 | 1 = 1,
  dim: 0 | 1 = 0,
): numarraymatrix {
  const computeKurtosis = (arr: array, biasFlag: 0 | 1): number => {
    const n = arr.length;
    const mom4 = (moment(arr, 4) as number) / (moment(arr, 2) as number) ** 2;

    return biasFlag === 1
      ? mom4
      : (((n + 1) * mom4 - 3 * (n - 1)) * (n - 1)) / ((n - 2) * (n - 3)) + 3;
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, computeKurtosis, flag);
}
