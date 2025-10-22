import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { find, isnumber, mean, vectorfun } from "../../index.ts";

/**
 * Upside Potential.
 *
 * Average of positive returns, higher than a target return (MAR)
 *
 * @param x array of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Upside Potential
 *
 * @example Upside potential for a single asset
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(upsidepot(x), 0.025249999999999998);
 *
 * ```
 *
 * @example Upside potential with custom MAR
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(upsidepot([0.05, 0.03, 0.08, -0.02], 0.04), 0.065);
 *
 * ```
 *
 * @example Upside potential for matrix (row-wise)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 *
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * const matrix = [x, y];
 * assertEquals(upsidepot(matrix, 0, 0), [0.025249999999999998, 0.0598]);
 * ```
 */
export default function upsidepot(
  x: array,
  mar?: number,
  dim?: 0 | 1,
): number;
/**
 * Upside Potential.
 *
 * Average of positive returns, higher than a target return (MAR)
 *
 * @param x array of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Upside Potential
 *
 * @example Upside potential for a single asset
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(upsidepot(x), 0.025249999999999998);
 *
 * ```
 *
 * @example Upside potential with custom MAR
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(upsidepot([0.05, 0.03, 0.08, -0.02], 0.04), 0.065);
 *
 * ```
 *
 * @example Upside potential for matrix (row-wise)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 *
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * const matrix = [x, y];
 * assertEquals(upsidepot(matrix, 0, 0), [0.025249999999999998, 0.0598]);
 * ```
 */
export default function upsidepot(
  x: matrix,
  mar?: number,
  dim?: 0 | 1,
): array | matrix;
/**
 * Upside Potential.
 *
 * Average of positive returns, higher than a target return (MAR)
 *
 * @param x array of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Upside Potential
 *
 * @example Upside potential for a single asset
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(upsidepot(x), 0.025249999999999998);
 *
 * ```
 *
 * @example Upside potential with custom MAR
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(upsidepot([0.05, 0.03, 0.08, -0.02], 0.04), 0.065);
 *
 * ```
 *
 * @example Upside potential for matrix (row-wise)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 *
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * const matrix = [x, y];
 * assertEquals(upsidepot(matrix, 0, 0), [0.025249999999999998, 0.0598]);
 * ```
 */
export default function upsidepot(
  x: numarraymatrix,
  mar: number = 0,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _upsidepot = function (a: array, mar: number): number {
    // Create boolean array for values above MAR
    const aboveMar = a.map((el: number) => el > mar);
    const idx = find(aboveMar);

    if (idx.length === 0) {
      return 0;
    }

    const upside = [];
    for (let i = 0; i < idx.length; i++) {
      upside[i] = a[idx[i]];
    }

    return mean(upside) as number;
  };

  if (isnumber(x)) {
    return (x as number) > mar ? (x as number) : 0;
  }

  return vectorfun(dim, x, _upsidepot, mar);
}
