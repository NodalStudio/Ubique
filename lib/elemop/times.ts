import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { arrayfun, getrow, isarray, ismatrix, isnumber } from "../../index.ts";

/**
 * @function times
 * @summary Element-wise multiplication of arrays, matrices, or numbers
 * @description Performs element-by-element multiplication. X and Y must have the same dimensions unless one is a number.
 *
 * @param x The first operand
 * @param y The second operand
 * @returns The result of element-wise multiplication
 * @throws {Error} If no arguments are provided or if the input dimensions do not match
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Multiply two numbers
 * assertEquals(times(5, 6), 30);
 *
 * // Example 2: Element-wise multiplication of two vectors
 * assertEquals(times([5, 6, 4], [3, -1, 0]), [15, -6, 0]);
 *
 * // Example 3: Multiply a number with each element of an array
 * assertEquals(times([5, 6, 4], 10), [50, 60, 40]);
 *
 * // Example 4: Element-wise multiplication of two matrices
 * assertEquals(times([[5, 6], [3, 4]], [[2, 3], [1, 2]]), [[10, 18], [3, 8]]);
 *
 * // Example 5: Multiply a number with each element of a matrix
 * assertEquals(times(2, [[1, 2], [3, 4]]), [[2, 4], [6, 8]]);
 * ```
 */
export default function times(x: number, y: number): number;
export default function times(x: number, y: array): array;
export default function times(x: array, y: number): array;
export default function times(x: array, y: array): array;
export default function times(x: number, y: matrix): matrix;
export default function times(x: matrix, y: number): matrix;
export default function times(x: matrix, y: matrix): matrix;
export default function times(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  if (isnumber(x) && isnumber(y)) {
    return x * y;
  }

  return handleNumberMultiplication(x, y);
}

/**
 * @function handleNumberMultiplication
 * @description Handles the multiplication when at least one of the operands is a number
 * @param x The first operand
 * @param y The second operand
 * @returns The result of the multiplication
 * @throws {Error} If the input arguments are not valid
 */
function handleNumberMultiplication(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (isnumber(x)) {
    return arrayfun(y, (v: number) => x as number * v);
  }

  if (isnumber(y)) {
    return arrayfun(x, (v: number) => v * (y as number));
  }

  if (isarray(x) && isarray(y)) {
    return elementwiseArrayMultiplication(x as array, y as array);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return elementwiseMatrixMultiplication(x as matrix, y as matrix);
  }

  throw new Error("Invalid input types");
}

/**
 * @function elementwiseArrayMultiplication
 * @description Handles element-wise multiplication for arrays
 * @param x The first array
 * @param y The second array
 * @returns The result of the element-wise multiplication
 */
function elementwiseArrayMultiplication(x: array, y: array): array {
  if (x.length !== y.length) {
    throw new Error("Arrays must have the same length");
  }
  return x.map((v: number, i: number) => v * y[i]);
}

/**
 * @function elementwiseMatrixMultiplication
 * @description Handles element-wise multiplication for matrices
 * @param x The first matrix
 * @param y The second matrix
 * @returns The result of the element-wise multiplication
 */
function elementwiseMatrixMultiplication(x: matrix, y: matrix): matrix {
  if (x.length !== y.length) {
    throw new Error("Matrices must have the same number of rows");
  }
  return x.map((row: array, i: number) =>
    elementwiseArrayMultiplication(row, getrow(y, i))
  );
}
