import type { matrix } from "../types.d.ts";
import { eye, isnumber, issquare, linsolve, nrows } from "../../index.ts";
import { invwasm } from "../../rs_lib/pkg/rs_lib.js";

/**
 * Computes the inverse of a square matrix.
 *
 * Returns the inverse of a square matrix. If the input is a single number, it returns the reciprocal of that number.
 *
 * @param x A square matrix or a number.
 * @returns The inverse of the matrix or the reciprocal of the number.
 * @throws If no arguments are provided or if the input is not a square matrix.
 *
 * @example Inverse of a 2x2 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(inv([[3, 2], [5, 2]]), [[-0.5, 0.5], [1.25, -0.7499999999999999]]);
 *
 * ```
 *
 * @example Inverse of a 3x3 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(inv([[1, 1, -1], [1, -2, 3], [2, 3, 1]]), [
 *  [0.846153846153846, 0.3076923076923077, -0.07692307692307707],
 *  [-0.3846153846153846, -0.23076923076923078, 0.30769230769230776],
 *  [-0.5384615384615384, 0.07692307692307691, 0.23076923076923078]
 * ]);
 *
 * ```
 *
 * @example Inverse of a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(inv(4), 0.25);
 *
 * ```
 */
export default function inv(x: number): number;
/**
 * Computes the inverse of a square matrix.
 *
 * Returns the inverse of a square matrix. If the input is a single number, it returns the reciprocal of that number.
 *
 * @param x A square matrix or a number.
 * @returns The inverse of the matrix or the reciprocal of the number.
 * @throws If no arguments are provided or if the input is not a square matrix.
 *
 * @example Inverse of a 2x2 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(inv([[3, 2], [5, 2]]), [[-0.5, 0.5], [1.25, -0.7499999999999999]]);
 *
 * ```
 *
 * @example Inverse of a 3x3 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(inv([[1, 1, -1], [1, -2, 3], [2, 3, 1]]), [
 *  [0.846153846153846, 0.3076923076923077, -0.07692307692307707],
 *  [-0.3846153846153846, -0.23076923076923078, 0.30769230769230776],
 *  [-0.5384615384615384, 0.07692307692307691, 0.23076923076923078]
 * ]);
 *
 * ```
 *
 * @example Inverse of a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(inv(4), 0.25);
 *
 * ```
 */
export default function inv(x: matrix): matrix;
/**
 * Computes the inverse of a square matrix.
 *
 * Returns the inverse of a square matrix. If the input is a single number, it returns the reciprocal of that number.
 *
 * @param x A square matrix or a number.
 * @returns The inverse of the matrix or the reciprocal of the number.
 * @throws If no arguments are provided or if the input is not a square matrix.
 *
 * @example Inverse of a 2x2 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(inv([[3, 2], [5, 2]]), [[-0.5, 0.5], [1.25, -0.7499999999999999]]);
 *
 * ```
 *
 * @example Inverse of a 3x3 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(inv([[1, 1, -1], [1, -2, 3], [2, 3, 1]]), [
 *  [0.846153846153846, 0.3076923076923077, -0.07692307692307707],
 *  [-0.3846153846153846, -0.23076923076923078, 0.30769230769230776],
 *  [-0.5384615384615384, 0.07692307692307691, 0.23076923076923078]
 * ]);
 *
 * ```
 *
 * @example Inverse of a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(inv(4), 0.25);
 *
 * ```
 */
export default function inv(x: number | matrix): number | matrix {
  if (isnumber(x)) {
    return 1 / x;
  }

  if (!issquare(x)) {
    throw new Error("matrix must be square");
  }

  const n = nrows(x);

  // Use WASM for larger matrices (> 10x10) where overhead is justified
  if (typeof invwasm === "function" && n > 10) {
    const flatX = new Float64Array(x.flat());
    const flatResult = invwasm(flatX, n);

    // Check for singular matrix (NaN values)
    if (isNaN(flatResult[0])) {
      throw new Error("Matrix is singular and cannot be inverted");
    }

    // Reshape flat result back to matrix
    const result: matrix = [];
    for (let i = 0; i < n; i++) {
      result[i] = [];
      for (let j = 0; j < n; j++) {
        result[i][j] = flatResult[i * n + j];
      }
    }
    return result;
  }

  // JavaScript fallback for small matrices
  const I = eye(n, n);
  return linsolve(x, I) as matrix;
}
