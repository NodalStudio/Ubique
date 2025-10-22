import type { array, matrix } from "../types.d.ts";

/**
 * Get a row of a matrix.
 *
 * Retrieves a specific row from a 2D matrix. If the input is not a matrix or if the row index is invalid, an error is thrown.
 *
 * @param x The input matrix (2D array) from which to retrieve the row.
 * @param n The row index to retrieve (0-based index).
 * @returns An array representing the specified row of the matrix.

 * @throws Throws an error if the input is not a matrix or if the row index is out of bounds.
 *
 * @example Get the first row
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(getrow([[5, 6, 5], [7, 8, -1]], 0), [5, 6, 5]); // [5, 6, 5]
 *
 * ```
 *
 * @example Get the second row
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(getrow([[5, 6, 5], [7, 8, -1]], 1), [7, 8, -1]); // [7, 8, -1]
 *
 * ```
 *
 * @example Invalid row index (out of bounds)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertThrows(() => { getrow([[5, 6, 5], [7, 8, -1]], 2); }, Error, 'Row index must be an integer between 0 and N - 1 rows');
 *
 * ```
 */
export default function getrow(x: matrix, n: number): array {
  if (!x || n === undefined) {
    throw new Error("Not enough input arguments");
  }

  if (!Array.isArray(x) || !Array.isArray(x[0])) {
    throw new Error("Input must be a matrix (2D array)");
  }

  const numRows = x.length;

  if (!Number.isInteger(n) || n < 0 || n >= numRows) {
    throw new Error("Row index must be an integer between 0 and N - 1 rows");
  }

  return x[n];
}
