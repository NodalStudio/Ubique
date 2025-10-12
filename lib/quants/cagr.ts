import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isarray, ismatrix, vectorfun } from "../../index.ts";

/**
 * Compound Annual Growth Rate.
 *
 * Calculates the Compound Annual Growth Rate (CAGR) which represents the mean annual growth rate
 * of an investment over a specified time period longer than one year.
 *
 * @param x Array of asset values over time
 * @param t Array of corresponding time periods
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise)
 * @returns Compound Annual Growth Rate
 * @throws If input is a number (not supported)
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: CAGR for a single asset over time
 * const sp500 = [676.53, 902.40, 1378.43, 1769.30, 2206.45, 2643.85, 2679.63];
 * const dates = [1998, 2000, 2005, 2010, 2015, 2020, 2022];
 * assertEquals(cagr(sp500, dates), 0.05902892931364878);
 *
 * // Example 2: CAGR for multiple assets with the same time series
 * assertEquals(cagr([sp500, sp500], dates), [0.05902892931364878, 0.05902892931364878]);
 *
 * // Example 3: CAGR with different time periods
 * const portfolio = [1000, 1200, 1500, 1800];
 * const years = [2020, 2021, 2022, 2023];
 * assertEquals(cagr(portfolio, years), 0.21644039911467994);
 * ```
 */
export default function cagr(x: array, t: array, dim?: 0 | 1): number;
export default function cagr(x: matrix, t: array, dim?: 0 | 1): array | matrix;
export default function cagr(
  x: numarraymatrix,
  t: array,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _cagr = function (a: array, time: array): number {
    const n = time[time.length - 1] - time[0];
    return Math.pow(a[a.length - 1] / a[0], 1 / n) - 1;
  };

  if (!isarray(x) && !ismatrix(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, _cagr, t);
}
