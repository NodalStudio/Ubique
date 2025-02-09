import { matrix } from '../types';

/**
 * @function vectorfun
 * @summary Applies a function to each vector column or row of a matrix.
 * @description This function applies a given function to each vector (column or row) of a matrix based on the specified dimension.
 *
 * @param dim The dimension to operate along. `0` for rows, `1` for columns.
 * @param x The matrix to process.
 * @param fun The function to apply to each vector.
 * @param args Additional arguments to pass to the function.
 * @returns The result of applying the function to each vector.
 *
 * @throws If insufficient arguments are provided.
 * @throws If `dim` is not 0 or 1.
 * @throws If the third argument is not a function.
 *
 * @example
 * @example
 * // Example 1: Apply function along rows of a matrix
 * const testfun1 = (a, b, c) => a.reduce((sum, num) => sum + num, 0) / a.length * b + c;
 * assert.deepStrictEqual(vectorfun(0, [[5, 6, 5], [7, 8, -1]], testfun1, 5, 10), [[36.666667], [33.333333]]);
 *
 * // Example 2: Apply function along columns of a matrix
 * const testfun2 = (a, b, c) => a.reduce((sum, num) => sum + num, 0) / a.length * b + c;
 * assert.deepStrictEqual(vectorfun(1, [[5, 6, 5], [7, 8, -1]], testfun2, 5, 10), [[40, 45, 20]]);
 *
 * // Example 3: Apply function to a 1D array
 * assert.deepStrictEqual(vectorfun(0, [1, 2, 3], testfun1, 2, 5), [12]);
 *
 * // Example 4: Invalid dimension argument
 * assert.throws(() => { vectorfun(2, [[5, 6, 5], [7, 8, -1]], testfun1, 5, 10) }, Error, 'dimension must be 0 (rows) or 1 (columns)');
 *
 * // Example 5: Missing arguments
 * assert.throws(() => { vectorfun(0, [[5, 6, 5], [7, 8, -1]]) }, Error, 'not enough input arguments');
 *
 * // Example 6: Invalid function argument
 * assert.throws(() => { vectorfun(0, [[5, 6, 5], [7, 8, -1]], "notAFunction", 5, 10) }, Error, 'third input argument must be a function');
 *
 * // Example 7: Apply function to a matrix with empty additional arguments
 * assert.deepStrictEqual(vectorfun(1, [[5, 6, 5], [7, 8, -1]], a => a), [[5, 6, 5], [7, 8, -1]]);
 *
 * // Example 8: Apply function along rows of a single row matrix
 * assert.deepStrictEqual(vectorfun(0, [[5, 6, 5]], testfun1, 3, 2), [[14]]);
 *
 * // Example 9: Apply function along columns of a single column matrix
 * assert.deepStrictEqual(vectorfun(1, [[5], [6], [7]], testfun1, 3, 2), [[17]]);
 *
 * // Example 10: Apply function to a 1D array without additional arguments
 * const sumFunction = a => a.reduce((sum, num) => sum + num, 0);
 * assert.deepStrictEqual(vectorfun(0, [1, 2, 3], sumFunction), [6]);
 */
export function vectorfun(dim: number, x: matrix, fun: Function, ...args: any): any[];
