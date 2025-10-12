import type { array, matrix } from "../types.d.ts";

import ncols from "./ncols.ts";
import transpose from "./transpose.ts";

/**
 * Set a column of a matrix.
 *
 * Replaces the values of column `n` in a matrix with a given column vector.
 *
 * @param x Column vector (Mx1) to insert.
 * @param mat Matrix (MxN) in which to set the column.
 * @param n Column index (0-based).
 * @returns A new matrix with the updated column.
 * @throws When the column index is out of bounds or the vector length mismatches the number of rows.
 *
 * @example
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * // Example 1: Replace the first column of a matrix
 * assertEquals(setcol([2, 0], [[5, 6, 5], [7, 8, -1]], 0), [
 *   [2, 6, 5],
 *   [0, 8, -1]
 * ]);
 *
 * // Example 2: Replace the third column of a matrix
 * assertEquals(setcol([9, 21], [[5, 6, 5], [7, 8, -1]], 2), [
 *   [5, 6, 9],
 *   [7, 8, 21]
 * ]);
 *
 * // Example 3: Column vector length mismatch error
 * assertThrows(() => setcol([1, 2, 3], [[4, 5], [6, 7]], 1), "Column vector length must match the number of matrix rows.");
 *
 * // Example 4: Column index out of bounds error
 * assertThrows(() => setcol([1, 2], [[4, 5], [6, 7]], 2), "Column index must be an integer between 0 and N-1.");
 * ```
 */
export default function setcol(x: array, mat: matrix, n: number): matrix {
  if (!Number.isInteger(n) || n < 0 || n >= ncols(mat)) {
    throw new Error("Column index must be an integer between 0 and N-1.");
  }

  const columnVector = transpose(x);

  if (columnVector.length !== mat.length) {
    throw new Error(
      "Column vector length must match the number of matrix rows.",
    );
  }

  return mat.map((row: array, i: number) =>
    row.map((val: number, j: number) => (j === n ? columnVector[i][0] : val))
  );
}
