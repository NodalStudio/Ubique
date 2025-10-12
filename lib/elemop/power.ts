import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { arrayfun, isarray, ismatrix, isnumber } from "../../index.ts";

/**
 * Element-wise power X .^ Y.
 *
 * Raises each element of X to the corresponding power in Y. For scalar inputs, performs standard exponentiation.
 *
 * @param x The base, can be a number, array, or matrix
 * @param y The exponent, can be a number, array, or matrix
 * @returns The result of element-wise exponentiation x .^ y
 * @throws If the input dimensions do not agree or if no arguments are provided
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Power of two numbers
 * assertEquals(power(2, 3), 8);
 *
 * // Example 2: Element-wise power of arrays
 * assertEquals(power([2, 3, 4], [2, 2, 2]), [4, 9, 16]);
 *
 * // Example 3: Array to scalar power
 * assertEquals(power([2, 3, 4], 2), [4, 9, 16]);
 *
 * // Example 4: Element-wise power of matrices
 * assertEquals(power([[2, 3], [4, 5]], [[2, 2], [2, 2]]), [[4, 9], [16, 25]]);
 * ```
 */
export default function power(x: number, y: number): number;
export default function power(x: number, y: array): array;
export default function power(x: array, y: number): array;
export default function power(x: array, y: array): array;
export default function power(x: number, y: matrix): matrix;
export default function power(x: matrix, y: number): matrix;
export default function power(x: matrix, y: matrix): matrix;
export default function power(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (isnumber(x) && isnumber(y)) {
    return Math.pow(x, y);
  }

  return handlePowerOperation(x, y);
}

/**
 * Handle power operation where at least one operand is not a number.
 */
function handlePowerOperation(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (isnumber(x)) {
    return arrayfun(y, (val: number) => Math.pow(x as number, val));
  }

  if (isnumber(y)) {
    return arrayfun(x, (val: number) => Math.pow(val, y as number));
  }

  if (isarray(x) && isarray(y)) {
    return elementwiseArrayPower(x as array, y as array);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return elementwiseMatrixPower(x as matrix, y as matrix);
  }

  throw new Error("Invalid input types");
}

/**
 * Element-wise power of two arrays.
 */
function elementwiseArrayPower(x: array, y: array): array {
  if (x.length !== y.length) {
    throw new Error("Arrays must have the same length");
  }
  return x.map((val: number, i: number) => Math.pow(val, y[i]));
}

/**
 * Element-wise power of two matrices.
 */
function elementwiseMatrixPower(x: matrix, y: matrix): matrix {
  if (x.length !== y.length || x[0].length !== y[0].length) {
    throw new Error("Matrices must have the same dimensions");
  }
  return x.map((row: array, i: number) =>
    row.map((val: number, j: number) => Math.pow(val, y[i][j]))
  );
}
