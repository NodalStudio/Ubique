import type { array, matrix } from "../types.d.ts";

import { isarray, ismatrix } from "../../index.ts";
import size from "./size.ts";

/**
 * Returns the number of columns in an array or matrix.
 *
 * Returns the number of columns in a 1D array (treated as a row vector) or a 2D matrix.
 *
 * @param x Array or matrix of elements.
 * @returns The number of columns in the input.

 * @throws Throws an error if no input is provided or if the input is not an array.
 *
 * @example Row vector
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(ncols([5, 6, 7]), 3); // 3
 *
 * ```
 *
 * @example Matrix with multiple rows
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(ncols([[3, 2, 7], [4, 5, 6]]), 3); // 3
 *
 * ```
 *
 * @example Single element array
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(ncols([5]), 1); // 1
 *
 * ```
 *
 * @example Single element matrix (1x1)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(ncols([[5]]), 1); // 1
 *
 * ```
 *
 * @example Empty array (treated as 1D)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(ncols([]), 0); // 0
 *
 * ```
 *
 * @example Empty matrix (array of empty arrays)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(ncols([[]]), 0); // 0
 *
 * ```
 *
 * @example Non-array input (should throw an error)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertThrows(() => { ncols(5 as unknown as number[]) }, Error, 'Input must be an array or matrix');
 *
 * ```
 *
 * @example 2D matrix with a single row
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(ncols([[1, 2, 3, 4]]), 4); // 4
 *
 * ```
 *
 * @example 2D matrix with varying row lengths (should throw an error)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertThrows(() => { ncols([[1, 2], [3, 4, 5]]) }, Error, 'Input must be an array or matrix');
 *
 * ```
 *
 * @example Multi-dimensional array (should be treated as a 2D matrix)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(ncols([[1, 2], [3, 4]]), 2); // 2
 *
 * ```
 */
export default function ncols(x: array | matrix): number {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  if (!(isarray(x) || ismatrix(x))) {
    throw new Error("Input must be an array or matrix");
  }

  return size(x)[1];
}
