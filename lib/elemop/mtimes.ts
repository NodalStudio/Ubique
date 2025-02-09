import isnumber from "../datatype/isnumber.ts";
import size from "../matarrs/size.ts";
import times from "./times.ts";
import { numarraymatrix } from "../types.d.ts";
import { timeswasm } from "../../ubique_wasm/pkg/ubique_wasm.js";

/**
 * @function mtimes
 * @summary Matrix multiplication X * Y
 * @description Performs matrix multiplication X * Y. If X is MxP and Y is PxN, it returns a matrix MxN.
 *
 * @param x Number, array, or matrix representing the first factor.
 * @param y Number, array, or matrix representing the second factor.
 * @returns The result of the multiplication.
 * @throws {Error} If the inner dimensions of the matrices do not match.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Multiply two numbers
 * assertEquals(mtimes(5, 6), 30);
 *
 * // Example 2: Multiply an array by a scalar
 * assertEquals(mtimes([5, 6, 3], 3), [15, 18, 9]);
 *
 * // Example 3: Multiply a matrix by a scalar
 * assertEquals(mtimes([[5, 6, 5], [7, 8, -1]], 3), [[15, 18, 15], [21, 24, -3]]);
 *
 * // Example 4: Multiply a 1x3 matrix by a 3x1 matrix
 * assertEquals(mtimes([[5, 6, 3]], [[3], [4], [5]]), [[54]]);
 *
 * // Example 5: Multiply a 2x3 matrix by a 3x1 matrix
 * assertEquals(mtimes([[5, 6, 5], [7, 8, -1]], [[5], [6], [3]]), [[76], [80]]);
 * ```
 */
export default function mtimes(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (!isnumber(x) && !isnumber(y)) {
    const xsize = size(x);
    const ysize = size(y);

    if (xsize[1] !== ysize[0]) {
      throw new Error("inner dimension mismatch");
    }

    const [rowsx, colsx] = xsize;
    const [, colsy] = ysize;

    const flatX = new Float64Array(x.flat());
    const flatY = new Float64Array(y.flat());

    const result = timeswasm(flatX, flatY, rowsx, colsx, colsy);

    return Array.from(
      { length: rowsx },
      (_, i) => Array.from({ length: colsy }, (_, j) => result[i * colsy + j]),
    );
  }

  return times(x, y);
}
