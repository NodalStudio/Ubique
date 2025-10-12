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
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: 1D array
 * assertEquals(ndims([3, 5, 6]), 2);
 *
 * // Example 2: 2D array
 * assertEquals(ndims([[3, 2, 7], [4, 5, 6]]), 2);

 * ```*/
export default function ndims(x: array | matrix): number {
  return length(size(x));
}
