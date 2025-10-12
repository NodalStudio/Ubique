import type { matrix } from "../types.d.ts";

import { isnumber, issquare, mtimes } from "../../index.ts";

/**
 * @function mpower
 * @summary Matrix power X ^ Y
 * @description Raises a square matrix X to the power of a scalar exponent Y.
 *
 * @param x The base matrix (must be square)
 * @param y The exponent (must be a scalar)
 * @returns The resulting matrix after exponentiation
 * @throws If the input is not a square matrix or the exponent is not a scalar
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Raise a matrix to the power of 3
 * assertEquals(mpower([[1,1,-1],[1,-2,3],[2,3,1]], 3),
 *   [[-2, 11, -11], [11, -35, 33], [22, 33, -2]]);
 * ```
 */
export default function mpower(x: matrix, y: number): matrix {
  if (!issquare(x)) {
    throw new Error("input must be a square matrix");
  }

  if (!isnumber(y)) {
    throw new Error("exponent must be a scalar value");
  }

  let out = x;
  for (let t = 1; t < y; t++) {
    out = mtimes(out, x) as matrix;
  }
  return out;
}
