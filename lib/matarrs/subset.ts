import type { array, matrix } from "../types.d.ts";

import isnumber from "../datatype/isnumber.ts";
import ismatrix from "../datatype/ismatrix.ts";
import colon from "./colon.ts";
import nrows from "./nrows.ts";
import ncols from "./ncols.ts";
import zeros from "./zeros.ts";
import squeeze from "./squeeze.ts";
import isarray from "../datatype/isarray.ts";
import isundefined from "../datatype/isundefined.ts";

/**
 * Extract a subset of an array or matrix based on row and column indices.
 *
 * Extracts a subset from an array or matrix based on specified row and column indices.
 * If the indices are not provided, the entire array or matrix is returned. Use ':' to select all rows or columns.
 *
 * @param m The input array or matrix.
 * @param r The row index or ':' for all rows.
 * @param c The column index or ':' for all columns.
 * @returns The extracted subset of the array or matrix.
 * @throws If the input arguments are invalid.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Extract a single element from an array
 * const c = [5, 6, 3];
 * assertEquals(subset(c, 1), 6);
 *
 * // Example 2: Extract multiple elements from an array
 * assertEquals(subset(c, [1, 2]), [6, 3]);
 *
 * // Example 3: Extract the last element from an array
 * assertEquals(subset(c, c.length - 1), 3);
 *
 * // Example 4: Extract a single element from a matrix
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assertEquals(subset(a, 0, 1), [[6]]);
 *
 * // Example 5: Extract a submatrix
 * assertEquals(subset(a, [0, 1], [1, 2]), [[6, 5], [8, -1]]);
 *
 * // Example 6: Extract an entire row
 * assertEquals(subset(a, 0, ':'), [[5, 6, 5]]);
 *
 * // Example 7: Extract an entire column
 * assertEquals(subset(a, ':', 0), [[5], [7]]);

 * ```*/
// No index - return as-is
export default function subset(m: array): array;
export default function subset(m: matrix): matrix;

// Array subsetting - single element
export default function subset(m: array, r: number): number;

// Array subsetting - multiple elements
export default function subset(m: array, r: array): array;

// Matrix subsetting - returns matrix or array after squeeze
export default function subset(
  m: matrix,
  r: number | array | string,
  c: number | array | string,
): array | matrix;

// Union type overload for when type is not narrowed
export default function subset(
  m: array | matrix,
  r?: number | array | string,
  c?: number | array | string,
): number | array | matrix;

// Implementation signature
export default function subset(
  m: array | matrix,
  r?: number | array | string,
  c?: number | array | string,
): number | array | matrix {
  if (isundefined(r) && isundefined(c)) {
    return m;
  }

  if (isundefined(c) && !isundefined(r)) {
    return handleArraySubset(m, r);
  }

  return handleMatrixSubset(m as matrix, r!, c!);
}

/**
 * Handles subset extraction for arrays (1D).
 * @param array The input array.
 * @param indices The indices to extract.
 * @returns The extracted subset.
 */
function handleArraySubset(
  array: number | array | matrix,
  indices: number | array | string,
): number | array {
  if (isnumber(array)) {
    return array;
  }

  if (isarray(array)) {
    if (isnumber(indices)) {
      return array[indices];
    } else {
      return (indices as array).map((index: number) => (array as array)[index]);
    }
  }

  throw new Error("input must be an array");
}

/**
 * Handles subset extraction for matrices (2D).
 * @param matrix The input matrix.
 * @param rows The row indices or ':' for all rows.
 * @param cols The column indices or ':' for all columns.
 * @returns The extracted subset of the matrix.
 * @throws If the input is not a matrix.
 */
function handleMatrixSubset(
  matrix: matrix,
  rows: number | array | string,
  cols: number | array | string,
): array | matrix {
  if (!ismatrix(matrix)) {
    throw new Error("input must be a matrix");
  }

  if (rows === ":") {
    rows = colon(0, nrows(matrix) - 1);
  }

  if (cols === ":") {
    cols = colon(0, ncols(matrix) - 1);
  }

  if (isnumber(rows)) {
    rows = [rows];
  }

  if (isnumber(cols)) {
    cols = [cols];
  }

  const rowsArr = rows as array;
  const colsArr = cols as array;
  const result = zeros(rowsArr.length, colsArr.length);

  for (let i = 0; i < rowsArr.length; i++) {
    for (let j = 0; j < colsArr.length; j++) {
      result[i][j] = matrix[rowsArr[i]][colsArr[j]];
    }
  }

  return squeeze(result) as array | matrix;
}
