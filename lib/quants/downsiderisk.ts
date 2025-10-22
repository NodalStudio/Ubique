import type { array, matrix } from "../types.d.ts";
import { find, isnumber, std, vectorfun } from "../../index.ts";

/**
 * Downside Risk.
 *
 * Downside risk is the semi-standard deviation of returns below a
 * Minimum Acceptable Return (MAR)
 *
 * @param x array of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Downside Risk
 *
 * @example Downside risk with default MAR
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(downsiderisk(x), 0.0035355339059327385);
 *
 * ```
 *
 * @example Downside risk with custom MAR
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(downsiderisk([0.02, -0.01, 0.03, -0.02], 0.01), 0.007071067811865476);
 *
 * ```
 *
 * @example Downside risk with higher MAR
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(downsiderisk([0.1, -0.2, 0.05, -0.1], 0), 0.07071067811865477);
 * ```
 */
export default function downsiderisk(
  x: number,
  mar?: number,
  dim?: 0 | 1,
): number;
export default function downsiderisk(
  x: array,
  mar?: number,
  dim?: 0 | 1,
): number;
export default function downsiderisk(
  x: matrix,
  mar?: number,
  dim?: 0 | 1,
): array | matrix;
export default function downsiderisk(
  x: number | array | matrix,
  mar: number = 0,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _downsiderisk = function (a: array, mar: number): number {
    // Create boolean array for values below MAR
    const belowMar = a.map((el: number) => el < mar);
    const idx = find(belowMar);
    if (idx.length === 0) {
      return 0;
    }
    const downside = [];
    for (let i = 0; i < idx.length; i++) {
      downside[i] = a[idx[i]];
    }
    return std(downside) as number;
  };

  if (isnumber(x)) {
    return 0;
  }

  return vectorfun(dim, x, _downsiderisk, mar);
}
