import type { array, matrix } from "../types.d.ts";
import { eye, isnumber, issquare, linsolve, nrows } from "../../index.ts";

/**
 * @function inv
 * @summary Computes the inverse of a square matrix.
 * @description Returns the inverse of a square matrix. If the input is a single number, it returns the reciprocal of that number.
 *
 * @param x A square matrix or a number.
 * @returns The inverse of the matrix or the reciprocal of the number.
 * @throws If no arguments are provided or if the input is not a square matrix.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Inverse of a 2x2 matrix
 * assertEquals(inv([[3, 2], [5, 2]]), [[-0.5, 0.5], [1.25, -0.7499999999999999]]);
 *
 * // Example 2: Inverse of a 3x3 matrix
 * assertEquals(inv([[1, 1, -1], [1, -2, 3], [2, 3, 1]]), [
 *  [0.846153846153846, 0.3076923076923077, -0.07692307692307707],
 *  [-0.3846153846153846, -0.23076923076923078, 0.30769230769230776],
 *  [-0.5384615384615384, 0.07692307692307691, 0.23076923076923078]
 * ]);
 *
 * // Example 3: Inverse of a number
 * assertEquals(inv(4), 0.25);

 * ```*/
export default function inv(x: number): number;
export default function inv(x: matrix): matrix;
export default function inv(x: number | matrix): number | matrix {
  if (isnumber(x)) {
    return 1 / x;
  }

  if (!issquare(x)) {
    throw new Error("matrix must be square");
  }

  const m = nrows(x);
  const I = eye(m, m);
  return linsolve(x, I);
}
