import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isarray, ismatrix, minus, std, vectorfun } from "../../index.ts";

/**
 * @function trackerr
 * @summary Tracking Error (ex-post)
 * @description Ex-post tracking error, which measures the standard deviation of the difference
 * between portfolio returns and benchmark returns.
 *
 * @param x Portfolio/asset returns
 * @param y Benchmark returns
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise) (defaults to 0)
 * @returns Tracking error value(s)
 * @throws If input is a number or insufficient arguments provided
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Single asset tracking error
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * const z = [0.04, -0.022, 0.043, 0.028, -0.078, -0.011, 0.033, -0.049, 0.09, 0.087];
 * assertEquals(trackerr(x, z), 0.06843618276256436);
 *
 * // Example 2: Different portfolio tracking error
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(trackerr(y, z), 0.058621668348828156);
 *
 * // Example 3: Tracking error with different assets
 * assertEquals(trackerr([0.05, 0.03, 0.08], [0.04, 0.025, 0.075]), 0.0028867513459481294);
 * ```
 */
export default function trackerr(x: array, y: array, dim?: 0 | 1): number;
export default function trackerr(
  x: matrix,
  y: array,
  dim?: 0 | 1,
): array | matrix;
export default function trackerr(
  x: numarraymatrix,
  y: array,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _te = function (a: array, b: array): number {
    return std(minus(a, b));
  };

  if (!isarray(x) && !ismatrix(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, (a: array) => _te(a, y));
}
