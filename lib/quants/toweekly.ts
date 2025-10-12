/**
 * Time Series Analysis
 */
import type { array, matrix } from "../types.d.ts";
import { cat, find, isvector, subset, weekday } from "../../index.ts";

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
    idx = cat(1, 0, idx) as array;
  }

  if (wd[wd.length - 1] !== 5) {
    const result = cat(1, idx, nd.length - 1) as array | matrix;
    idx = Array.isArray(result[0]) ? (result as matrix)[0] : (result as array);
  }

  const indices = idx as array;

  let newv: array | matrix;
  if (isOneDArray(nv)) {
    newv = indices.map((position: number) => nv[position]);
  } else if (isvector(nv)) {
    newv = subset(nv, indices) as array | matrix;
  } else {
    // Must be a matrix
    newv = subset(nv, indices, ":") as array | matrix;
  }

  const newDates = indices.map((position: number) => nd[position]);

  return [newDates, newv];
}

function isOneDArray(value: array | matrix): value is array {
  if (!Array.isArray(value)) {
    return false;
  }

  if (value.length === 0) {
    return true;
  }

  return !Array.isArray(value[0]);
}
