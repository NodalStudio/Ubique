import { vectorfun } from '../datatype/vectorfun.js';
import { isarray } from '../datatype/isarray.js';

/**
 * @function cdrawdown
 * @summary Computes the Continuous Drawdown
 * @description Computes continuous drawdowns for an asset/portfolio.
 * A drawdown occurs when returns are negative in a sequence.
 *
 * @param {array|matrix} x Asset/portfolio returns.
 * @param {number} [dim=0] Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns {array|matrix} The computed continuous drawdowns.
 * @throws {Error} If the input is invalid.
 *
 * @example
 * import { cdrawdown } from './cdrawdown.js';
 *
 * // Example 1: Continuous drawdown for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assert.deepStrictEqual(cdrawdown(x), [0.009, 0.014]);
 *
 * // Example 2: Throws an error for invalid input
 * assert.throws(() => cdrawdown(123), /Input must be an array or matrix/);
 */
export function cdrawdown(x, dim = 0) {
  if (!isarray(x)) {
    throw new Error('Input must be an array or matrix');
  }

  return vectorfun(dim, x, computeContinuousDrawdown);
}

function computeContinuousDrawdown(returns) {
  return returns.reduce(
    ({ drawdowns, drawdown, max }, value) => {
      const newDrawdown = Math.min(drawdown + value, 0);
      const newMax = Math.min(max, newDrawdown);

      return {
        drawdowns: [...drawdowns, -newMax],
        drawdown: newDrawdown,
        max: newMax,
      };
    },
    { drawdowns: [], drawdown: 0, max: 0 },
  ).drawdowns;
}
