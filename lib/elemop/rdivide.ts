import type { array, matrix, numarraymatrix } from "../types.d.ts";

import {
  arrayfun,
  getrow,
  isarray,
  ismatrix,
  isnumber,
  ncols,
  nrows,
} from "../../index.ts";

/**
 * @function rdivide
 * @summary Right array division X. / Y
 * @description Divides each element of X by the corresponding element of Y. Inputs X and Y must have the same size.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The result of the division
 * @throws {Error} If insufficient arguments are provided or if the input sizes do not match
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Divide two numbers
 * assertEquals(rdivide(5, 6), 0.8333333333333334);
 *
 * // Example 2: Divide a matrix by a scalar
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assertEquals(rdivide(a, 3), [[1.6666666666666667, 2, 1.6666666666666667],
 *  [2.3333333333333335, 2.6666666666666665, -0.3333333333333333]]);
 *
 * // Example 3: Divide a scalar by a vector
 * assertEquals(rdivide(3, [-1, -2, -3]), [-3, -1.5, -1]);
 *
 * // Example 4: Element-wise division of two vectors
 * assertEquals(rdivide([5, 6, 7], [-1, -2, -3]), [-5, -3, -2.3333333333333335]);
 *
 * // Example 5: Element-wise division of two matrices
 * const e = [[9, 5], [6, 1]];
 * const f = [[3, 2], [5, 2]];
 * assertEquals(rdivide(e, f), [[3, 2.5], [1.2, 0.5]]);
 *
 * // Example 6: Divide a matrix by a scalar
 * assertEquals(rdivide(e, 3), [[3, 1.6666666666666667], [2, 0.3333333333333333]]);
 * ```
 */
export default function rdivide(x: number, y: number): number;
export default function rdivide(x: number, y: array): array;
export default function rdivide(x: array, y: number): array;
export default function rdivide(x: array, y: array): array;
export default function rdivide(x: number, y: matrix): matrix;
export default function rdivide(x: matrix, y: number): matrix;
export default function rdivide(x: matrix, y: matrix): matrix;
export default function rdivide(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (isnumber(x)) {
    return divideNumber(x, y);
  }

  if (isnumber(y)) {
    return divideByNumber(x, y);
  }

  if (isarray(x) && isarray(y)) {
    return elementWiseArrayDivision(x as array, y as array);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return elementWiseMatrixDivision(x, y);
  }

  throw new Error("Incompatible types for rdivide");
}

/**
 * @function divideNumber
 * @description Divides a number by an array or matrix, or two numbers
 * @param x The dividend
 * @param y The divisor
 * @returns The result of the division
 */
function divideNumber(x: number, y: numarraymatrix): numarraymatrix {
  if (isnumber(y)) {
    return x / y;
  }

  if (isarray(y)) {
    return arrayfun(y as array, (val: number) => x / val);
  }

  if (ismatrix(y)) {
    return (y as matrix).map((row: array) =>
      arrayfun(row, (val: number) => x / val)
    );
  }

  throw new Error("Incompatible types for divideNumber");
}

/**
 * @function divideByNumber
 * @description Divides an array or matrix by a number
 * @param x The dividend
 * @param y The divisor
 * @returns The result of the division
 */
function divideByNumber(x: array | matrix, y: number): array | matrix {
  if (isarray(x)) {
    return arrayfun(x as array, (val: number) => val / y);
  }

  if (ismatrix(x)) {
    return (x as matrix).map((row: array) =>
      arrayfun(row, (val: number) => val / y)
    );
  }

  throw new Error("Incompatible types for divideByNumber");
}

/**
 * @function elementWiseArrayDivision
 * @description Performs element-wise division of two arrays
 * @param x The first array
 * @param y The second array
 * @returns The result of element-wise division
 */
function elementWiseArrayDivision(x: array, y: array): array {
  if (x.length !== y.length) {
    throw new Error("Array dimensions must agree");
  }
  return x.map((val: number, i: number) => val / y[i]);
}

/**
 * @function elementWiseMatrixDivision
 * @description Performs element-wise division of two matrices
 * @param x The first matrix
 * @param y The second matrix
 * @returns The result of element-wise division
 */
function elementWiseMatrixDivision(x: matrix, y: matrix): matrix {
  if (nrows(x) !== nrows(y) || ncols(x) !== ncols(y)) {
    throw new Error("Matrix dimensions must agree");
  }
  return x.map((xrow: array, i: number) =>
    elementWiseArrayDivision(xrow, getrow(y, i))
  );
}
