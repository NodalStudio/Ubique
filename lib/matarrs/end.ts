import type { array, matrix } from "../types.d.ts";

import isnumber from "../datatype/isnumber.ts";
import ismatrix from "../datatype/ismatrix.ts";
import isarray from "../datatype/isarray.ts";
import nrows from "../matarrs/nrows.ts";
import ncols from "../matarrs/ncols.ts";

/**
 * Returns the last index in an array or matrix.
 *
 * Returns the last index of an array or matrix. For matrices, you can specify the dimension: -1 for both rows and columns, 0 for rows, and 1 for columns.
 *
 * @param x Input array or matrix.
 * @param dim For matrix: -1 (both), 0 (rows), 1 (columns). Defaults to -1.
 * @returns Last index or indices.
 * @throws If no arguments are provided or if the dimension is invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Last index of a vector
 * assertEquals(end([5, 6, 3]), 2);
 *
 * // Example 2: Last indices of a matrix
 * assertEquals(end([[4, 5, 0], [-1, 2, -3]]), [1, 2]);
 *
 * // Example 3: Last row index of a matrix
 * assertEquals(end([[4, 5, 0], [-1, 2, -3]], 0), 1);
 *
 * // Example 4: Last column index of a matrix
 * assertEquals(end([[4, 5, 0], [-1, 2, -3]], 1), 2);
 *
 * // Example 5: Last index of a number (returns the number itself)
 * assertEquals(end(5), 5);

 * ```*/
export default function end(
  x: number | array | matrix,
  dim: number = -1,
): number | array {
  if (x === undefined) {
    throw new Error("Not enough input arguments");
  }

  if (isnumber(x)) {
    return x;
  }

  if (isarray(x)) {
    return x.length - 1;
  }

  if (ismatrix(x)) {
    if (!Number.isInteger(dim) || dim < -1 || dim > 1) {
      throw new Error("Dimension must be -1, 0, or 1");
    }

    const idx = [nrows(x) - 1, ncols(x) - 1];

    if (dim === -1) {
      return idx;
    }

    return idx[dim];
  }

  throw new Error("Unknown input arguments");
}
