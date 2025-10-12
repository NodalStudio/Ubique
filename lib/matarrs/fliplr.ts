import type { array, matrix } from "../types.d.ts";

import flipdim from "./flipdim.ts";
import isnumber from "../datatype/isnumber.ts";
import isarray from "../datatype/isarray.ts";
import ismatrix from "../datatype/ismatrix.ts";

/**
 * Flip a matrix left to right.
 *
 * Reverses the order of the columns in the input matrix, flipping it left to right.
 *
 * @param x The input array or matrix.
 * @returns The matrix with its columns flipped left to right.
 * @throws If no input is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Flip a 2D matrix left to right
 * assertEquals(fliplr([[1, 4], [2, 5], [3, 6]]), [[4, 1], [5, 2], [6, 3]]);
 *
 * // Example 2: Flip a 1D array (no change)
 * assertEquals(fliplr([1, 2, 3]), [1, 2, 3]);

 * ```*/
export default function fliplr(
  x: number | array | matrix,
): number | array | matrix {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  if (isnumber(x) || isarray(x)) {
    return x;
  }

  if (ismatrix(x)) {
    return flipdim(x, 1); // Flip columns (left to right)
  }

  throw new Error("Unknown input arguments");
}
