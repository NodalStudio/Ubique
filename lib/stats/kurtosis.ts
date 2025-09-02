import type { array, matrix } from "../types.d.ts";
import { moment, vectorfun } from "../../index.ts";

/**
 * @function kurtosis
 * @summary Computes the kurtosis of a dataset.
 * @description Kurtosis measures the "tailedness" of a probability distribution.
 * A higher kurtosis indicates heavier tails, while a lower kurtosis suggests lighter tails.
 *
 * @param x The dataset (array or matrix)
 * @param flag Bias correction flag (0 for bias correction, 1 for simple calculation, defaults to 1)
 * @param dim Dimension to compute kurtosis along (0 for row-wise, 1 for column-wise, defaults to 0)
 * @returns The computed kurtosis
 * @throws {Error} If the input arguments are insufficient
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * import kurtosis from './kurtosis.ts';
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 *
 * // Example 1: Compute kurtosis of an array
 * assertEquals(kurtosis(x), 3.037581);
 *
 * // Example 2: Compute kurtosis with bias correction
 * assertEquals(kurtosis(x, 0), 2.9453);
 *
 * // Example 3: Compute kurtosis for a matrix along rows
 * assertEquals(kurtosis([[...x], [...y]]), [[3.037581], [1.397642]]);
 *
 * // Example 4: Compute kurtosis for a matrix along columns
 * assertEquals(kurtosis([[0.003, 0.026], [0.015, -0.009]], 1, 1), [[2.78], [1.85]]);
 *
 * // Example 5: Compute kurtosis for a dataset with equal elements (should be NaN)
 * assertEquals(kurtosis([1, 1, 1, 1, 1]), NaN);

 * ```*/
export default function kurtosis(x: array, flag?: 0 | 1, dim?: 0 | 1): number;
export default function kurtosis(
  x: matrix,
  flag?: 0 | 1,
  dim?: 0 | 1,
): array;
export default function kurtosis(
  x: array | matrix,
  flag: 0 | 1 = 1,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const computeKurtosis = (arr: array, biasFlag: 0 | 1): number => {
    const n = arr.length;
    const mom4 = moment(arr, 4) as number / (moment(arr, 2) as number) ** 2;

    return biasFlag === 1
      ? mom4
      : ((n + 1) * mom4 - 3 * (n - 1)) * (n - 1) / ((n - 2) * (n - 3)) + 3;
  };

  if (!Array.isArray(x)) {
    return NaN;
  }

  return vectorfun(dim, x, computeKurtosis, flag);
}
