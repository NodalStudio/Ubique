import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  arrayfun,
  getrow,
  isarray,
  ismatrix,
  isnumber,
  nrows,
} from "../../index.ts";

/**
 * @function times
 * @summary Element-wise multiplication of arrays, matrices, or numbers.
 * @description Performs element-by-element multiplication. X and Y must have the same dimensions unless one is a number.
 *
 * @param x The first operand, can be a number, array, or matrix.
 * @param y The second operand, can be a number, array, or matrix.
 * @returns The result of element-wise multiplication.
 * @throws {Error} If no arguments are provided or if the input dimensions do not match.
 *
 * @example
 * ``` ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Multiply two numbers
 * assertEquals(times(5, 6), 30);
 *
 * // Example 2: Element-wise multiplication of two vectors
 * assertEquals(times([5, 6, 4], [3, -1, 0]), [15, -6, 0]);
 *
 * // Example 3: Multiply a vector by a scalar
 * assertEquals(times([5, 6, 4], 10), [50, 60, 40]);
 *
 * // Example 4: Element-wise multiplication of two matrices
 * assertEquals(times([[5, 6, 5], [7, 8, -1]], [[-1, 3, -1], [4, 5, 9]]), [[-5, 18, -5], [28, 40, -9]]);
 * ```
 */
export default function times(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  if (isnumber(x) || isnumber(y)) {
    return handleNumberMultiplication(x, y);
  }

  if (isarray(x) && isarray(y)) {
    return elementwiseArrayMultiplication(x as array, y as array);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return elementwiseMatrixMultiplication(x, y);
  }

  throw new Error("unknown input arguments");
}

/**
 * @function handleNumberMultiplication
 * @description Handles the multiplication when at least one of the operands is a number.
 * @param {number|array|matrix} x The first operand.
 * @param {number|array|matrix} y The second operand.
 * @returns {number|array|matrix} The result of the multiplication.
 * @throws {Error} If the input arguments are not valid.
 */
function handleNumberMultiplication(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (isnumber(x) && isnumber(y)) {
    return x * y;
  }

  if (isnumber(x)) {
    return arrayfun(y, (val) => x * val);
  }

  if (isnumber(y)) {
    return arrayfun(x, (val) => val * y);
  }

  throw new Error("unknown input arguments");
}

/**
 * @function elementwiseArrayMultiplication
 * @description Handles element-wise multiplication for arrays.
 * @param x The first array.
 * @param y The second array.
 * @returns The result of the element-wise multiplication.
 */
function elementwiseArrayMultiplication(x: array, y: array): array {
  return x.map((val, i) => val * y[i]);
}

/**
 * @function elementwiseMatrixMultiplication
 * @description Handles element-wise multiplication for matrices.
 * @param x The first matrix.
 * @param {matrix} y The second matrix.
 * @returns {matrix} The result of the element-wise multiplication.
 */
function elementwiseMatrixMultiplication(x: matrix, y: matrix): matrix {
  const v = [];
  for (let i = 0; i < nrows(x); i++) {
    const vx = getrow(x, i);
    const vy = getrow(y, i);
    v[i] = elementwiseArrayMultiplication(vx, vy);
  }
  return v;
}
