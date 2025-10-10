import type { array } from "../types.d.ts";
import { isnumber } from "../../index.ts";

/**
 * @function interp1
 * @summary Linear interpolation
 * @description Linear interpolation. Returns the 1-D value of Y, given Xi query points.
 *
 * @param x sample points (must be sorted in ascending order)
 * @param y corresponding values of sample points
 * @param xnew new query points for interpolation
 * @return Interpolated values
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Interpolate at specific points
 * var x = [1,2,3,4,5,6];
 * var y = [2,4,6,8,10,12];
 * assertEquals(interp1(x,y,[2,4,6]), [4, 8, 12]);
 *
 * // Example 2: Interpolate at a single point
 * assertEquals(interp1(x,y,3), 6);
 *
 * // Example 3: Interpolate between points
 * assertEquals(interp1(x,y,3.5), 7);
 * ```
 */
export default function interp1(
  x: array,
  y: array,
  xnew: number | array,
): number | array {
  if (x.length !== y.length) {
    throw new Error("input dimension mismatch");
  }

  const xMin = x[0];
  const xMax = x[x.length - 1];

  const xPoints = isnumber(xnew) ? [xnew] : xnew as array;
  const n = x.length;
  const result = new Array(xPoints.length);

  const slopes = new Array(n - 1);
  const intercepts = new Array(n - 1);

  for (let i = 0; i < n - 1; i++) {
    const dx = x[i + 1] - x[i];
    const dy = y[i + 1] - y[i];
    slopes[i] = dy / dx;
    intercepts[i] = y[i] - x[i] * slopes[i];
  }

  for (let i = 0; i < xPoints.length; i++) {
    const xi = xPoints[i] as number;

    if (xi < xMin || xi > xMax) {
      result[i] = NaN;
      continue;
    }

    const idx = findSegment(x, xi);

    if (xi === x[idx]) {
      result[i] = y[idx];
    } else {
      result[i] = slopes[idx] * xi + intercepts[idx];
    }
  }

  return isnumber(xnew) ? result[0] : result;
}

/**
 * Find the segment index where value falls
 */
function findSegment(arr: array, value: number): number {
  let low = 0;
  let high = arr.length - 2;

  if (value <= arr[0]) return 0;
  if (value >= arr[arr.length - 2]) return arr.length - 2;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (value >= arr[mid] && value < arr[mid + 1]) {
      return mid;
    }

    if (value < arr[mid]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return low;
}
