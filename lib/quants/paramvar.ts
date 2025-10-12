import type { array, matrix } from "../types.d.ts";
import {
  flatten,
  iscolumn,
  ismatrix,
  isnumber,
  isrow,
  norminv,
  transpose,
} from "../../index.ts";

/**
 * @function paramvar
 * @summary Parametric Value-At-Risk
 * @description Parametric Value-At-Risk assuming returns are normally distributed.
 * It can work with numbers, arrays, row vectors, and column vectors.
 *
 * @param mu mean value (def: 0)
 * @param sigma standard deviation (def: 1)
 * @param p VaR confidence level in range [0,1] (def: 0.95)
 * @param amount portfolio/asset amount (def: 1)
 * @param period time horizon (def: 1)
 * @return Parametric Value-At-Risk
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: VaR with default parameters
 * assertEquals(paramvar(0, 1), 1.6448536127562643);
 *
 * // Example 2: VaR with arrays
 * assertEquals(paramvar([0, 0, 0], [1, 2, 3]), [1.6448536127562643, 3.2897072255125286, 4.934560838268792]);
 *
 * // Example 3: Parametric VaR for a single asset
 * assertEquals(paramvar(0.0179, 0.023230487630602065), 0.020310751505285517);
 * ```
 */
export default function paramvar(
  mu: number,
  sigma: number,
  p?: number,
  amount?: number,
  period?: number,
): number;
export default function paramvar(
  mu: array,
  sigma: array,
  p?: number,
  amount?: number,
  period?: number,
): array;
export default function paramvar(
  mu: matrix,
  sigma: matrix,
  p?: number,
  amount?: number,
  period?: number,
): array | matrix;
export default function paramvar(
  mu: number | array | matrix,
  sigma: number | array | matrix,
  p: number = 0.95,
  amount: number = 1,
  period: number = 1,
): number | array | matrix {
  const _pvar = function (
    _mu: number,
    _sigma: number,
    p: number,
    amount: number,
    period: number,
  ): number {
    return (-norminv(1 - p) * _sigma - _mu) * Math.sqrt(period) * amount;
  };

  if (isnumber(mu)) {
    return _pvar(mu as number, sigma as number, p, amount, period);
  }

  const temp = flatten(mu as array | matrix) as array;
  const sigmaArray = flatten(sigma as array | matrix) as array;
  const out = temp.map(function (el: number, idx: number) {
    return _pvar(el, sigmaArray[idx], p, amount, period);
  });

  if (ismatrix(mu) && isrow(mu)) {
    return [out];
  }

  if (ismatrix(mu) && iscolumn(mu)) {
    return transpose(out);
  }

  return out;
}
