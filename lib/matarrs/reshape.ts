import { flatten, isarray, ismatrix } from "../../index.ts";
import type { array, matrix } from "../types.d.ts";

/**
 * Reshape an array or matrix into a new matrix of given dimensions.
 *
 * Rearranges elements of an array or matrix into a new shape while preserving order.
 *
 * @param x The array or matrix to reshape.
 * @param m Number of rows for the new matrix.
 * @param n Number of columns for the new matrix.
 * @param flag Flag (0: row-wise, 1: column-wise). Defaults to 0.
 * @returns The reshaped matrix.
 * @throws If dimensions are invalid or inconsistent.
 *
 * @example
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * // Example 1: Reshape a row vector into a column vector
 * assertEquals(reshape([5, 6, 3], 3, 1), [[5], [6], [3]]);
 *
 * // Example 2: Reshape a column vector into a row vector
 * assertEquals(reshape([5, 6, 3], 1, 3), [[5, 6, 3]]);
 *
 * // Example 3: Reshape a 2x3 matrix into a 3x2 matrix (row-wise)
 * assertEquals(reshape([[-1, 3, -1], [4, 5, 9]], 3, 2), [[-1, 3], [-1, 4], [5, 9]]);
 *
 * // Example 4: Reshape a 2x3 matrix into a 3x2 matrix (column-wise)
 * assertEquals(reshape([[-1, 3, -1], [4, 5, 9]], 3, 2, 1), [[-1, 4], [3, 5], [-1, 9]]);
 *
 * // Example 5: Reshape into a single-column matrix
 * assertEquals(reshape([[-1, 3, -1], [4, 5, 9]], 6, 1), [[-1], [3], [-1], [4], [5], [9]]);
 *
 * // Example 6: Reshape into a single-column matrix (column-wise)
 * assertEquals(reshape([[-1, 3, -1], [4, 5, 9]], 6, 1, 1), [[-1], [4], [3], [5], [-1], [9]]);

 * ```*/
export default function reshape(
  x: array | matrix,
  m: number,
  n: number,
  flag: 0 | 1 = 0,
): matrix {
  const matrix = toMatrix(x);
  const originalSize = matrix.length * matrix[0].length;
  const newSize = m * n;

  if (originalSize !== newSize) {
    throw new Error("Total number of elements must be the same");
  }

  const flattened = flatten(matrix, flag) as number[];

  return Array.from(
    { length: m },
    (_, i) => flattened.slice(i * n, (i + 1) * n),
  );
}

function toMatrix(x: array | matrix): matrix {
  if (ismatrix(x)) {
    return x;
  }

  if (isarray(x)) {
    return [x];
  }

  throw new Error("Input must be an array or matrix");
}
