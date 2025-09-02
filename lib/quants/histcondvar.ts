import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { find, isnumber, mean, quantile, vectorfun } from "../../index.ts";

/**
 * @function histcondvar
 * @summary Historical Conditional Value-At-Risk (CVaR)
 * @description Univariate historical simulation for Conditional Value-At-Risk.
 * Also known as Expected Shortfall (ES) or Expected Tail Loss (ETL).
 * The CVaR is the expected loss exceeding the VaR.
 *
 * @param x array or matrix of values
 * @param p confidence level in the range [0,1] (def: 0.95)
 * @param amount amount (def: 1)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Historical Conditional Value-At-Risk
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Historical conditional VaR for single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(histcondvar(x, 0.95), 0.014);
 *
 * // Example 2: Historical conditional VaR with custom amount
 * assertEquals(histcondvar(x, 0.99, 100000), 1400);
 *
 * // Example 3: Historical conditional VaR for matrix (row-wise)
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * const matrix = [x, y];
 * assertEquals(histcondvar(matrix, 0.95, 1, 0), [0.014, 0.061]);
 * ```
 */
export default function histcondvar(
  x: array,
  p?: number,
  amount?: number,
  dim?: 0 | 1,
): number;
export default function histcondvar(
  x: matrix,
  p?: number,
  amount?: number,
  dim?: 0 | 1,
): array | matrix;
export default function histcondvar(
  x: numarraymatrix,
  p: number = 0.95,
  amount: number = 1,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _histcondvar = function (a: array, p: number, amount: number): number {
    const q = quantile(a, 1 - p);
    // Create boolean array for values below quantile
    const belowQuantile = a.map((el: number) => el <= q);
    const idx = find(belowQuantile);
    if (idx.length === 0) {
      return 0;
    }
    const cvar = [];
    for (let i = 0; i < idx.length; i++) {
      cvar[i] = a[idx[i]];
    }
    return -mean(cvar) * amount;
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _histcondvar, p, amount);
}
