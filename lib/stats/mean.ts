import type { array, matrix } from "../types.d.ts";
import { isarray, isnumber, numel, rdivide, size, sum } from "../../index.ts";

/**
 * @function mean
 * @summary Average value of array or matrix
 * @description Computes the average value of an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate (0: row-wise, 1: column-wise, defaults to 0)
 * @returns The mean value(s)
 * @throws {Error} If no input is provided
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Mean of a vector
 * assertEquals(mean([5, 6, 3]), 4.66667);
 *
 * // Example 2: Mean of a matrix along rows (dim=0)
 * assertEquals(mean([[5, 6, 5], [7, 8, -1]]), [5.333333, 4.666667]);
 *
 * // Example 3: Mean of a matrix along columns (dim=1)
 * assertEquals(mean([[5, 6, 5], [7, 8, -1]], 1), [6, 7, 2]);

 * ```*/
export default function mean(x: number): number;
export default function mean(x: array, dim?: 0 | 1): number;
export default function mean(x: matrix, dim?: 0 | 1): array | number;
export default function mean(
  x: number | array | matrix,
  dim: 0 | 1 = 0,
): number | array {
  if (isnumber(x)) {
    return x;
  }

  if (isarray(x)) {
    return sum(x as array, dim) / numel(x as array);
  }

  return rdivide(sum(x as matrix, dim), size(x as matrix)[1 - dim]);
}
