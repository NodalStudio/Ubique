import type { array, matrix } from "../types.d.ts";
import { isarray, ismatrix, isnumber, vectorfun } from "../../index.ts";

/**
 * @function std
 * @summary Computes the standard deviation
 * @description Computes the standard deviation (square root of variance) for arrays or matrices.
 * Supports both population (N) and sample (N-1) normalizations.
 *
 * @param x Input array or matrix
 * @param flag Normalization type (0: population, 1: sample). Default is 1
 * @param dim Dimension to operate on (0: rows, 1: columns). Default is 0
 * @returns Computed standard deviation values
 * @throws When input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Sample standard deviation
 * assertEquals(std([1, 2, 3, 4, 5]), 1.5811388300841898);
 *
 * // Example 2: Population standard deviation
 * assertEquals(std([1, 2, 3, 4, 5], 0), 1.4142135623730951);
 *
 * // Example 3: Matrix standard deviation along rows (default dim=0, flag=1)
 * assertEquals(std([[1, 2], [3, 4]]), [[0.7071067811865476, 0.7071067811865476]]);
 * ```
 */
export default function std(x: array, flag?: 0 | 1, dim?: 0 | 1): number;
export default function std(x: matrix, flag?: 0 | 1, dim?: 0 | 1): matrix;
export default function std(x: array, flag: 0 | 1, dim?: 0 | 1): number;
export default function std(x: matrix, flag: 0 | 1, dim?: 0 | 1): matrix;
export default function std(x: array, flag: 0 | 1, dim: 0 | 1): number;
export default function std(x: matrix, flag: 0 | 1, dim: 0 | 1): matrix;
export default function std(
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
    (arr: array) => computeStd(arr, actualFlag),
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

/**
 * Single-pass standard deviation using Welford's algorithm
 * Numerically stable online computation of variance
 */
function computeStd(arr: array, flag: 0 | 1): number {
  const n = arr.length;
  if (n === 0) return NaN;
  if (n === 1) return flag === 1 ? NaN : 0;

  // Welford's algorithm for numerically stable variance
  let mean = 0;
  let m2 = 0;

  for (let i = 0; i < n; i++) {
    const x = arr[i];
    const delta = x - mean;
    mean += delta / (i + 1);
    const delta2 = x - mean;
    m2 += delta * delta2;
  }

  const variance = m2 / (n - flag);
  return Math.sqrt(variance);
}
