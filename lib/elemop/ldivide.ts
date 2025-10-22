import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { arrayfun, isarray, ismatrix, isnumber } from "../../index.ts";

/**
 * Left array division X .\ Y.
 *
 * Performs element-wise left division of arrays or matrices. For scalar inputs, performs standard division.
 *
 * @param x The divisor, can be a number, array, or matrix
 * @param y The dividend, can be a number, array, or matrix
 * @returns The result of element-wise left division y ./ x
 * @throws If the input dimensions do not agree or if no arguments are provided
 *
 * @example Divide two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ldivide(2, 6), 3);
 *
 * ```
 *
 * @example Element-wise division of arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ldivide([2, 4, 8], [6, 8, 16]), [3, 2, 2]);
 *
 * ```
 *
 * @example Divide array by scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ldivide(2, [6, 8, 10]), [3, 4, 5]);
 *
 * ```
 *
 * @example Element-wise division of matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ldivide([[2, 4], [6, 8]], [[6, 8], [12, 16]]), [[3, 2], [2, 2]]);
 * ```
 */
export default function ldivide(x: number, y: number): number;
export default function ldivide(x: number, y: array): array;
export default function ldivide(x: array, y: number): array;
export default function ldivide(x: array, y: array): array;
export default function ldivide(x: number, y: matrix): matrix;
export default function ldivide(x: matrix, y: number): matrix;
export default function ldivide(x: matrix, y: matrix): matrix;
export default function ldivide(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (isnumber(x) && isnumber(y)) {
    return y / x;
  }

  return handleLeftDivision(x, y);
}

/**
 * Handle left division where at least one operand is not a number.
 */
function handleLeftDivision(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (isnumber(x)) {
    return arrayfun(y, (val: number) => val / (x as number));
  }

  if (isnumber(y)) {
    return arrayfun(x, (val: number) => y / val);
  }

  if (isarray(x) && isarray(y)) {
    return elementwiseArrayDivision(x as array, y as array);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return elementwiseMatrixDivision(x as matrix, y as matrix);
  }

  throw new Error("Invalid input types");
}

/**
 * Element-wise division of two arrays.
 */
function elementwiseArrayDivision(x: array, y: array): array {
  if (x.length !== y.length) {
    throw new Error("Arrays must have the same length");
  }
  return x.map((val: number, i: number) => y[i] / val);
}

/**
 * Element-wise division of two matrices.
 */
function elementwiseMatrixDivision(x: matrix, y: matrix): matrix {
  if (x.length !== y.length || x[0].length !== y[0].length) {
    throw new Error("Matrices must have the same dimensions");
  }
  return x.map((row: array, i: number) =>
    row.map((val: number, j: number) => y[i][j] / val)
  );
}
