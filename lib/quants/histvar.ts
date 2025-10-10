import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, quantile, vectorfun } from "../../index.ts";

/**
 * @function histvar
 * @summary Historical Value-At-Risk
 * @description Univariate historical simulation. Single asset
 *
 * @param x array or matrix of values
 * @param p confidence level in the range [0,1] (def: 0.95)
 * @param amount amount (def: 1)
 * @param period time horizon (def: 1)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return The calculated Historical Value-At-Risk
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Daily VaR at 95% confidence level
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(histvar(x, 0.95), 0.013999999999999999);
 *
 * // Example 2: VaR with custom amount
 * assertEquals(histvar(x, 0.99, 100000), 1400);
 *
 * // Example 3: VaR with different confidence level
 * assertEquals(histvar([0.1, -0.2, 0.05, -0.1], 0.75), 0.15);
 * ```
 */
export default function histvar(
  x: array,
  p?: number,
  amount?: number,
  period?: number,
  dim?: 0 | 1,
): number;
export default function histvar(
  x: matrix,
  p?: number,
  amount?: number,
  period?: number,
  dim?: 0 | 1,
): array | matrix;
export default function histvar(
  x: numarraymatrix,
  p: number = 0.95,
  amount: number = 1,
  period: number = 1,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _histvar = function (
    a: array,
    p: number,
    amount: number,
    period: number,
  ): number {
    return -quantile(a, 1 - p) * Math.sqrt(period) * amount;
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _histvar, p, amount, period);
}
