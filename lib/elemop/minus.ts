import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { arrayfun, isarray, ismatrix, isnumber } from "../../index.ts";

/**
 * @function minus
 * @summary Subtraction X - Y
 * @description Subtracts two numbers, arrays, or matrices element-wise. Handles mixed inputs of scalars, arrays, and matrices.
 *
 * @param x The first operand, can be a number, array, or matrix.
 * @param y The second operand, can be a number, array, or matrix.
 * @returns The result of subtracting `y` from `x`.
 * @throws {Error} If the input dimensions do not agree or if no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Subtract two numbers
 * assertEquals(minus(5, 3), 2);
 *
 * // Example 2: Subtract two arrays element-wise
 * assertEquals(minus([5, 6, 4], [3, 1, 2]), [2, 5, 2]);
 *
 * // Example 3: Subtract a number from each element of an array
 * assertEquals(minus([15, 16, 14], 10), [5, 6, 4]);
 *
 * // Example 4: Subtract a number from each element of a matrix
 * assertEquals(minus([[15, 16], [13, 14]], 10), [[5, 6], [3, 4]]);
 *
 * // Example 5: Subtract two matrices element-wise
 * assertEquals(minus([[7, 9], [4, 6]], [[2, 3], [1, 2]]), [[5, 6], [3, 4]]);
 * ```
 */
export default function minus(x: number, y: number): number;
export default function minus(x: number, y: array): array;
export default function minus(x: array, y: number): array;
export default function minus(x: array, y: array): array;
export default function minus(x: number, y: matrix): matrix;
export default function minus(x: matrix, y: number): matrix;
export default function minus(x: matrix, y: matrix): matrix;
export default function minus(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (isnumber(x) && isnumber(y)) {
    return x - y;
  }

  return handleMinusOperation(x, y);
}

/**
 * Handle subtraction where at least one operand is not a number
 */
function handleMinusOperation(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (isnumber(x)) {
    return arrayfun(y, (val: number) => (x as number) - val);
  }

  if (isnumber(y)) {
    return arrayfun(x, (val: number) => val - (y as number));
  }

  if (isarray(x) && isarray(y)) {
    return elementwiseArraySubtraction(x as array, y as array);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return elementwiseMatrixSubtraction(x as matrix, y as matrix);
  }

  throw new Error("Invalid input types");
}

/**
 * Element-wise subtraction of two arrays
 */
function elementwiseArraySubtraction(x: array, y: array): array {
  if (x.length !== y.length) {
    throw new Error("Arrays must have the same length");
  }
  return x.map((val: number, i: number) => val - y[i]);
}

/**
 * Element-wise subtraction of two matrices
 */
function elementwiseMatrixSubtraction(x: matrix, y: matrix): matrix {
  if (x.length !== y.length || x[0].length !== y[0].length) {
    throw new Error("Matrices must have the same dimensions");
  }
  return x.map((row: array, i: number) =>
    row.map((val: number, j: number) => val - y[i][j])
  );
}
