import isnumber from "../datatype/isnumber.ts";
import isarray from "../datatype/isarray.ts";
import ismatrix from "../datatype/ismatrix.ts";
import vectorfun from "../datatype/vectorfun.ts";
import mergesort from "./mergesort.ts";
import type { array, matrix } from "../types.d.ts";

/**
 * Sorts an array or matrix in ascending or descending order.
 *
 * If input is a 1D array, it is sorted normally. If input is a matrix, sorting can be done along rows or columns.
 *
 * @param x The array or matrix to sort.
 * @param mode Sorting order: `'ascend'` or `'descend'`. Defaults to `'ascend'`.
 * @param dim Dimension along which to sort (0: rows, 1: columns). Defaults to 1.
 * @returns The sorted array or matrix.
 * @throws If input is invalid.
 *
 * @example
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * // Example 1: Sort an array in ascending order
 * assertEquals(sort([0, 5, -1, 3, -4, 9, 0], 'ascend'), [-4, -1, 0, 0, 3, 5, 9]);
 *
 * // Example 2: Sort an array in descending order
 * assertEquals(sort([0, 5, -1, 3, -4, 9, 0], 'descend'), [9, 5, 3, 0, 0, -1, -4]);
 *
 * // Example 3: Sort rows in descending order
 * assertEquals(sort([[-1, 3, -1], [4, 5, 9]], 'descend', 1), [
 *   [4, -1],
 *   [5, 3],
 *   [9, -1]
 * ]);
 *
 * // Example 4: Sort columns in ascending order
 * assertEquals(sort([[-1, 3, -1], [4, 5, 9]], 'ascend', 0), [
 *   [-1, -1, 3],
 *   [4, 5, 9]
 * ]);
 *
 * // Example 5: Invalid sorting mode
 * assertThrows(() => sort([1, 2, 3], 'wrong'), Error, 'sorting must be "ascend" or "descend"');
 *
 * // Example 6: Sort a single number (should return the number itself)
 * assertEquals(sort(5), 5);

 * ```*/
export default function sort(x: number, mode?: string, dim?: number): number;
export default function sort(x: array, mode?: string, dim?: number): array;
export default function sort(x: matrix, mode?: string, dim?: number): matrix;
export default function sort(
  x: unknown,
  mode: string = "ascend",
  dim: number = 1,
): unknown {
  const _sort = (a: array, mode: string): array => mergesort(a, mode)[0];

  if (isnumber(x)) {
    return x;
  }

  if (isarray(x)) {
    return _sort(x, mode);
  }

  if (!ismatrix(x)) {
    throw new Error("Input must be a number, an array or matrix.");
  }

  return vectorfun(dim as 0 | 1, x, _sort, mode);
}
