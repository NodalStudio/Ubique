import size from "./size.ts";
import length from "./length.ts";

import type { array, matrix } from "../types.d.ts";

/**
 * Number of array dimensions.
 *
 * Calculates the number of dimensions of an array or matrix by determining the length of the size array.
 *
 * @param x Array or matrix of elements.
 * @returns The number of dimensions of the array.
 * @throws If no input is provided.
 *
 * @example 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ndims([3, 5, 6]), 2);
 *
 * ```
 *
 * @example 2D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ndims([[3, 2, 7], [4, 5, 6]]), 2);
 *
 * ```
 */
export default function ndims(x: array | matrix): number {
  return length(size(x));
}
