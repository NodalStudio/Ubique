import type { array, matrix } from "../types.d.ts";

/**
 * Get a column of a matrix.
 *
 * Retrieves a specific column from a 2D matrix. If the input is not a matrix or if the column index is invalid, an error is thrown.
 *
 * @param x The input matrix (2D array) from which to retrieve the column.
 * @param n The column index to retrieve (0-based index).
 * @returns An array representing the specified column of the matrix.

 * @throws Throws an error if the input is not a matrix or if the column index is out of bounds.
 *
 * @example
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * // Example 1: Get the first column
 * assertEquals(getcol([[5, 6, 5], [7, 8, -1]], 0), [5, 7]);
 *
 * // Example 2: Get the third column
 * assertEquals(getcol([[5, 6, 5], [7, 8, -1]], 2), [5, -1]);
 *
 * // Example 3: Invalid column index (out of bounds)
 * assertThrows(() => { getcol([[5, 6, 5], [7, 8, -1]], 3); }, Error, 'Column index must be an integer between 0 and N - 1 columns');

 * ```*/
export default function getcol(x: matrix, n: number): array {
  if (!x || n === undefined) {
    throw new Error("Not enough input arguments");
  }

  if (!Array.isArray(x) || !Array.isArray(x[0])) {
    throw new Error("Input must be a matrix (2D array)");
  }

  const numCols = x[0].length;

  if (!Number.isInteger(n) || n < 0 || n >= numCols) {
    throw new Error(
      "Column index must be an integer between 0 and N - 1 columns",
    );
  }

  return x.map((row) => row[n]);
}
