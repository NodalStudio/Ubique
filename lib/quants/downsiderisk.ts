import type { array, matrix } from "../types.d.ts";
import { isnumber, vectorfun } from "../../index.ts";

/**
 * Downside Risk.
 *
 * Root mean squared shortfall from Minimum Acceptable Return (MAR):
 * sqrt(mean(min(x - MAR, 0)^2)), with all observations in the denominator.
 *
 * @param x array of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Downside Risk
 *
 * @example Downside risk with default MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertAlmostEquals(downsiderisk(x), 0.0052630789467763076, 1e-14);
 *
 * ```
 *
 * @example Downside risk with custom MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(downsiderisk([0.02, -0.01, 0.03, -0.02], 0.01), 0.018027756377319945, 1e-14);
 *
 * ```
 *
 * @example Downside risk with higher MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(downsiderisk([0.1, -0.2, 0.05, -0.1], 0), 0.1118033988749895, 5.5901699437494745e-14);
 * ```
 */
export default function downsiderisk(
  x: number,
  mar?: number,
  dim?: 0 | 1,
): number;
/**
 * Downside Risk.
 *
 * Root mean squared shortfall from Minimum Acceptable Return (MAR):
 * sqrt(mean(min(x - MAR, 0)^2)), with all observations in the denominator.
 *
 * @param x array of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Downside Risk
 *
 * @example Downside risk with default MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertAlmostEquals(downsiderisk(x), 0.0052630789467763076, 1e-14);
 *
 * ```
 *
 * @example Downside risk with custom MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(downsiderisk([0.02, -0.01, 0.03, -0.02], 0.01), 0.018027756377319945, 1e-14);
 *
 * ```
 *
 * @example Downside risk with higher MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(downsiderisk([0.1, -0.2, 0.05, -0.1], 0), 0.1118033988749895, 5.5901699437494745e-14);
 * ```
 */
export default function downsiderisk(
  x: array,
  mar?: number,
  dim?: 0 | 1,
): number;
/**
 * Downside Risk.
 *
 * Root mean squared shortfall from Minimum Acceptable Return (MAR):
 * sqrt(mean(min(x - MAR, 0)^2)), with all observations in the denominator.
 *
 * @param x array of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Downside Risk
 *
 * @example Downside risk with default MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertAlmostEquals(downsiderisk(x), 0.0052630789467763076, 1e-14);
 *
 * ```
 *
 * @example Downside risk with custom MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(downsiderisk([0.02, -0.01, 0.03, -0.02], 0.01), 0.018027756377319945, 1e-14);
 *
 * ```
 *
 * @example Downside risk with higher MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(downsiderisk([0.1, -0.2, 0.05, -0.1], 0), 0.1118033988749895, 5.5901699437494745e-14);
 * ```
 */
export default function downsiderisk(
  x: matrix,
  mar?: number,
  dim?: 0 | 1,
): array | matrix;
/**
 * Downside Risk.
 *
 * Root mean squared shortfall from Minimum Acceptable Return (MAR):
 * sqrt(mean(min(x - MAR, 0)^2)), with all observations in the denominator.
 *
 * @param x array of values
 * @param mar minimum acceptable return (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Downside Risk
 *
 * @example Downside risk with default MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertAlmostEquals(downsiderisk(x), 0.0052630789467763076, 1e-14);
 *
 * ```
 *
 * @example Downside risk with custom MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(downsiderisk([0.02, -0.01, 0.03, -0.02], 0.01), 0.018027756377319945, 1e-14);
 *
 * ```
 *
 * @example Downside risk with higher MAR
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(downsiderisk([0.1, -0.2, 0.05, -0.1], 0), 0.1118033988749895, 5.5901699437494745e-14);
 * ```
 */
export default function downsiderisk(
  x: number | array | matrix,
  mar: number = 0,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _downsiderisk = function (a: array, mar: number): number {
    if (!Number.isFinite(mar) || !a.every(Number.isFinite)) {
      throw new Error("Returns and MAR must be finite");
    }
    if (a.length === 0) return NaN;
    let total = 0;
    for (const value of a) total += Math.min(value - mar, 0) ** 2;
    return Math.sqrt(total / a.length);
  };

  if (isnumber(x)) {
    if (!Number.isFinite(x) || !Number.isFinite(mar)) {
      throw new Error("Returns and MAR must be finite");
    }
    return Math.max(mar - x, 0);
  }

  return vectorfun(dim, x, _downsiderisk, mar);
}
