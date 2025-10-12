import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { isarray, ismatrix, isnumber } from "../../index.ts";

/**
 * Less than or equal comparison X <= Y.
 *
 * Compares two inputs element-wise, returning true where elements in X are less than or equal to corresponding elements in Y.
 *
 * @param x First operand for comparison
 * @param y Second operand for comparison
 * @returns The result of the comparison
 * @throws If the input dimensions do not agree or if no arguments are provided
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Comparison between two numbers
 * assertEquals(le(5, 5), true);
 *
 * // Example 2: Comparison between a number and an array
 * assertEquals(le(5, [5, 6, 3]), [true, true, false]);
 *
 * // Example 3: Comparison between a number and a matrix
 * assertEquals(le(5, [[5, 6], [3, 5]]), [[true, true], [false, true]]);
 *
 * // Example 4: Comparison between an array and a number
 * assertEquals(le([5, 6, 3], 5), [true, false, true]);
 *
 * // Example 5: Comparison between a matrix and a number
 * assertEquals(le([[5, 6], [3, 5]], 5), [[true, false], [true, true]]);
 *
 * // Example 6: Comparison between two arrays
 * assertEquals(le([5, 6, 3], [2, 6, 0]), [false, true, false]);
 *
 * // Example 7: Comparison between two matrices
 * assertEquals(le([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[true, true], [true, true]]);
 * ```
 */
export default function le(x: number, y: number): boolean;
export default function le(x: number, y: array): array<boolean>;
export default function le(x: array, y: number): array<boolean>;
export default function le(x: array, y: array): array<boolean>;
export default function le(x: number, y: matrix): matrix<boolean>;
export default function le(x: matrix, y: number): matrix<boolean>;
export default function le(x: matrix, y: matrix): matrix<boolean>;
export default function le(
  x: numarraymatrix,
  y: numarraymatrix,
): boolean | array<boolean> | matrix<boolean> {
  if (isnumber(x) && isnumber(y)) {
    return x <= y;
  }

  if (isarray(x) && isarray(y)) {
    return elementwiseArrayComparison(x as array, y as array);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return elementwiseMatrixComparison(x as matrix, y as matrix);
  }
  if (isnumber(x) && isarray(y)) {
    return (y as array).map((val: number) => x <= val);
  }

  if (isarray(x) && isnumber(y)) {
    return (x as array).map((val: number) => val <= y);
  }

  if (isnumber(x) && ismatrix(y)) {
    return (y as matrix).map((row: array) =>
      row.map((val: number) => x <= val)
    );
  }

  if (ismatrix(x) && isnumber(y)) {
    return (x as matrix).map((row: array) =>
      row.map((val: number) => val <= y)
    );
  }

  throw new Error("Invalid input types");
}

/**
 * Element-wise comparison of two arrays.
 */
function elementwiseArrayComparison(x: array, y: array): boolean[] {
  if (x.length !== y.length) {
    throw new Error("Arrays must have the same length");
  }
  return x.map((val: number, i: number) => val <= y[i]);
}

/**
 * Element-wise comparison of two matrices.
 */
function elementwiseMatrixComparison(x: matrix, y: matrix): boolean[][] {
  if (x.length !== y.length || x[0].length !== y[0].length) {
    throw new Error("Matrices must have the same dimensions");
  }
  return x.map((row: array, i: number) =>
    row.map((val: number, j: number) => val <= y[i][j])
  );
}
