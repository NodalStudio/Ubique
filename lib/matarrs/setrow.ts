import type { array, matrix } from "../types.d.ts";

/**
 * @function setrow
 * @summary Set a row of a matrix.
 * @description Replaces the values of row `n` in a matrix with a given row vector.
 *
 * @param x Row vector (1xN) to insert.
 * @param mat Matrix (MxN) in which to set the row.
 * @param n Row index (0-based).
 * @returns A new matrix with the updated row.
 * @throws When the row index is out of bounds or the vector length mismatches the number of columns.
 *
 * @example
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * // Example 1: Replace the first row of a matrix
 * assertEquals(setrow([2, 0, -2], [[5, 6, 5], [7, 8, -1]], 0), [
 *   [2, 0, -2],
 *   [7, 8, -1]
 * ]);
 *
 * // Example 2: Replace the second row of a matrix
 * assertEquals(setrow([9, 21, 57], [[5, 6, 5], [7, 8, -1]], 1), [
 *   [5, 6, 5],
 *   [9, 21, 57]
 * ]);
 *
 * // Example 3: Row vector length mismatch error
 * assertThrows(() => setrow([1, 2], [[4, 5, 6], [7, 8, 9]], 1), "Row vector length must match the number of matrix columns.");
 *
 * // Example 4: Row index out of bounds error
 * assertThrows(() => setrow([1, 2, 3], [[4, 5, 6], [7, 8, 9]], 2), "Row index must be an integer between 0 and M-1.");
 * ```
 */
export default function setrow(x: array, mat: matrix, n: number): matrix {
  if (!Number.isInteger(n) || n < 0 || n >= mat.length) {
    throw new Error("Row index must be an integer between 0 and M-1.");
  }

  const columnCount = mat[0]?.length ?? 0;

  if (x.length !== columnCount) {
    throw new Error(
      "Row vector length must match the number of matrix columns.",
    );
  }

  const replacementRow = [...x];

  return mat.map((row, i) => (i === n ? replacementRow : row));
}
