import { array, matrix } from '../types.ts';

/**
 * @function skewness
 * @summary Computes the skewness of a dataset.
 * @description Measures the asymmetry of the probability distribution of a dataset.
 * A positive skew indicates a longer tail on the right, while a negative skew indicates a longer tail on the left.
 *
 * @param x The dataset (array or matrix).
 * @param flag Bias correction flag (0 for bias correction, 1 for simple calculation).
 * @param dim Dimension to compute skewness along (0 for row-wise, 1 for column-wise).
 * @returns The computed skewness.
 * @throws If the input arguments are insufficient.
 *
 * @example
 * // Example 1: Compute skewness of an array
 * assert.strictEqual(skewness([0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039]), 0.617481);
 *
 * // Example 2: Compute skewness with bias correction
 * assert.strictEqual(skewness([0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039], 0), 0.64892);
 *
 * // Example 3: Compute skewness for a matrix along rows
 * assert.deepStrictEqual(skewness([[0.003, 0.026], [0.015, -0.009]]), [[0.617481], [-0.118909]]);
 *
 * // Example 4: Compute skewness for a matrix along columns
 * assert.deepStrictEqual(skewness([[0.003, 0.026], [0.015, -0.009]], 1, 1), [[1.223], [-1.223]]);
 *
 * // Example 5: Compute skewness for a dataset with equal elements (should be NaN)
 * assert.strictEqual(skewness([1, 1, 1, 1, 1]), NaN);
 */
export function skewness(x: array | matrix, flag?: number, dim?: number): number | array | matrix;
