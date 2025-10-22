import type { matrix } from "../types.d.ts";
import ismatrix from "../datatype/ismatrix.ts";

/**
 * Checks if the input is a row vector.
 *
 * Returns `true` if the input matrix is a row vector, meaning it has exactly one row and more than one column.
 *
 * @param x The input matrix to check.
 * @returns Returns `true` if `x` is a row vector, otherwise `false`.
 * @throws If the input is not a valid matrix or if no argument is provided.
 *
 * @example Valid row vector
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(isrow([[2, 2]]), true);
 *
 * ```
 *
 * @example Column vector (not a row vector)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(isrow([[2], [2]]), false);
 *
 * ```
 *
 * @example Row vector with multiple columns
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(isrow([[1, 2, 3]]), true);
 *
 * ```
 *
 * @example Square matrix (not a row vector)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(isrow([[1, 2], [3, 4]]), false);
 *
 * ```
 *
 * @example Single-element row vector
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(isrow([[1]]), true);
 *
 * ```
 *
 * @example Invalid input (not a matrix)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertThrows(() => isrow(5), "Input must be a non-empty matrix");
 *
 * ```
 *
 * @example Empty matrix (should throw an error)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertThrows(() => isrow([]), "Input must be a non-empty matrix");
 *
 * ```
 */
export default function isrow(x: unknown): x is matrix {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  if (!ismatrix(x)) {
    throw new Error("Input must be a non-empty matrix (array of arrays)");
  }

  const nrows = x.length;
  const ncols = x[0].length;

  return nrows === 1 && ncols >= 1;
}
