import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  annreturn,
  annrisk,
  isarray,
  ismatrix,
  kurtosis,
  skewness,
  vectorfun,
} from "../../index.ts";

/**
 * Computes the Annualized Adjusted Sharpe Ratio.
 *
 * The Adjusted Sharpe Ratio accounts for skewness and kurtosis with a penalty factor
 * for negative skewness and excess kurtosis.
 *
 * **Formula:**
 * ASR = SR × [1 + (S / 6) × SR - ((K - 3) / 24) × SR²]
 * where:
 * - `SR` = Annualized Sharpe Ratio (Annualized Return / Annualized Risk)
 * - `S` = Skewness
 * - `K` = Kurtosis
 *
 * @param x Asset/portfolio returns
 * @param frisk Annual risk-free rate
 * @param t Data frequency: 252 (daily), 52 (weekly), 12 (monthly), 4 (quarterly)
 * @param mode Return mode: 'geometric' or 'simple'
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise)
 * @returns The computed Annualized Adjusted Sharpe Ratio
 * @throws If the input is invalid
 *
 * @example Annualized adjusted Sharpe ratio for a single asset
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(annadjsharpe(x, 0, 12), 3.735901391809159);
 *
 * ```
 *
 * @example Annualized adjusted Sharpe with different parameters
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 *
 * assertEquals(annadjsharpe(x, 0.02, 12, 'simple'), 3.0015320352820116);
 *
 * ```
 *
 * @example Annualized adjusted Sharpe for multiple assets (matrix)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x1 = [0.003, 0.026, 0.015, -0.009, 0.014];
 * const x2 = [0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(annadjsharpe([x1, x2], 0, 12), [3.1428087562328324, 5.030879310639437]);
 * ```
 */
export default function annadjsharpe(
  x: array,
  frisk?: number,
  t?: number,
  mode?: string,
  dim?: 0 | 1,
): number;
/**
 * Computes the Annualized Adjusted Sharpe Ratio.
 *
 * The Adjusted Sharpe Ratio accounts for skewness and kurtosis with a penalty factor
 * for negative skewness and excess kurtosis.
 *
 * **Formula:**
 * ASR = SR × [1 + (S / 6) × SR - ((K - 3) / 24) × SR²]
 * where:
 * - `SR` = Annualized Sharpe Ratio (Annualized Return / Annualized Risk)
 * - `S` = Skewness
 * - `K` = Kurtosis
 *
 * @param x Asset/portfolio returns
 * @param frisk Annual risk-free rate
 * @param t Data frequency: 252 (daily), 52 (weekly), 12 (monthly), 4 (quarterly)
 * @param mode Return mode: 'geometric' or 'simple'
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise)
 * @returns The computed Annualized Adjusted Sharpe Ratio
 * @throws If the input is invalid
 *
 * @example Annualized adjusted Sharpe ratio for a single asset
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(annadjsharpe(x, 0, 12), 3.735901391809159);
 *
 * ```
 *
 * @example Annualized adjusted Sharpe with different parameters
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 *
 * assertEquals(annadjsharpe(x, 0.02, 12, 'simple'), 3.0015320352820116);
 *
 * ```
 *
 * @example Annualized adjusted Sharpe for multiple assets (matrix)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x1 = [0.003, 0.026, 0.015, -0.009, 0.014];
 * const x2 = [0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(annadjsharpe([x1, x2], 0, 12), [3.1428087562328324, 5.030879310639437]);
 * ```
 */
export default function annadjsharpe(
  x: matrix,
  frisk?: number,
  t?: number,
  mode?: string,
  dim?: 0 | 1,
): array | matrix;
/**
 * Computes the Annualized Adjusted Sharpe Ratio.
 *
 * The Adjusted Sharpe Ratio accounts for skewness and kurtosis with a penalty factor
 * for negative skewness and excess kurtosis.
 *
 * **Formula:**
 * ASR = SR × [1 + (S / 6) × SR - ((K - 3) / 24) × SR²]
 * where:
 * - `SR` = Annualized Sharpe Ratio (Annualized Return / Annualized Risk)
 * - `S` = Skewness
 * - `K` = Kurtosis
 *
 * @param x Asset/portfolio returns
 * @param frisk Annual risk-free rate
 * @param t Data frequency: 252 (daily), 52 (weekly), 12 (monthly), 4 (quarterly)
 * @param mode Return mode: 'geometric' or 'simple'
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise)
 * @returns The computed Annualized Adjusted Sharpe Ratio
 * @throws If the input is invalid
 *
 * @example Annualized adjusted Sharpe ratio for a single asset
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(annadjsharpe(x, 0, 12), 3.735901391809159);
 *
 * ```
 *
 * @example Annualized adjusted Sharpe with different parameters
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 *
 * assertEquals(annadjsharpe(x, 0.02, 12, 'simple'), 3.0015320352820116);
 *
 * ```
 *
 * @example Annualized adjusted Sharpe for multiple assets (matrix)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x1 = [0.003, 0.026, 0.015, -0.009, 0.014];
 * const x2 = [0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(annadjsharpe([x1, x2], 0, 12), [3.1428087562328324, 5.030879310639437]);
 * ```
 */
export default function annadjsharpe(
  x: numarraymatrix,
  frisk: number = 0,
  t: number = 252,
  mode: string = "geometric",
  dim: 0 | 1 = 0,
): number | array | matrix {
  if (!isarray(x) && !ismatrix(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(
    dim,
    x,
    (arr: array) => computeAnnAdjSharpe(arr, frisk, t, mode),
  );
}

function computeAnnAdjSharpe(
  arr: array,
  frisk: number,
  t: number,
  mode: string,
): number {
  const annualReturn = annreturn(arr, t, mode);
  const annualRisk = annrisk(arr, t);
  const sr = (annualReturn - frisk) / annualRisk;
  const sk = skewness(arr);
  const ku = kurtosis(arr);
  return sr * (1 + (sk / 6) * sr - ((ku - 3) / 24) * sr * sr);
}
