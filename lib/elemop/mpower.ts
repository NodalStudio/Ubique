import type { matrix } from "../types.d.ts";

import { eye, inv, issquare, mtimes } from "../../index.ts";

/**
 * Matrix power X ^ Y.
 *
 * Raises a square matrix X to the power of a scalar exponent Y.
 *
 * @param x The base matrix (must be square)
 * @param y The exponent (must be a safe integer; negative powers invert the base)
 * @returns The resulting matrix after exponentiation
 * @throws If the input is not a square matrix or the exponent is not a safe integer
 *
 * @example Raise a matrix to the power of 3
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mpower([[1,1,-1],[1,-2,3],[2,3,1]], 3),
 *   [[-2, 11, -11], [11, -35, 33], [22, 33, -2]]);
 * ```
 */
export default function mpower(x: matrix, y: number): matrix {
  if (!issquare(x)) {
    throw new Error("input must be a square matrix");
  }

  if (!Number.isSafeInteger(y)) {
    throw new Error("Exponent must be a safe integer");
  }
  let base = y < 0 ? inv(x) : x;
  let exponent = Math.abs(y);
  let result = eye(x.length, x.length);
  while (exponent > 0) {
    if (exponent % 2 === 1) result = mtimes(result, base);
    exponent = Math.floor(exponent / 2);
    if (exponent > 0) base = mtimes(base, base);
  }
  return result;
}
