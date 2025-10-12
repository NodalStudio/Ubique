import type { array, matrix, numarraymatrix } from "../types.d.ts";

import {
  inv,
  isnumber,
  issquare,
  ldivide,
  mtimes,
  ncols,
  nrows,
} from "../../index.ts";

/**
 * @function mldivide
 * @summary Matrix left division X \ Y
 * @description Matrix left division X \ Y. If X is NxN and Y is NxM, then returns a matrix NxM. Y is multiplied by the inverse of X. X must be square.
 *
 * @param y The left matrix or scalar (denominator)
 * @param x The right matrix or scalar (numerator)
 * @returns The result of the division
 * @throws If insufficient arguments are provided or if the matrix dimensions do not match
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Divide two scalars
 * assertEquals(mldivide(5, 6), 6 / 5);
 *
 * // Example 2: Matrix left division
 * assertEquals(mldivide([[9, 5], [6, 1]], [[3, 2], [5, 2]]), [[1.0476190476190477, 0.380952380952381], [-1.285714285714286, -0.2857142857142857]]);
 *
 * // Example 3: Scalar left divides a matrix
 * assertEquals(mldivide(5, [[9, 5], [6, 1]]), [[9 / 5, 5 / 5], [6 / 5, 1 / 5]]);
 *
 * // Example 4: Matrix left division with non-square matrix
 * assertEquals(mldivide([[9, 5], [6, 1]], [[5, 6, 5], [7, 8, -1]]), [[1.4285714285714288, 1.6190476190476193, -0.4761904761904764],
 *  [-1.5714285714285712, -1.7142857142857144, 1.8571428571428574]]);
 * ```
 */
export default function mldivide(y: number, x: number): number;
export default function mldivide(y: number, x: array): array;
export default function mldivide(y: number, x: matrix): matrix;
export default function mldivide(y: array, x: array): array;
export default function mldivide(y: matrix, x: matrix): matrix;
export default function mldivide(
  y: numarraymatrix,
  x: numarraymatrix,
): numarraymatrix {
  if (isnumber(x) && isnumber(y)) {
    return x / y;
  }
  if (isnumber(y)) {
    return ldivide(y as number, x as matrix);
  }

  if (issquare(y as matrix)) {
    if (ncols(y as matrix) !== nrows(x as matrix)) {
      throw new Error("Matrix dimensions mismatch");
    }
    return mtimes(inv(y as matrix), x as matrix);
  }

  throw new Error("Left matrix must be square for matrix left division");
}
