import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isarray, ismatrix, std, vectorfun } from "../../index.ts";

/**
 * @function annrisk
 * @summary Computes the Annualized Risk (Standard Deviation)
 * @description Computes the annualized standard deviation of asset or portfolio returns.
 * Standard deviation is scaled based on the frequency of the data.
 *
 * **Formula:**
 * Annualized Risk = **√t × Standard Deviation (σ)**
 *
 * @param x Asset/portfolio returns
 * @param t Frequency of data points in a year: 1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily (default)
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise)
 * @returns The computed annualized risk (standard deviation)
 * @throws If the input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Annualized risk for a single asset (monthly data)
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(annrisk(x, 12), 0.08047276972160623);
 *
 * // Example 2: Annualized risk with daily frequency
 * assertEquals(annrisk(x, 252), 0.368772558632011);
 *
 * // Example 3: Annualized risk for multiple assets (matrix)
 * const x1 = [0.003, 0.026, 0.015, -0.009, 0.014];
 * const x2 = [0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(annrisk([x1, x2], 12), [0.046047801250439745, 0.10238163897887159]);
 * ```
 */
export default function annrisk(x: array, t?: number, dim?: 0 | 1): number;
export default function annrisk(
  x: matrix,
  t?: number,
  dim?: 0 | 1,
): array | matrix;
export default function annrisk(
  x: numarraymatrix,
  t = 252,
  dim: 0 | 1 = 0,
): number | array | matrix {
  if (!isarray(x) && !ismatrix(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, (arr: array) => computeAnnRisk(arr, t));
}

function computeAnnRisk(arr: array, t: number): number {
  return Math.sqrt(t) * (std(arr) as number);
}
