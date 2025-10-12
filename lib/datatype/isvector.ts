import type { matrix } from "../types.d.ts";
import { iscolumn, ismatrix, isrow } from "../../index.ts";

/**
 * Checks if the input is a vector.
 *
 * Returns `true` if the input is a vector. A vector is defined as a matrix with either one row or one column.
 *
 * @param x The matrix to check.
 * @returns Returns `true` if `x` is a vector, otherwise `false`.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: A row vector
 * assertEquals(isvector([[5, 6, 7]]), true);
 *
 * // Example 2: A column vector
 * assertEquals(isvector([[5], [6], [7]]), true);
 *
 * // Example 3: A matrix with more than one row and column
 * assertEquals(isvector([[1, 2], [3, 4]]), false);
 *
 * // Example 4: Not a matrix (invalid input)
 * assertEquals(isvector(123), false);
 *
 * // Example 5: Empty matrix
 * assertEquals(isvector([]), false);

 * ```*/
export default function isvector(x: unknown): x is matrix {
  if (ismatrix(x)) {
    return iscolumn(x) || isrow(x);
  }

  return false;
}
