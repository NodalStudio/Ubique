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
 * Right array division X. / Y.
 *
 * Divides each element of X by the corresponding element of Y. Inputs X and Y must have the same size.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The result of the division
 * @throws If insufficient arguments are provided or if the input sizes do not match
 *
 * @example Divide two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide(5, 6), 0.8333333333333334);
 *
 * ```
 *
 * @example Divide a matrix by a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assertEquals(rdivide(a, 3), [[1.6666666666666667, 2, 1.6666666666666667],
 *  [2.3333333333333335, 2.6666666666666665, -0.3333333333333333]]);
 *
 * ```
 *
 * @example Divide a scalar by a vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide(3, [-1, -2, -3]), [-3, -1.5, -1]);
 *
 * ```
 *
 * @example Element-wise division of two vectors
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide([5, 6, 7], [-1, -2, -3]), [-5, -3, -2.3333333333333335]);
 *
 * ```
 *
 * @example Element-wise division of two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const e = [[9, 5], [6, 1]];
 * const f = [[3, 2], [5, 2]];
 * assertEquals(rdivide(e, f), [[3, 2.5], [1.2, 0.5]]);
 *
 * ```
 *
 * @example Divide a matrix by a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const e = [[9, 5], [6, 1]];
 *
 * assertEquals(rdivide(e, 3), [[3, 1.6666666666666667], [2, 0.3333333333333333]]);
 * ```
 */
export default function rdivide(x: number, y: number): number;
/**
 * Right array division X. / Y.
 *
 * Divides each element of X by the corresponding element of Y. Inputs X and Y must have the same size.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The result of the division
 * @throws If insufficient arguments are provided or if the input sizes do not match
 *
 * @example Divide two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide(5, 6), 0.8333333333333334);
 *
 * ```
 *
 * @example Divide a matrix by a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assertEquals(rdivide(a, 3), [[1.6666666666666667, 2, 1.6666666666666667],
 *  [2.3333333333333335, 2.6666666666666665, -0.3333333333333333]]);
 *
 * ```
 *
 * @example Divide a scalar by a vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide(3, [-1, -2, -3]), [-3, -1.5, -1]);
 *
 * ```
 *
 * @example Element-wise division of two vectors
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide([5, 6, 7], [-1, -2, -3]), [-5, -3, -2.3333333333333335]);
 *
 * ```
 *
 * @example Element-wise division of two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const e = [[9, 5], [6, 1]];
 * const f = [[3, 2], [5, 2]];
 * assertEquals(rdivide(e, f), [[3, 2.5], [1.2, 0.5]]);
 *
 * ```
 *
 * @example Divide a matrix by a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const e = [[9, 5], [6, 1]];
 *
 * assertEquals(rdivide(e, 3), [[3, 1.6666666666666667], [2, 0.3333333333333333]]);
 * ```
 */
export default function rdivide(x: number, y: array): array;
/**
 * Right array division X. / Y.
 *
 * Divides each element of X by the corresponding element of Y. Inputs X and Y must have the same size.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The result of the division
 * @throws If insufficient arguments are provided or if the input sizes do not match
 *
 * @example Divide two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide(5, 6), 0.8333333333333334);
 *
 * ```
 *
 * @example Divide a matrix by a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assertEquals(rdivide(a, 3), [[1.6666666666666667, 2, 1.6666666666666667],
 *  [2.3333333333333335, 2.6666666666666665, -0.3333333333333333]]);
 *
 * ```
 *
 * @example Divide a scalar by a vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide(3, [-1, -2, -3]), [-3, -1.5, -1]);
 *
 * ```
 *
 * @example Element-wise division of two vectors
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide([5, 6, 7], [-1, -2, -3]), [-5, -3, -2.3333333333333335]);
 *
 * ```
 *
 * @example Element-wise division of two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const e = [[9, 5], [6, 1]];
 * const f = [[3, 2], [5, 2]];
 * assertEquals(rdivide(e, f), [[3, 2.5], [1.2, 0.5]]);
 *
 * ```
 *
 * @example Divide a matrix by a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const e = [[9, 5], [6, 1]];
 *
 * assertEquals(rdivide(e, 3), [[3, 1.6666666666666667], [2, 0.3333333333333333]]);
 * ```
 */
export default function rdivide(x: array, y: number): array;
/**
 * Right array division X. / Y.
 *
 * Divides each element of X by the corresponding element of Y. Inputs X and Y must have the same size.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The result of the division
 * @throws If insufficient arguments are provided or if the input sizes do not match
 *
 * @example Divide two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide(5, 6), 0.8333333333333334);
 *
 * ```
 *
 * @example Divide a matrix by a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assertEquals(rdivide(a, 3), [[1.6666666666666667, 2, 1.6666666666666667],
 *  [2.3333333333333335, 2.6666666666666665, -0.3333333333333333]]);
 *
 * ```
 *
 * @example Divide a scalar by a vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide(3, [-1, -2, -3]), [-3, -1.5, -1]);
 *
 * ```
 *
 * @example Element-wise division of two vectors
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide([5, 6, 7], [-1, -2, -3]), [-5, -3, -2.3333333333333335]);
 *
 * ```
 *
 * @example Element-wise division of two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const e = [[9, 5], [6, 1]];
 * const f = [[3, 2], [5, 2]];
 * assertEquals(rdivide(e, f), [[3, 2.5], [1.2, 0.5]]);
 *
 * ```
 *
 * @example Divide a matrix by a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const e = [[9, 5], [6, 1]];
 *
 * assertEquals(rdivide(e, 3), [[3, 1.6666666666666667], [2, 0.3333333333333333]]);
 * ```
 */
