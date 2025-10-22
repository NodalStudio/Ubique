import type { array, matrix } from "../types.d.ts";

import size from "./size.ts";

/**
 * Returns the number of rows in an array or matrix.
 *
 * Returns the number of rows in a 1D array (treated as a row vector) or a 2D matrix.
 *
 * @param x Array or matrix of elements.
 * @returns The number of rows in the input.
 *
 * @throws Throws an error if no input is provided or if the input is not an array.
 *
 * @example Row vector (1D array)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(nrows([5, 6, 7]), 1);
 *
 * ```
 *
 * @example Matrix with multiple rows (2D array)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(nrows([[3, 2, 7], [4, 5, 6]]), 2);
 *
 * ```
 */
export default function nrows(x: array | matrix): number {
  return size(x)[0];
}
