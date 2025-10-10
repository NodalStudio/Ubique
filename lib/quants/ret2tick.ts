import type { array, matrix } from "../types.d.ts";
import { vectorfun } from "../../index.ts";

/**
 * @function ret2tick
 * @summary Convert a return series to a value series with a start value
 * @description Converts a return series to a value series (prices) given a starting value.
 * Can handle both simple and continuous (log) returns.
 *
 * @param x Array of returns
 * @param mode Method to compute values: 'simple' or 'continuous' (defaults to 'simple')
 * @param sval Starting value (defaults to 1)
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise) (defaults to 0)
 * @returns Value series (prices)
 * @throws {Error} If unknown return method specified
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Converting returns to prices with a custom start value
 * assertEquals(ret2tick([0.5, -0.5, 1.0], 'simple', 100), [100, 150, 75, 150]);
 *
 * // Example 2: Converting returns to prices with continuous method
 * assertEquals(ret2tick([0.1, -0.05, 0.2], 'continuous', 100), [100, 110.51709180756477, 105.12710963760242, 128.40254166877418]);
 *
 * // Example 3: Converting matrix of returns to prices
 * assertEquals(ret2tick([[0.1, 0.2], [0.05, -0.1]], 'simple', 100), [[100, 110.00000000000001, 132], [100, 105, 94.5]]);
 * ```
 */
export default function ret2tick(
  x: array,
  mode?: string,
  sval?: number,
  dim?: 0 | 1,
): array;
export default function ret2tick(
  x: matrix,
  mode?: string,
  sval?: number,
  dim?: 0 | 1,
): matrix;
export default function ret2tick(
  x: array | matrix,
  mode: string = "simple",
  sval: number = 1,
  dim: 0 | 1 = 0,
): array | matrix {
  const _ret2tick = function (a: array, mode: string, sval: number): array {
    const r: number[] = [];
    r[0] = sval;

    if (mode === "simple") {
      for (let i = 1; i <= a.length; i++) {
        r[i] = r[i - 1] * (1 + a[i - 1]);
      }
    } else if (mode === "continuous") {
      for (let i = 1; i <= a.length; i++) {
        r[i] = r[i - 1] * Math.exp(a[i - 1]);
      }
    } else {
      throw new Error("Unknown return method. Use 'simple' or 'continuous'");
    }

    return r;
  };

  return vectorfun(dim, x, (a: array) => _ret2tick(a, mode, sval));
}
