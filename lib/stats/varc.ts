import type { array, matrix } from "../types.d.ts";
import {
  abs,
  isarray,
  ismatrix,
  isnumber,
  mean,
  minus,
  power,
  sum,
  vectorfun,
} from "../../index.ts";

/**
 * Computes the variance.
 *
 * Computes the variance (average squared deviation from mean) for arrays or matrices.
 * Supports both population (N) and sample (N-1) normalizations.
 *
 * @param x Input array or matrix
 * @param flag Normalization type (0: population, 1: sample). Default is 1
 * @param dim Dimension to operate on (0: rows, 1: columns). Default is 0
 * @returns Computed variance values
 * @throws When input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Sample variance
 * assertEquals(varc([1, 2, 3]), 1);
 *
 * // Example 2: Population variance
 * assertEquals(varc([1, 2, 3], 0), 0.6666666666666666);
 *
 * // Example 3: Matrix variance along rows (default dim=0, flag=1)
 * assertEquals(varc([[1, 2], [3, 4]]), [[0.5, 0.5]]);
 * ```
 */
export default function varc(x: array, flag?: 0 | 1, dim?: 0 | 1): number;
export default function varc(x: matrix, flag?: 0 | 1, dim?: 0 | 1): matrix;
export default function varc(x: array, flag: 0 | 1, dim?: 0 | 1): number;
export default function varc(x: matrix, flag: 0 | 1, dim?: 0 | 1): matrix;
export default function varc(x: array, flag: 0 | 1, dim: 0 | 1): number;
export default function varc(x: matrix, flag: 0 | 1, dim: 0 | 1): matrix;
export default function varc(
  x: array | matrix,
  flag?: 0 | 1,
  dim?: 0 | 1,
): number | matrix;
export default function varc(
  x: array | matrix,
  flag: 0 | 1,
  dim?: 0 | 1,
): number | matrix;
export default function varc(
  x: array | matrix,
  flag: 0 | 1,
  dim: 0 | 1,
): number | matrix;
export default function varc(
  x: array | matrix,
  flag?: 0 | 1,
  dim?: 0 | 1,
): number | matrix {
  const actualFlag = flag ?? 1;
  const actualDim = dim ?? 0;
  if (isnumber(x)) {
    return NaN;
  }

  const result = vectorfun(
    actualDim,
    x,
    (arr: array) => computeVariance(arr, actualFlag),
  );

  if (isarray(x)) {
    return result as number;
  }

  if (ismatrix(x)) {
    // vectorfun returns T[] for matrices, we need to reshape to matrix
    return [result as number[]];
  }

  throw new Error("Invalid input type");
}

function computeVariance(arr: array, flag: 0 | 1): number {
  // WASM disabled - benchmarks show it's slower due to overhead
  // TODO: Re-enable if we find a threshold where WASM is faster
  // if (typeof variancewasm === "function" && arr.length > 10000) {
  //   return variancewasm(new Float64Array(arr), flag);
  // }

  // JavaScript implementation
  const mu = mean(arr);
  const deviations = minus(arr, mu);
  const squaredDeviations = power(abs(deviations), 2);
  return sum(squaredDeviations) / (arr.length - flag);
}
