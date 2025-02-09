/** @import { array, matrix } from '../types.d.ts' */

import annreturn from "./annreturn.ts";
import cdrawdown from "./cdrawdown.ts";
import sqrt from "../elmath/sqrt.ts";
import sum from "../elemop/sum.ts";
import power from "../elemop/power.ts";
import vectorfun from "../datatype/vectorfun.ts";
import isarray from "../datatype/isarray.ts";

/**
 * @function burkeratio
 * @summary Computes the Burke Ratio
 * @description The Burke Ratio is a risk-adjusted performance metric that accounts for drawdowns.
 * In 'simple' mode, it calculates the excess return over the risk-free rate divided by the square root
 * of the sum of squared drawdowns. In 'modified' mode, the result is scaled by the square root of the number of data points.
 *
 * @param {array|matrix} x Asset or portfolio returns.
 * @param {number} [frisk=0] Annual risk-free rate.
 * @param {number} [t=252] Frequency: 252 (daily), 52 (weekly), 12 (monthly), 4 (quarterly).
 * @param {string} [mode='simple'] Calculation mode: 'simple' or 'modified'.
 * @param {number} [dim=0] Dimension: 0 (row-wise), 1 (column-wise).
 * @returns {number|array} The computed Burke Ratio.
 * @throws {Error} If an invalid mode is provided or if input arguments are invalid.
 *
 * @example
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 *
 * // Example 1: Compute Burke Ratio for a single return series
 * assert.strictEqual(burkeratio(x, 0, 12), 14.048563);
 *
 * // Example 2: Compute modified Burke Ratio
 * assert.strictEqual(burkeratio(x, 0, 12, 'modified'), 44.425456);
 *
 * // Example 3: Invalid input
 * assert.throws(() => burkeratio([x, y]), /Input must be an array/);
 */
export default function burkeratio(
  x: any,
  frisk = 0,
  t = 252,
  mode = "simple",
  dim = 0,
) {
  if (!isarray(x)) {
    throw new Error("Input must be an array");
  }

  if (!["simple", "modified"].includes(mode)) {
    throw new Error('Invalid mode: must be "simple" or "modified"');
  }

  return vectorfun(dim, x, (a: any) => {
    const annRet = annreturn(a, t);
    const dd = sqrt(sum(power(cdrawdown(a), 2))) as number;
    return mode === "simple"
      ? (annRet - frisk) / dd
      : ((annRet - frisk) / dd) * (sqrt(a.length) as number);
  });
}
