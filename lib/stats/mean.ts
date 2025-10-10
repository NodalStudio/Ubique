import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  isarray,
  ismatrix,
  isnumber,
  numel,
  rdivide,
  size,
  sum,
} from "../../index.ts";

/**
 * @function mean
 * @summary Average value of array or matrix
 * @description Computes the average (arithmetic mean) of values in an array or matrix.
 * For arrays, returns a single mean value. For matrices, computes mean along specified dimension.
 *
 * @param x Input array, matrix, or number
 * @param dim Dimension along which to calculate (0: rows, 1: columns). Default is 0
 * @returns Mean values
 * @throws {Error} When input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Simple array mean
 * assertEquals(mean([1, 2, 3]), 2);
 *
 * // Example 2: Array with decimals
 * assertEquals(mean([1.5, 2.5, 3.5]), 2.5);
 *
 * // Example 3: Matrix mean along rows
 * assertEquals(mean([[1, 2], [3, 4]]), [1.5, 3.5]);
 * ```
 */
export default function mean(x: number): number;
export default function mean(x: array, dim?: 0 | 1): number;
export default function mean(x: matrix, dim?: 0 | 1): array;
export default function mean(x: array | matrix, dim?: 0 | 1): number | array;
export default function mean(
  x: numarraymatrix,
  dim: 0 | 1 = 0,
): numarraymatrix {
  if (isnumber(x)) {
    return x;
  }

  if (isarray(x)) {
    return sum(x as array, dim) / numel(x as array);
  }

  return rdivide(sum(x as matrix, dim) as array, size(x as matrix)[1 - dim]);
}
