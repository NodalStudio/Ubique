import type { matrix } from "../types.d.ts";
import flipdim from "./flipdim.ts";
import isnumber from "../datatype/isnumber.ts";
import ismatrix from "../datatype/ismatrix.ts";

/**
 * Flip a matrix upside down.
 *
 * Reverses the order of the rows in the input matrix, flipping it upside down.
 *
 * @param x The input array or matrix
 * @returns The matrix with its rows flipped upside down
 * @throws If no input is provided or input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Flip a 2D matrix upside down
 * assertEquals(flipud([[1, 4], [2, 5], [3, 6]]), [[3, 2, 1], [6, 5, 4]]);
 *
 * // Example 2: Flip a single number (should return the number itself)
 * assertEquals(flipud(5), 5);
 *
 * // Example 3: Flip a simple 2D matrix
 * assertEquals(flipud([[1, 2], [3, 4]]), [[3, 1], [4, 2]]);
 * ```
 */
export default function flipud(x: number | matrix): number | matrix {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  if (isnumber(x)) {
    return x;
  }

  if (ismatrix(x)) {
    return flipdim(x, 0) as matrix; // Flip rows (upside down)
  }

  throw new Error("Unknown input arguments");
}
