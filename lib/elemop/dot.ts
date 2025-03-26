import type { array } from "../types.d.ts";

import { size, sum, times } from "../../index.ts";

/**
 * @function dot
 * @summary Computes the dot product of two arrays
 * @description Takes two arrays of equal length and computes their dot product (sum of element-wise products).
 *
 * @param x First array for dot product
 * @param y Second array for dot product
 * @returns The dot product of the two arrays
 * @throws {Error} If inputs are not arrays, arrays are not of the same size, or if no arguments are provided
 *
 * @example
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * // Example 1: Dot product of two 1D arrays
 * assertEquals(dot([5, 6, 3], [0.5, -3, 2.3]), -8.600000000000001);
 *
 * // Example 2: Dot product of two arrays with negative numbers
 * assertEquals(dot([-1, -2, -3], [-4, -5, -6]), 32);
 *
 * // Example 3: Dot product of two identical arrays
 * assertEquals(dot([1, 2, 3], [1, 2, 3]), 14);
 *
 * // Example 4: Dot product of two arrays with zero values
 * assertEquals(dot([0, 0, 0], [0, 0, 0]), 0);
 *
 * // Example 5: Error when input arrays are of different sizes
 * assertThrows(() => dot([1, 2], [1, 2, 3]), Error, "Arrays must have the same length");
 * ```
 */
export default function dot(x: array, y: array): number {
  const sx = size(x);
  const sy = size(y);

  if (sx[0] !== sy[0]) {
    throw new Error("Arrays must have the same length");
  }
  return sum(times(x, y));
}