export default function rdivide(x: array, y: array): array;
/**
 * Right array division X. / Y.
 *
 * Divides each element of X by the corresponding element of Y. Inputs X and Y must have the same size.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The result of the division
 * @throws If insufficient arguments are provided or if the input sizes do not match
 *
 * @example Divide two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide(5, 6), 0.8333333333333334);
 *
 * ```
 *
 * @example Divide a matrix by a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assertEquals(rdivide(a, 3), [[1.6666666666666667, 2, 1.6666666666666667],
 *  [2.3333333333333335, 2.6666666666666665, -0.3333333333333333]]);
 *
 * ```
 *
 * @example Divide a scalar by a vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide(3, [-1, -2, -3]), [-3, -1.5, -1]);
 *
 * ```
 *
 * @example Element-wise division of two vectors
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide([5, 6, 7], [-1, -2, -3]), [-5, -3, -2.3333333333333335]);
 *
 * ```
 *
 * @example Element-wise division of two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const e = [[9, 5], [6, 1]];
 * const f = [[3, 2], [5, 2]];
 * assertEquals(rdivide(e, f), [[3, 2.5], [1.2, 0.5]]);
 *
 * ```
 *
 * @example Divide a matrix by a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const e = [[9, 5], [6, 1]];
 *
 * assertEquals(rdivide(e, 3), [[3, 1.6666666666666667], [2, 0.3333333333333333]]);
 * ```
 */
export default function rdivide(x: number, y: matrix): matrix;
/**
 * Right array division X. / Y.
 *
 * Divides each element of X by the corresponding element of Y. Inputs X and Y must have the same size.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The result of the division
 * @throws If insufficient arguments are provided or if the input sizes do not match
 *
 * @example Divide two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide(5, 6), 0.8333333333333334);
 *
 * ```
 *
 * @example Divide a matrix by a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assertEquals(rdivide(a, 3), [[1.6666666666666667, 2, 1.6666666666666667],
 *  [2.3333333333333335, 2.6666666666666665, -0.3333333333333333]]);
 *
 * ```
 *
 * @example Divide a scalar by a vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide(3, [-1, -2, -3]), [-3, -1.5, -1]);
 *
 * ```
 *
 * @example Element-wise division of two vectors
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide([5, 6, 7], [-1, -2, -3]), [-5, -3, -2.3333333333333335]);
 *
 * ```
 *
 * @example Element-wise division of two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const e = [[9, 5], [6, 1]];
 * const f = [[3, 2], [5, 2]];
 * assertEquals(rdivide(e, f), [[3, 2.5], [1.2, 0.5]]);
 *
 * ```
 *
 * @example Divide a matrix by a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const e = [[9, 5], [6, 1]];
 *
 * assertEquals(rdivide(e, 3), [[3, 1.6666666666666667], [2, 0.3333333333333333]]);
 * ```
 */
export default function rdivide(x: matrix, y: number): matrix;
/**
 * Right array division X. / Y.
 *
 * Divides each element of X by the corresponding element of Y. Inputs X and Y must have the same size.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The result of the division
 * @throws If insufficient arguments are provided or if the input sizes do not match
 *
 * @example Divide two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide(5, 6), 0.8333333333333334);
 *
 * ```
 *
 * @example Divide a matrix by a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assertEquals(rdivide(a, 3), [[1.6666666666666667, 2, 1.6666666666666667],
 *  [2.3333333333333335, 2.6666666666666665, -0.3333333333333333]]);
 *
 * ```
 *
 * @example Divide a scalar by a vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide(3, [-1, -2, -3]), [-3, -1.5, -1]);
 *
 * ```
 *
 * @example Element-wise division of two vectors
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide([5, 6, 7], [-1, -2, -3]), [-5, -3, -2.3333333333333335]);
 *
 * ```
 *
 * @example Element-wise division of two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const e = [[9, 5], [6, 1]];
 * const f = [[3, 2], [5, 2]];
 * assertEquals(rdivide(e, f), [[3, 2.5], [1.2, 0.5]]);
 *
 * ```
 *
 * @example Divide a matrix by a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const e = [[9, 5], [6, 1]];
 *
 * assertEquals(rdivide(e, 3), [[3, 1.6666666666666667], [2, 0.3333333333333333]]);
 * ```
 */
export default function rdivide(x: matrix, y: matrix): matrix;
/**
 * Right array division X. / Y.
 *
 * Divides each element of X by the corresponding element of Y. Inputs X and Y must have the same size.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The result of the division
 * @throws If insufficient arguments are provided or if the input sizes do not match
 *
 * @example Divide two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide(5, 6), 0.8333333333333334);
 *
 * ```
 *
 * @example Divide a matrix by a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assertEquals(rdivide(a, 3), [[1.6666666666666667, 2, 1.6666666666666667],
 *  [2.3333333333333335, 2.6666666666666665, -0.3333333333333333]]);
 *
 * ```
 *
 * @example Divide a scalar by a vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide(3, [-1, -2, -3]), [-3, -1.5, -1]);
 *
 * ```
 *
 * @example Element-wise division of two vectors
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(rdivide([5, 6, 7], [-1, -2, -3]), [-5, -3, -2.3333333333333335]);
 *
 * ```
 *
 * @example Element-wise division of two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const e = [[9, 5], [6, 1]];
 * const f = [[3, 2], [5, 2]];
 * assertEquals(rdivide(e, f), [[3, 2.5], [1.2, 0.5]]);
 *
 * ```
 *
 * @example Divide a matrix by a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const e = [[9, 5], [6, 1]];
 *
 * assertEquals(rdivide(e, 3), [[3, 1.6666666666666667], [2, 0.3333333333333333]]);
 * ```
 */
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
 * Divides a number by an array or matrix, or two numbers.
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
 * Divides an array or matrix by a number.
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
 * Performs element-wise division of two arrays.
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
 * Performs element-wise division of two matrices.
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
