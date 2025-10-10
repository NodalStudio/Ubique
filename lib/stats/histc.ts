import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  colon,
  isarray,
  ismatrix,
  isnumber,
  max,
  min,
  plus,
  times,
  vectorfun,
} from "../../index.ts";

interface HistBin {
  bins: number;
  count: number;
  freq: number;
}

/**
 * @function histc
 * @summary Histogram count
 * @description Counts the number of values in x that fall between the elements in the bins array.
 * Values outside the range in bins are not counted. Returns an array of objects with bin edges,
 * counts, and frequencies.
 *
 * @param x Input array or matrix
 * @param bins Number of bins or array of bin edges. Default is 10
 * @param dim Dimension along which to compute histogram. Default is 0
 * @returns Array of objects with bins, count, and freq properties
 * @throws {Error} When input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Simple histogram with default bins
 * assertEquals(histc([1, 2, 3, 4, 5], 5).length, 6);
 *
 * // Example 2: Histogram with custom bin edges
 * assertEquals(histc([1, 5, 10], [0, 5, 10]).length, 3);
 *
 * // Example 3: Matrix histogram
 * assertEquals(histc([[1, 2], [3, 4]], 2).length, 2);
 * ```
 */
export default function histc(
  x: array,
  bins?: number | array,
  dim?: 0 | 1,
): HistBin[];
export default function histc(
  x: matrix,
  bins?: number | array,
  dim?: 0 | 1,
): HistBin[][];
export default function histc(
  x: numarraymatrix,
  bins: number | array = 10,
  dim: 0 | 1 = 0,
): HistBin[] | HistBin[][] {
  const _histc = function (a: number[], bins: number | array): HistBin[] {
    let y: number[] = [];
    const h: number[] = [];
    const out: HistBin[] = [];

    if (typeof bins === "number") {
      const xmin = min(a) as number;
      const xmax = max(a) as number;
      const binw = (xmax - xmin) / bins;
      const anum = colon(0, bins) as number[];
      y = plus(times(anum, binw), xmin) as number[];
    } else {
      y = bins;
    }

    for (let k = 0; k < y.length; k++) {
      h[k] = 0;
      for (let i = 0; i < a.length; i++) {
        if (y[k] <= a[i] && (y[k + 1] === undefined || a[i] < y[k + 1])) {
          h[k] += 1;
        } else if (a[i] === y[k]) {
          h[k] += 1;
        }
      }
      out.push({ bins: y[k], count: h[k], freq: h[k] / a.length });
    }

    return out;
  };

  if (isnumber(x)) {
    return [] as HistBin[];
  }

  return vectorfun(dim, x, _histc, bins);
}
