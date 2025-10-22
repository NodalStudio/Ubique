import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { downsidepot, isnumber, upsidepot, vectorfun } from "../../index.ts";

/**
 * Omega Ratio.
 *
 * The Omega ratio is a measure of risk-return performance that divides
 * the upside potential (gains) by the downside risk (losses) relative to a
 * minimum acceptable return threshold.
 *
 * @param x asset/portfolio returns
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Omega Ratio
 *
 * @example Omega ratio for a single asset
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(omegaratio(x), 10.978260869565217);
 *
 * ```
 *
 * @example Omega ratio with custom threshold
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(omegaratio([0.05, 0.03, 0.08, -0.02], 0.02), 5.333333333333334);
 *
 * ```
 *
 * @example Omega ratio with negative threshold
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 *
 * assertEquals(omegaratio(x, -0.01), 53.611111111111114);
 * ```
 */
export default function omegaratio(
  x: array,
  mar?: number,
  dim?: 0 | 1,
): number;
export default function omegaratio(
  x: matrix,
  mar?: number,
  dim?: 0 | 1,
): array | matrix;
export default function omegaratio(
  x: numarraymatrix,
  mar: number = 0,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _omegaratio = function (a: array, mar: number): number {
    return upsidepot(a, mar) / downsidepot(a, mar);
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _omegaratio, mar);
}
