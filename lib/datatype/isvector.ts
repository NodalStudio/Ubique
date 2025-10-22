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
 * @example A row vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isvector([[5, 6, 7]]), true);
 *
 * ```
 *
 * @example A column vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isvector([[5], [6], [7]]), true);
 *
 * ```
 *
 * @example A matrix with more than one row and column
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isvector([[1, 2], [3, 4]]), false);
 *
 * ```
 *
 * @example Not a matrix (invalid input)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isvector(123), false);
 *
 * ```
 *
 * @example Empty matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isvector([]), false);
 *
 * ```
 */
export default function isvector(x: unknown): x is matrix {
  if (ismatrix(x)) {
    return iscolumn(x) || isrow(x);
  }

  return false;
}
