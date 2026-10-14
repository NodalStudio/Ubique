import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, vectorfun } from "../../index.ts";

/**
 * Upside Potential.
 *
 * Unconditional upper partial moment: mean(max(x - MAR, 0)).
 * All observations, including zero contributions, count in the denominator.
 *
 * @param x array of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Upside Potential
 *
 * @example Upside potential for a single asset
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertAlmostEquals(upsidepot(x), 0.0202, 1.01e-14);
 *
 * ```
 *
 * @example Upside potential with custom MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(upsidepot([0.05, 0.03, 0.08, -0.02], 0.04), 0.0125, 1e-14);
 *
 * ```
 *
 * @example Upside potential for matrix (row-wise)
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 *
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * const matrix = [x, y];
 * const expected = [0.0202, 0.0299];
 * (upsidepot(matrix, 0, 0) as number[]).forEach((v, i) => assertAlmostEquals(v, expected[i], 1e-14));
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
 * Unconditional upper partial moment: mean(max(x - MAR, 0)).
 * All observations, including zero contributions, count in the denominator.
 *
 * @param x array of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Upside Potential
 *
 * @example Upside potential for a single asset
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertAlmostEquals(upsidepot(x), 0.0202, 1.01e-14);
 *
 * ```
 *
 * @example Upside potential with custom MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(upsidepot([0.05, 0.03, 0.08, -0.02], 0.04), 0.0125, 1e-14);
 *
 * ```
 *
 * @example Upside potential for matrix (row-wise)
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 *
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * const matrix = [x, y];
 * const expected = [0.0202, 0.0299];
 * (upsidepot(matrix, 0, 0) as number[]).forEach((v, i) => assertAlmostEquals(v, expected[i], 1e-14));
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
 * Unconditional upper partial moment: mean(max(x - MAR, 0)).
 * All observations, including zero contributions, count in the denominator.
 *
 * @param x array of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Upside Potential
 *
 * @example Upside potential for a single asset
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertAlmostEquals(upsidepot(x), 0.0202, 1.01e-14);
 *
 * ```
 *
 * @example Upside potential with custom MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(upsidepot([0.05, 0.03, 0.08, -0.02], 0.04), 0.0125, 1e-14);
 *
 * ```
 *
 * @example Upside potential for matrix (row-wise)
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 *
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * const matrix = [x, y];
 * const expected = [0.0202, 0.0299];
 * (upsidepot(matrix, 0, 0) as number[]).forEach((v, i) => assertAlmostEquals(v, expected[i], 1e-14));
 * ```
 */
export default function upsidepot(
  x: numarraymatrix,
  mar: number = 0,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _upsidepot = function (a: array, mar: number): number {
    if (!Number.isFinite(mar) || !a.every(Number.isFinite)) {
      throw new Error("Returns and MAR must be finite");
    }
    return a.reduce(
      (sum, value) => sum + Math.max(value - mar, 0) / a.length,
      0,
    );
  };

  if (isnumber(x)) {
    if (!Number.isFinite(x) || !Number.isFinite(mar)) {
      throw new Error("Returns and MAR must be finite");
    }
    return Math.max(x - mar, 0);
  }

  return vectorfun(dim, x, _upsidepot, mar);
}
