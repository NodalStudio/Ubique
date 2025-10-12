import type { array, matrix } from "../types.d.ts";
import { isarray, isnumber, log, size, zeros } from "../../index.ts";

/**
 * Convert price series to returns.
 *
 * Convert a price series to continuous or discrete returns
 *
 * @param x Array of values (prices)
 * @param mode Calculation mode: 'simple' (default) or 'continuous'
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise) (defaults to 1)
 * @returns Returns array or matrix
 * @throws If input is not an array or matrix
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Simple returns from price series
 * const x = [1, 3, 2, 5];
 * assertEquals(tick2ret(x), [2, -0.33333333333333337, 1.5]);
 *
 * // Example 2: Continuous (log) returns
 * assertEquals(tick2ret(x, "continuous"), [1.0986122886681096, -0.40546510810816444, 0.9162907318741551]);
 *
 * // Example 3: Continuous returns for different price series
 * const y = [0.5, 1.5, 2.5, 3.5];
 * assertEquals(tick2ret(y, "continuous"), [1.0986122886681096, 0.5108256237659907, 0.33647223662121284]);
 * ```
 */
export default function tick2ret(x: array, mode?: string, dim?: 0 | 1): array;
export default function tick2ret(x: matrix, mode?: string, dim?: 0 | 1): matrix;
export default function tick2ret(
  x: array | matrix,
  mode: string = "simple",
  dim: 0 | 1 = 1,
): array | matrix {
  // Return values from prices
  const _ret = function (a: array, mode: string): array {
    const n = a.length;
    const r = new Array(n - 1);

    if (mode === "simple") {
      for (let i = 0; i < n - 1; i++) {
        r[i] = a[i + 1] / a[i] - 1;
      }
    } else if (mode === "continuous") {
      for (let i = 0; i < n - 1; i++) {
        r[i] = log(a[i + 1] / a[i]);
      }
    }
    return r;
  };

  // Row vector of prices
  if (isnumber(x)) {
    throw new Error("input arguments must be an array or matrix");
  }

  if (isarray(x)) {
    if (dim === 0) {
      const n = size(x)[0] - 1;
      const r = zeros(n, size(x)[1]);
      for (let i = 0; i < size(x)[1]; i++) {
        const tmp = [];
        for (let j = 0; j < size(x)[0]; j++) {
          tmp.push((x as matrix)[j][i]);
        }

        const rt = _ret(tmp, mode);
        for (let j = 0; j < rt.length; j++) {
          r[j][i] = rt[j];
        }
      }
      return r;
    } else if (dim === 1) {
      return _ret(x as array, mode);
    }
  }

  if (dim === 0) {
    const n = size(x)[0] - 1;
    const r = zeros(n, size(x)[1]);
    for (let i = 0; i < size(x)[1]; i++) {
      const tmp = [];
      for (let j = 0; j < size(x)[0]; j++) {
        tmp.push((x as matrix)[j][i]);
      }

      const rt = _ret(tmp, mode);
      for (let j = 0; j < rt.length; j++) {
        r[j][i] = rt[j];
      }
    }
    return r;
  } else if (dim === 1) {
    const n = size(x)[1] - 1;
    const r = zeros(size(x)[0], n);
    for (let i = 0; i < size(x)[0]; i++) {
      const tmp = [];
      for (let j = 0; j < size(x)[1]; j++) {
        tmp.push((x as matrix)[i][j]);
      }

      const rt = _ret(tmp, mode);
      for (let j = 0; j < rt.length; j++) {
        r[i][j] = rt[j];
      }
    }
    return r;
  }

  // This should never be reached, but TypeScript requires it
  throw new Error("Unexpected execution path");
}
