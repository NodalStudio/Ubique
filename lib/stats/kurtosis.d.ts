import { array, matrix } from "../types.d.ts";

/**
 * @function kurtosis
 * @summary Computes the kurtosis of a dataset.
 * @description Kurtosis measures the "tailedness" of a probability distribution.
 * A higher kurtosis indicates heavier tails, while a lower kurtosis suggests lighter tails.
 *
 * @param x The dataset (array or matrix).
 * @param flag Bias correction flag (0 for bias correction, 1 for simple calculation).
 * @param dim Dimension to compute kurtosis along (0 for row-wise, 1 for column-wise).
 * @returns The computed kurtosis.
 * @throws If the input arguments are insufficient.
 *
 * @example
 * // Example 1: Compute kurtosis of an array
 * assert.strictEqual(kurtosis([0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039]), 3.037581);
 *
 * // Example 2: Compute kurtosis with bias correction
 * assert.strictEqual(kurtosis([0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039], 0), 2.9453);
 *
 * // Example 3: Compute kurtosis for a matrix along rows
 * assert.deepStrictEqual(kurtosis([[0.003, 0.026], [0.015, -0.009]]), [[3.037581], [1.397642]]);
 *
 * // Example 4: Compute kurtosis for a matrix along columns
 * assert.deepStrictEqual(kurtosis([[0.003, 0.026], [0.015, -0.009]], 1, 1), [[2.78], [1.85]]);
 *
 * // Example 5: Compute kurtosis for a dataset with equal elements (should be NaN)
 * assert.strictEqual(kurtosis([1, 1, 1, 1, 1]), NaN);
 */
export function kurtosis(
  x: array | matrix,
  flag?: number,
  dim?: number,
): number | array | matrix;
