import { ismatrix, issquare, ncols } from "../../index.ts";

/**
 * Checks if a matrix is singular (non-invertible).
 *
 * Returns `true` if the input is a singular matrix. A matrix is singular if it is square and its determinant is zero, which occurs when any of the diagonal elements is zero.
 *
 * @param x The matrix to check.
 * @returns Returns `true` if the matrix is singular, otherwise `false`.
 *
 * @throws Throws an error if the input is not a matrix or not a square matrix.
 *
 * @example Non-singular square matrix
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(issingular([[2, 6], [1, 3]]), false);
 *
 * ```
 *
 * @example Singular square matrix (diagonal element is zero)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(issingular([[0, 6], [1, 3]]), true);
 *
 * ```
 *
 * @example Not a matrix (single number input)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertThrows(() => { issingular(5) }, Error, 'input must be a matrix');
 *
 * ```
 *
 * @example Non-square matrix
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertThrows(() => { issingular([[1, 2, 3], [4, 5, 6]]) }, Error, 'input must be a square matrix');
 *
 * ```
 */
export default function issingular(x: unknown): boolean {
  if (!ismatrix(x)) {
    throw new Error("input must be a matrix");
  }

  if (!issquare(x)) {
    throw new Error("input must be a square matrix");
  }

  const n = ncols(x);
  for (let i = 0; i < n; i += 1) {
    if (x[i][i] === 0) {
      return true;
    }
  }

  return false;
}
