import type { array, matrix } from "../types.d.ts";
import { isnumber, vectorfun } from "../../index.ts";

/**
 * Percentiles of a sample.
 *
 * Calculates the p-th percentile of values in an array or matrix.
 * Uses linear interpolation between data points for accurate percentile calculation.
 *
 * @param x Input array or matrix
 * @param p Percentile value in range [0,100]
 * @param dim Dimension along which to compute percentiles. Default is 0
 * @returns Percentile values
 * @throws When percentile is outside valid range [0,100]
 *
 * @example 50th percentile (median)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4, 5], 50), 3);
 *
 * ```
 *
 * @example 25th percentile
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4], 25), 1.5);
 *
 * ```
 *
 * @example 75th percentile
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4, 5], 75), 4.25);
 * ```
 */
export default function prctile(x: array, p: number, dim?: 0 | 1): number;
/**
 * Percentiles of a sample.
 *
 * Calculates the p-th percentile of values in an array or matrix.
 * Uses linear interpolation between data points for accurate percentile calculation.
 *
 * @param x Input array or matrix
 * @param p Percentile value in range [0,100]
 * @param dim Dimension along which to compute percentiles. Default is 0
 * @returns Percentile values
 * @throws When percentile is outside valid range [0,100]
 *
 * @example 50th percentile (median)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4, 5], 50), 3);
 *
 * ```
 *
 * @example 25th percentile
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4], 25), 1.5);
 *
 * ```
 *
 * @example 75th percentile
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4, 5], 75), 4.25);
 * ```
 */
export default function prctile(x: matrix, p: number, dim?: 0 | 1): array;
/**
 * Percentiles of a sample.
 *
 * Calculates the p-th percentile of values in an array or matrix.
 * Uses linear interpolation between data points for accurate percentile calculation.
 *
 * @param x Input array or matrix
 * @param p Percentile value in range [0,100]
 * @param dim Dimension along which to compute percentiles. Default is 0
 * @returns Percentile values
 * @throws When percentile is outside valid range [0,100]
 *
 * @example 50th percentile (median)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4, 5], 50), 3);
 *
 * ```
 *
 * @example 25th percentile
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4], 25), 1.5);
 *
 * ```
 *
 * @example 75th percentile
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4, 5], 75), 4.25);
 * ```
 */
export default function prctile(x: array, p: number, dim: 0 | 1): number;
/**
 * Percentiles of a sample.
 *
 * Calculates the p-th percentile of values in an array or matrix.
 * Uses linear interpolation between data points for accurate percentile calculation.
 *
 * @param x Input array or matrix
 * @param p Percentile value in range [0,100]
 * @param dim Dimension along which to compute percentiles. Default is 0
 * @returns Percentile values
 * @throws When percentile is outside valid range [0,100]
 *
 * @example 50th percentile (median)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4, 5], 50), 3);
 *
 * ```
 *
 * @example 25th percentile
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4], 25), 1.5);
 *
 * ```
 *
 * @example 75th percentile
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4, 5], 75), 4.25);
 * ```
 */
export default function prctile(x: matrix, p: number, dim: 0 | 1): array;
/**
 * Percentiles of a sample.
 *
 * Calculates the p-th percentile of values in an array or matrix.
 * Uses linear interpolation between data points for accurate percentile calculation.
 *
 * @param x Input array or matrix
 * @param p Percentile value in range [0,100]
 * @param dim Dimension along which to compute percentiles. Default is 0
 * @returns Percentile values
 * @throws When percentile is outside valid range [0,100]
 *
 * @example 50th percentile (median)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4, 5], 50), 3);
 *
 * ```
 *
 * @example 25th percentile
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4], 25), 1.5);
 *
 * ```
 *
 * @example 75th percentile
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4, 5], 75), 4.25);
 * ```
 */
export default function prctile(
  x: array | matrix,
  p: number,
  dim?: 0 | 1,
): number | array;
/**
 * Percentiles of a sample.
 *
 * Calculates the p-th percentile of values in an array or matrix.
 * Uses linear interpolation between data points for accurate percentile calculation.
 *
 * @param x Input array or matrix
 * @param p Percentile value in range [0,100]
 * @param dim Dimension along which to compute percentiles. Default is 0
 * @returns Percentile values
 * @throws When percentile is outside valid range [0,100]
 *
 * @example 50th percentile (median)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4, 5], 50), 3);
 *
 * ```
 *
 * @example 25th percentile
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4], 25), 1.5);
 *
 * ```
 *
 * @example 75th percentile
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4, 5], 75), 4.25);
 * ```
 */
export default function prctile(
  x: array | matrix,
  p: number,
  dim: 0 | 1,
): number | array;
/**
 * Percentiles of a sample.
 *
 * Calculates the p-th percentile of values in an array or matrix.
 * Uses linear interpolation between data points for accurate percentile calculation.
 *
 * @param x Input array or matrix
 * @param p Percentile value in range [0,100]
 * @param dim Dimension along which to compute percentiles. Default is 0
 * @returns Percentile values
 * @throws When percentile is outside valid range [0,100]
 *
 * @example 50th percentile (median)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4, 5], 50), 3);
 *
 * ```
 *
 * @example 25th percentile
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4], 25), 1.5);
 *
 * ```
 *
 * @example 75th percentile
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(prctile([1, 2, 3, 4, 5], 75), 4.25);
 * ```
 */
export default function prctile(
  x: array | matrix,
  p: number,
  dim?: 0 | 1,
): number | array {
  if (Array.isArray(x) && x.length === 0) {
    throw new Error("Percentiles require at least one observation");
  }
  const actualDim = dim ?? 0;
  if (!Number.isFinite(p) || p < 0 || p > 100) {
    throw new Error(
      "p-th percentile must be a real value between 0 and 100 inclusive",
    );
  }

  const _prctile = function (a: array, pr: number): number {
    if (a.length === 0) {
      throw new Error("Percentiles require at least one observation");
    }
    const sorted = a.slice().sort((a, b) => a - b);
    const rank = Math.max(
      0,
      Math.min(sorted.length - 1, pr / 100 * sorted.length - 0.5),
    );
    const lower = Math.floor(rank), upper = Math.ceil(rank);
    if (lower === upper || sorted[lower] === sorted[upper]) {
      return sorted[lower];
    }
    const weight = rank - lower;
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  };

  if (isnumber(x)) {
    return NaN;
  }

  const result = vectorfun(actualDim, x, _prctile, p);
  return result as number | array;
}
