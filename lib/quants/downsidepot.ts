import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, vectorfun } from "../../index.ts";

/**
 * Downside Potential.
 *
 * Measure of the average deviation below a minimum acceptable return threshold
 *
 * @param x array or matrix of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Downside Potential
 *
 * @example Downside potential with default MAR
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(downsidepot(x), 0.0023);
 *
 * ```
 *
 * @example Downside potential with custom MAR
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(downsidepot([0.05, 0.03, 0.08, -0.02], 0.02), 0.01);
 *
 * ```
 *
 * @example Downside potential for matrix (row-wise)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const matrix = [[0.01, 0.02], [0.03, -0.01], [0.05, 0.04]];
 * assertEquals(downsidepot(matrix, 0, 0), [0, 0.005, 0]);
 * ```
 */
export default function downsidepot(
  x: array,
  mar?: number,
  dim?: 0 | 1,
): number;
/**
 * Downside Potential.
 *
 * Measure of the average deviation below a minimum acceptable return threshold
 *
 * @param x array or matrix of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Downside Potential
 *
 * @example Downside potential with default MAR
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(downsidepot(x), 0.0023);
 *
 * ```
 *
 * @example Downside potential with custom MAR
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(downsidepot([0.05, 0.03, 0.08, -0.02], 0.02), 0.01);
 *
 * ```
 *
 * @example Downside potential for matrix (row-wise)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const matrix = [[0.01, 0.02], [0.03, -0.01], [0.05, 0.04]];
 * assertEquals(downsidepot(matrix, 0, 0), [0, 0.005, 0]);
 * ```
 */
export default function downsidepot(
  x: matrix,
  mar?: number,
  dim?: 0 | 1,
): array | matrix;
/**
 * Downside Potential.
 *
 * Measure of the average deviation below a minimum acceptable return threshold
 *
 * @param x array or matrix of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Downside Potential
 *
 * @example Downside potential with default MAR
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(downsidepot(x), 0.0023);
 *
 * ```
 *
 * @example Downside potential with custom MAR
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(downsidepot([0.05, 0.03, 0.08, -0.02], 0.02), 0.01);
 *
 * ```
 *
 * @example Downside potential for matrix (row-wise)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const matrix = [[0.01, 0.02], [0.03, -0.01], [0.05, 0.04]];
 * assertEquals(downsidepot(matrix, 0, 0), [0, 0.005, 0]);
 * ```
 */
export default function downsidepot(
  x: numarraymatrix,
  mar: number = 0,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _downsidepot = function (a: array, mar: number): number {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
      sum += Math.max(mar - a[i], 0) / a.length;
    }
    return sum;
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _downsidepot, mar);
}
