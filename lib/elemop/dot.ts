import type { array } from "../types.d.ts";

import { size, sum, times } from "../../index.ts";

/**
 * Computes the dot product of two arrays.
 *
 * Takes two arrays of equal length and computes their dot product (sum of element-wise products).
 *
 * @param x First array for dot product
 * @param y Second array for dot product
 * @returns The dot product of the two arrays
 * @throws If inputs are not arrays, arrays are not of the same size, or if no arguments are provided
 *
 * @example Dot product of two 1D arrays
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(dot([5, 6, 3], [0.5, -3, 2.3]), -8.600000000000001);
 *
 * ```
 *
 * @example Dot product of two arrays with negative numbers
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(dot([-1, -2, -3], [-4, -5, -6]), 32);
 *
 * ```
 *
 * @example Dot product of two identical arrays
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(dot([1, 2, 3], [1, 2, 3]), 14);
 *
 * ```
 *
 * @example Dot product of two arrays with zero values
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(dot([0, 0, 0], [0, 0, 0]), 0);
 *
 * ```
 *
 * @example Error when input arrays are of different sizes
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
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
