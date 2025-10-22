import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  isarray,
  ismatrix,
  kurtosis,
  sharpe,
  skewness,
  vectorfun,
} from "../../index.ts";

/**
 * Computes the Adjusted Sharpe Ratio.
 *
 * The Adjusted Sharpe Ratio accounts for skewness and kurtosis with a penalty factor
 * for negative skewness and excess kurtosis.
 *
 * Adjusted Sharpe Ratio formula:
 * **ASR = SR × [1 + (S / 6) × SR - ((K - 3) / 24) × SR²]**
 * where:
 * - `SR` = Sharpe Ratio
 * - `S` = Skewness
 * - `K` = Kurtosis
 *
 * @param x Asset/portfolio returns
 * @param frisk Annual risk-free rate (defaults to 0)
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise, defaults to 0)
 * @returns The computed Adjusted Sharpe Ratio
 * @throws If the input is invalid
 *
 * @example Adjusted Sharpe ratio for a single asset
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(adjsharpe(x), 0.8309256847278014);
 *
 * ```
 *
 * @example Adjusted Sharpe ratio with risk-free rate
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(adjsharpe([0.05, 0.03, 0.08, -0.02], 0.02), 0.3510454044056545);
 *
 * ```
 *
 * @example Adjusted Sharpe ratio for matrix (row-wise)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const matrix = [[0.01, 0.02], [0.03, -0.01], [0.05, 0.04]];
 * assertEquals(adjsharpe(matrix, 0, 0), [2.9168154723945086, 0.3572362384119537, 27.84232950922034]);
 * ```
 */
export default function adjsharpe(
  x: array,
  frisk?: number,
  dim?: 0 | 1,
): number;
export default function adjsharpe(
  x: matrix,
  frisk?: number,
  dim?: 0 | 1,
): array | matrix;
export default function adjsharpe(
  x: numarraymatrix,
  frisk: number = 0,
  dim: 0 | 1 = 0,
): number | array | matrix {
  if (!isarray(x) && !ismatrix(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, (arr: array) => computeAdjSharpe(arr, frisk));
}

function computeAdjSharpe(arr: array, frisk: number): number {
  const sr = sharpe(arr, frisk);
  const sk = skewness(arr);
  const ku = kurtosis(arr);
  return sr * (1 + (sk / 6) * sr - ((ku - 3) / 24) * sr * sr);
}
