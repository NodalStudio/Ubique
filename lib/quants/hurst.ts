/**
 * Time Series Analysis.
 */
import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { cumdev, isnumber, max, min, std, vectorfun } from "../../index.ts";

/**
 * Hurst index/exponent.
 *
 * It's a useful statistic for detecting if a time series is mean reverting (anti-persistent), totally random or persistent.
 * A value in the range [0.5) indicates mean-reverting (anti-persistent)
 * A value of 0.5 indicate a random walk
 * A value H in the range (0.5,1] indicates momentum (persistent)
 *
 * @param x array of values
 * @param flag normalization value 0: population, 1:sample (def: 1)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Hurst exponent
 *
 * @example Hurst exponent for a single time series
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(hurst(x), 0.3440590389509703);
 *
 * ```
 *
 * @example Hurst exponent for different data
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(hurst([0.05, 0.03, 0.08, -0.02]), 0.19397632085813782);
 *
 * ```
 *
 * @example Hurst exponent interpretation (0.5 = random walk)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(hurst([0.01, 0.02, -0.01, 0.03, -0.02]), 0.1405484063287468);
 * ```
 */
export default function hurst(
  x: array,
  flag?: 0 | 1,
  dim?: 0 | 1,
): number;
export default function hurst(
  x: matrix,
  flag?: 0 | 1,
  dim?: 0 | 1,
): array | matrix;
export default function hurst(
  x: numarraymatrix,
  flag: 0 | 1 = 1,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _hurst = function (a: array, flag: 0 | 1): number {
    const cdeviation = cumdev(a);
    const rs = (max(cdeviation) - min(cdeviation)) / (std(a, flag) as number);
    return Math.log(rs as number) / Math.log(a.length);
  };

  if (isnumber(x)) {
    return 0;
  }

  return vectorfun(dim, x, _hurst, flag);
}
