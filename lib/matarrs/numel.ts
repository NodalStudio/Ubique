import type { array, matrix } from "../types.d.ts";

import size from "../matarrs/size.ts";

/**
 * @function numel
 * @summary Number of elements in an array or matrix
 * @description Computes the total number of elements in an array or matrix.
 *
 * @param x The array or matrix to evaluate.
 * @returns The total number of elements in the array or matrix.
 * @throws If no input is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Number of elements in a vector
 * assertEquals(numel([3, 5, 6]), 3);
 *
 * // Example 2: Number of elements in a matrix
 * assertEquals(numel([[3, 2, 7], [4, 5, 6]]), 6);
 *
 * // Example 3: Number of elements in a 1x1 matrix
 * assertEquals(numel([[42]]), 1);
 *
 * // Example 4: Number of elements in an empty array
 * assertEquals(numel([]), 0);

 * ```*/
export default function numel(x: array | matrix): number {
  const [rows, cols] = size(x);
  return rows * cols;
}
