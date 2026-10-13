import { prepareSquare } from "../internal/lu.ts";
import { ismatrix, issquare } from "../../index.ts";

/**
 * Checks if a matrix is singular (non-invertible).
 *
 * Returns `true` if the input is a singular matrix. Uses row-equilibrated LU pivots, with default relative tolerance n * Number.EPSILON. This numerical test is invariant to row scaling; it is not a condition-number estimate.
 *
 * @param x The matrix to check.
 * @returns Returns `true` if the matrix is singular, otherwise `false`.
 *
 * @throws Throws an error if the input is not a matrix or not a square matrix.
 *
 * @example Singular square matrix
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(issingular([[2, 6], [1, 3]]), true);
 *
 * ```
 *
 * @example Invertible matrix with a zero diagonal entry
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(issingular([[0, 6], [1, 3]]), false);
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
export default function issingular(
  x: unknown,
  relativeTolerance?: number,
): boolean {
  if (!ismatrix(x)) {
    throw new Error("input must be a matrix");
  }

  if (!issquare(x)) {
    throw new Error("input must be a square matrix");
  }

  return prepareSquare(x, relativeTolerance).singular;
}
