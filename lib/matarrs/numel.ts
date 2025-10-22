import type { array, matrix } from "../types.d.ts";

import size from "../matarrs/size.ts";

/**
 * Number of elements in an array or matrix.
 *
 * Computes the total number of elements in an array or matrix.
 *
 * @param x The array or matrix to evaluate.
 * @returns The total number of elements in the array or matrix.
 * @throws If no input is provided.
 *
 * @example Number of elements in a vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(numel([3, 5, 6]), 3);
 *
 * ```
 *
 * @example Number of elements in a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(numel([[3, 2, 7], [4, 5, 6]]), 6);
 *
 * ```
 *
 * @example Number of elements in a 1x1 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(numel([[42]]), 1);
 *
 * ```
 *
 * @example Number of elements in an empty array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(numel([]), 0);
 *
 * ```
 */
export default function numel(x: array | matrix): number {
  const [rows, cols] = size(x);
  return rows * cols;
}
