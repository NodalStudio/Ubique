import type { array, matrix, numarraymatrix } from "../types.d.ts";

import {
  inv,
  isnumber,
  issquare,
  mtimes,
  ncols,
  nrows,
  rdivide,
} from "../../index.ts";

/**
 * Matrix right division X / Y.
 *
 * Performs matrix right division X / Y. If X is MxN and Y is NxN, it returns a matrix MxN. The operation multiplies X with the inverse of Y. Y must be a square matrix.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The result of the division
 * @throws If the input dimensions are incompatible or if Y is not a square matrix when required
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Scalar division (5/6)
 * assertEquals(mrdivide(5, 6), 0.8333333333333334);
 *
 * // Example 2: Array divided by scalar ([5,6,3]/6)
 * assertEquals(mrdivide([5, 6, 3], 6), [0.8333333333333334, 1, 0.5]);
 *
 * // Example 3: Matrix divided by scalar ([[9,5],[6,1]]/5)
 * assertEquals(mrdivide([[9, 5], [6, 1]], 5), [[1.8, 1], [1.2, 0.2]]);
 *
 * // Example 4: Matrix right division with square matrix ([[9,5],[6,1]]/[[3,2],[5,2]])
 * assertEquals(mrdivide([[9, 5], [6, 1]], [[3, 2], [5, 2]]),
 *   [[1.75, 0.7500000000000004], [-1.75, 2.25]]);
 *
 * // Example 5: Matrix right division with non-square matrices
 * // [[5,6,5],[7,8,-1]] / [[1,1,-1],[1,-2,3],[2,3,1]]
 * assertEquals(mrdivide([[5, 6, 5], [7, 8, -1]], [[1, 1, -1], [1, -2, 3], [2, 3, 1]]),
 *   [[-0.7692307692307696, 0.5384615384615385, 2.615384615384615],
 *    [3.384615384615384, 0.230769230769231, 1.6923076923076918]]);
 * ```
 */
export default function mrdivide(x: number, y: number): number;
export default function mrdivide(x: array, y: number): array;
export default function mrdivide(x: matrix, y: number): matrix;
export default function mrdivide(x: array, y: array): array;
export default function mrdivide(x: matrix, y: matrix): matrix;
export default function mrdivide(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (isnumber(x) && isnumber(y)) {
    return x / y;
  }

  if (isnumber(y)) {
    return rdivide(x as matrix, y);
  }

  if (issquare(y)) {
    if (ncols(x as array | matrix) !== nrows(y as array | matrix)) {
      throw new Error("matrix dimensions mismatch");
    }
    return mtimes(x as matrix, inv(y as matrix));
  }

  throw new Error("second argument must be square");
}
