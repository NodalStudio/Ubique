import size from "./size.ts";
import type { array, matrix } from "../types.d.ts";

/**
 * Gets the length of a vector or the largest array dimension.
 *
 * Returns the length of a vector or the largest dimension of a 2D array (matrix).
 *
 * @param x The input array, matrix, or element.
 * @returns Returns the length of the vector or the largest dimension of the array/matrix.
 * @throws If no arguments are provided.
 *
 * @example Length of a 1D array (vector)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(length([3, 5, 6]), 3);
 *
 * ```
 *
 * @example Length of a single element (should be 1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(length(5), 1);
 *
 * ```
 *
 * @example Length of a 2D array (matrix)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(length([[5, 4], [-1, 2]]), 2);
 *
 * ```
 *
 * @example Empty array (should be 0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(length([]), 0);
 *
 * ```
 */
export default function length(
  x: string | number | array<string | number> | matrix<string | number>,
): number {
  if (arguments.length === 0) {
    throw new Error("Not enough input arguments");
  }

  const dims = size(x);
  return Math.max(...dims);
}
