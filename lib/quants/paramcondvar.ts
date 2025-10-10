import type { array, matrix } from "../types.d.ts";
import {
  flatten,
  iscolumn,
  ismatrix,
  isnumber,
  isrow,
  norminv,
  normpdf,
  transpose,
} from "../../index.ts";

/**
 * @function paramcondvar
 * @summary Parametric Conditional Value-At-Risk
 * @description Parametric Conditional Value-At-Risk measures the expected loss
 * exceeding the VaR. Also known as Expected Shortfall (ES) or Expected Tail Loss (ETL).
 * It is more sensitive to the shape of the loss distribution in the tails.
 *
 * @param mu mean value (def: 0)
 * @param sigma standard deviation (def: 1)
 * @param p cVaR confidence level in range [0,1] (def: 0.95)
 * @param amount portfolio/asset amount (def: 1)
 * @param period time horizon (def: 1)
 * @return Parametric Conditional Value-At-Risk
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Parametric daily CVaR with mean and std
 * assertEquals(paramcondvar(0.0179, 0.023230487630602065), 0.030017825479120894);
 *
 * // Example 2: Parametric CVaR with additional parameters
 * assertEquals(paramcondvar(0.0179, 0.023230487630602065, 0.99, 100000, 10), 19578.980844416896);
 *
 * // Example 3: Different asset parameters
 * assertEquals(paramcondvar(0.01125, 0.04727061065899899, 0.99, 100000, 10), 39840.35893323986);
 * ```
 */
export default function paramcondvar(
  mu: number,
  sigma: number,
  p?: number,
  amount?: number,
  period?: number,
): number;
export default function paramcondvar(
  mu: array,
  sigma: array,
  p?: number,
  amount?: number,
  period?: number,
): array;
export default function paramcondvar(
  mu: matrix,
  sigma: matrix,
  p?: number,
  amount?: number,
  period?: number,
): array | matrix;
export default function paramcondvar(
  mu: number | array | matrix,
  sigma: number | array | matrix,
  p: number = 0.95,
  amount: number = 1,
  period: number = 1,
): number | array | matrix {
  const _pcvar = function (
    _mu: number,
    _sigma: number,
    p: number,
    amount: number,
    period: number,
  ): number {
    return _sigma * normpdf(norminv(1 - p)) / (1 - p) * amount *
        Math.sqrt(period) - _mu;
  };

  if (isnumber(mu)) {
    return _pcvar(mu as number, sigma as number, p, amount, period);
  }

  const temp = flatten(mu as array | matrix) as array;
  const sigmaArray = flatten(sigma as array | matrix) as array;
  const out = temp.map(function (el: number, idx: number) {
    return _pcvar(el, sigmaArray[idx], p, amount, period);
  });

  if (ismatrix(mu) && isrow(mu)) {
    return [out];
  }

  if (ismatrix(mu) && iscolumn(mu)) {
    return transpose(out);
  }

  return out;
}
