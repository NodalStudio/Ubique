import { array, matrix } from '../types';

/**
 * @function activereturn
 * @summary Computes the active return
 * @description Calculates the active return, which is the difference between the annualized return of an asset/portfolio and the annualized return of a benchmark.
 *
 * @param x Asset/portfolio returns.
 * @param y Benchmark returns.
 * @param t Frequency of data points in a year. (1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily).
 * @param mode The mode of return calculation: 'geometric' or 'simple'.
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns The computed active return.
 *
 * @example
 * import { activereturn } from './activereturn.js';
 *
 * // Example 1: Compute active return for a single portfolio and benchmark
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assert.strictEqual(activereturn(x, y, 12), 0.041979);
 *
 * // Example 2: Compute active return for multiple portfolios against a benchmark
 * const z = [0.04, -0.022, 0.043, 0.028, -0.078, -0.011, 0.033, -0.049, 0.09, 0.087];
 * assert.deepStrictEqual(activereturn([x, y], z, 12), [[0.041979], [-0.046746]]);
 */
export function activereturn(
  x: array | matrix,
  y: array,
  t?: number,
  mode?: string,
  dim?: number
): number | array | matrix;
