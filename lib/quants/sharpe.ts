import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isarray, ismatrix, mean, std, vectorfun } from "../../index.ts";

/**
 * @function sharpe
 * @summary Computes the Sharpe Ratio
 * @description Calculates the Sharpe Ratio for an asset or portfolio given its returns and a risk-free rate.
 * The risk-free rate should be adjusted to match the timeframe of the returns.
 *
 * The Sharpe Ratio formula:
 * **SR = (Mean Return - Risk-Free Rate) / Standard Deviation**
 *
 * @param x Asset/portfolio returns
 * @param frisk Annual risk-free rate (adjusted for the timeframe) (defaults to 0)
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise) (defaults to 0)
 * @returns The computed Sharpe Ratio
 * @throws If the input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Sharpe Ratio for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(sharpe(x, 0.02 / 12), 0.6987943426529188);
 *
 * // Example 2: Sharpe Ratio with zero risk-free rate
 * assertEquals(sharpe(x), 0.7705391416932597);
 *
 * // Example 3: Sharpe Ratio for different asset
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals(sharpe(y), 0.23858007842472628);
 * ```
 */
export default function sharpe(x: array, frisk?: number, dim?: 0 | 1): number;
export default function sharpe(
  x: matrix,
  frisk?: number,
  dim?: 0 | 1,
): array | matrix;
export default function sharpe(
  x: numarraymatrix,
  frisk: number = 0,
  dim: 0 | 1 = 0,
): number | array | matrix {
  if (!isarray(x) && !ismatrix(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, (arr: array) => computeSharpe(arr, frisk));
}

function computeSharpe(arr: array, frisk: number): number {
  const meanReturn = mean(arr);
  const riskAdjustedReturn = meanReturn - frisk;
  const volatility = std(arr);
  return riskAdjustedReturn / volatility;
}
