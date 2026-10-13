import { packRows } from "../internal/matrix.ts";
import type { matrix } from "../types.d.ts";
import { finiteMatrix } from "../internal/lu.ts";
import { detwasm } from "../../rs_lib/pkg/rs_lib.js";

/**
 * Matrix determinant.
 *
 * Computes the determinant of a square matrix using LU decomposition.
 *
 * @param x A square matrix.
 * @returns The determinant of the matrix.
 * @throws If no input is provided, or if the input is not a square matrix.
 *
 * @example Determinant of a 2x2 matrix
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertEquals(det([[1, 5], [6, 2]]), -28);
 *
 * ```
 *
 * @example Determinant of another 2x2 matrix
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertEquals(det([[2, 2], [2, 3]]), 2);
 *
 * ```
 *
 * @example Determinant of a 3x3 matrix
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertEquals(det([[1, 2, 3], [0, 4, 5], [1, 0, 6]]), 22);
 *
 * ```
 *
 * @example Determinant of a 3x3 matrix with zeros
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertEquals(det([[0, 2, 3], [0, 4, 5], [1, 0, 6]]), -2);
 *
 * ```
 *
 * @example Determinant of an identity matrix
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertEquals(det([[1, 0], [0, 1]]), 1);
 *
 * ```
 *
 * @example Determinant of a 4x4 matrix (should be 0 due to linear dependence)
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(det([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]), 0, 1e-12);
 *
 * ```
 *
 * @example Determinant of a larger matrix
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertEquals(det([[4, 8, 2], [4, 6, 8], [4, 2, 8]]), 96);
 *
 * ```
 *
 * @example Determinant of a matrix with fractional values
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertEquals(det([[-40.54, 34.02], [91.81, 57.47]]), -5453.21);
 *
 * ```
 */
export default function det(x: matrix): number {
  const [rows, cols] = finiteMatrix(x);
  if (rows !== cols) throw new Error("Matrix must be square");
  return detwasm(packRows(x), rows);
}
