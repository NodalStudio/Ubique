import { array, matrix } from "../types.js";

/**
 * @function cdrawdown
 * @summary Computes the Continuous Drawdown
 * @description Computes continuous drawdowns for an asset/portfolio.
 * A drawdown occurs when returns are negative in a sequence.
 *
 * @param x Asset/portfolio returns.
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns The computed continuous drawdowns.
 *
 * @example
 * import { cdrawdown } from './cdrawdown.js';
 *
 * // Example 1: Continuous drawdown for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assert.deepStrictEqual(cdrawdown(x), [0.009, 0.014]);
 *
 * // Example 2: Continuous drawdown for multiple assets
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assert.deepStrictEqual(cdrawdown([x, y]), [[0.009, 0.014], [0.005, 0.095743, 0.068971]]);
 *
 * // Example 3: Default dimension (row-wise)
 * assert.deepStrictEqual(cdrawdown(x), cdrawdown(x, 0));
 *
 * // Example 4: Throws an error for invalid input
 * assert.throws(() => cdrawdown(123), /Input must be an array or matrix/);
 */
export function cdrawdown(
  x: array | matrix,
  dim?: number
): array | matrix;
