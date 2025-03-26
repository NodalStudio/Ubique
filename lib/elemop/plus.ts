import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { isnumber, isarray, ismatrix, arrayfun } from "../../index.ts";

/**
 * @function plus
 * @summary Addition X + Y
 * @description Adds two numbers, arrays, or matrices element-wise. Handles mixed inputs of scalars, arrays, and matrices.
 *
 * @param x The first operand, can be a number, array, or matrix.
 * @param y The second operand, can be a number, array, or matrix.
 * @returns The result of adding `x` and `y`.
 * @throws {Error} If the input dimensions do not agree or if no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Add two numbers
 * assertEquals(plus(5, 6), 11);
 *
 * // Example 2: Add two arrays element-wise
 * assertEquals(plus([5, 6, 4], [3, -1, 0]), [8, 5, 4]);
 *
 * // Example 3: Add a number to each element of an array
 * assertEquals(plus([5, 6, 4], 10), [15, 16, 14]);
 *
 * // Example 4: Add a number to each element of a matrix
 * assertEquals(plus(10, [[5, 6], [3, 4]]), [[15, 16], [13, 14]]);
 *
 * // Example 5: Add two matrices element-wise
 * assertEquals(plus([[5, 6], [3, 4]], [[2, 3], [1, 2]]), [[7, 9], [4, 6]]);
 * ```
 */
export default function plus(x: number, y: number): number;
export default function plus(x: number, y: array): array;
export default function plus(x: array, y: number): array;
export default function plus(x: array, y: array): array;
export default function plus(x: number, y: matrix): matrix;
export default function plus(x: matrix, y: number): matrix;
export default function plus(x: matrix, y: matrix): matrix;
export default function plus(
  x: numarraymatrix,
  y: numarraymatrix
): numarraymatrix {
  if (isnumber(x) && isnumber(y)) {
    return x + y;
  }

  return handlePlusOperation(x, y);
}

/**
 * Handle addition where at least one operand is not a number
 */
function handlePlusOperation(
  x: numarraymatrix,
  y: numarraymatrix
): numarraymatrix {
  if (isnumber(x)) {
    return arrayfun(y, (val: number) => x as number + val);
  }

  if (isnumber(y)) {
    return arrayfun(x, (val: number) => val + y as number);
  }

  if (isarray(x) && isarray(y)) {
    return elementwiseArrayAddition(x as array, y as array);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return elementwiseMatrixAddition(x as matrix, y as matrix);
  }

  throw new Error("Invalid input types");
}

/**
 * Element-wise addition of two arrays
 */
function elementwiseArrayAddition(x: array, y: array): array {
  if (x.length !== y.length) {
    throw new Error("Arrays must have the same length");
  }
  return x.map((val: number, i: number) => val + y[i]);
}

/**
 * Element-wise addition of two matrices
 */
function elementwiseMatrixAddition(x: matrix, y: matrix): matrix {
  if (x.length !== y.length || x[0].length !== y[0].length) {
    throw new Error("Matrices must have the same dimensions");
  }
  return x.map((row: array, i: number) =>
    row.map((val: number, j: number) => val + y[i][j])
  );
}
