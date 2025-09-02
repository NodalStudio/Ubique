/**
 * Time Series Analysis
 */
// deno-lint-ignore-file no-explicit-any
import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { cat, find, ismatrix, isvector, subset, weekday } from "../../index.ts";

/**
 * @function toweekly
 * @summary Convert a time series to a weekly frequency
 * @description Convert a time series to a weekly frequency. Default: all days
 * in the range. Example: daily dates [Wed,...Fri,...Mon,...Fri,...Thu] will become
 * [Wed,...,Fri...,Fri...,Thu]
 *
 * @param nd array of unix dates
 * @param nv array or matrix of values
 * @return matrix of weekly dates and values
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Convert daily data to weekly frequency (simplified)
 * const dates = [1421280000, 1421366400, 1421452800, 1421539200];
 * const values = [100, 99, 102, 103];
 * const result = toweekly(dates, values);
 * assertEquals(result.length, 2);  // Returns [dates, values] array
 * ```
 */
export default function toweekly(
  nd: array,
  nv: array | matrix,
): [array, array | matrix] {
  const wd = weekday(nd);

  // basic mode: all data, exact on Friday
  let idx = find(wd.map((a: number) => a === 5));

  if (wd[0] !== 5) {
    idx = cat(1, 0, idx);
  }

  if (wd[wd.length - 1] !== 5) {
    idx = cat(1, idx, nd.length - 1)[0];
  }

  let newv;
  if (isvector(nv)) {
    newv = subset(nv, idx);
  }

  if (ismatrix(nv)) {
    newv = subset(nv, idx, ":");
  }

  return [subset(nd, idx), newv];
}
