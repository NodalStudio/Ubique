import type { matrix } from "../types.d.ts";
import ismatrix from "../datatype/ismatrix.ts";

/**
 * Checks if the input is a column vector.
 *
 * Returns `true` if the input matrix is a column vector, meaning it has more than one row and exactly one column.
 *
 * @param x The input matrix to check.
 * @returns Returns `true` if `x` is a column vector, otherwise `false`.
 * @throws If the input is not a valid matrix or if no argument is provided.
 *
 * @example Valid column vector
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(iscolumn([[2], [2]]), true);
 *
 * ```
 *
 * @example Row vector (not a column vector)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(iscolumn([[2, 2]]), false);
 *
 * ```
 *
 * @example Column vector with multiple rows
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(iscolumn([[1], [2], [3]]), true);
 *
 * ```
 *
 * @example Square matrix (not a column vector)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(iscolumn([[1, 2], [3, 4]]), false);
 *
 * ```
 *
 * @example Single-element column vector
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(iscolumn([[1]]), true);
 *
 * ```
 *
 * @example Invalid input (not a matrix)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertThrows(() => iscolumn(5), "Input must be a non-empty matrix");
 *
 * ```
 *
 * @example Empty matrix (should throw an error)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertThrows(() => iscolumn([]), "Input must be a non-empty matrix");
 *
 * ```
 */
export default function iscolumn(x: unknown): x is matrix {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  if (!ismatrix(x)) {
    throw new Error("Input must be a non-empty matrix (array of arrays)");
  }

  const nrows = x.length;
  const ncols = x[0].length;

  return nrows >= 1 && ncols === 1;
}
