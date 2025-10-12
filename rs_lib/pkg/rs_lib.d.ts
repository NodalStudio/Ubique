// @generated file from wasmbuild -- do not edit
// deno-lint-ignore-file
// deno-fmt-ignore-file

/**
 * Performs standard matrix multiplication of two dynamic matrices.
 *
 * # Arguments
 *
 * * `a` - A slice of f64 values representing the first matrix in row-major order.
 * * `b` - A slice of f64 values representing the second matrix in row-major order.
 * * `rows_a` - The number of rows in the first matrix.
 * * `cols_a` - The number of columns in the first matrix (this must equal the number of rows in the second matrix).
 * * `cols_b` - The number of columns in the second matrix.
 *
 * # Returns
 *
 * A vector of f64 values representing the resulting matrix in row-major order.
 * The resulting matrix has dimensions `rows_a x cols_b`.
 */
export function timeswasm(
  a: Float64Array,
  b: Float64Array,
  rows_a: number,
  cols_a: number,
  cols_b: number,
): Float64Array;
/**
 * Computes the arithmetic mean of an array.
 *
 * # Arguments
 *
 * * `arr` - A slice of f64 values
 *
 * # Returns
 *
 * The mean value
 */
export function meanwasm(arr: Float64Array): number;
/**
 * Computes the standard deviation of an array using Welford's algorithm.
 *
 * # Arguments
 *
 * * `arr` - A slice of f64 values
 * * `flag` - Normalization flag (0: population, 1: sample)
 *
 * # Returns
 *
 * The standard deviation
 */
export function stdwasm(arr: Float64Array, flag: number): number;
/**
 * Computes the variance of an array using Welford's algorithm.
 *
 * # Arguments
 *
 * * `arr` - A slice of f64 values
 * * `flag` - Normalization flag (0: population, 1: sample)
 *
 * # Returns
 *
 * The variance
 */
export function variancewasm(arr: Float64Array, flag: number): number;
/**
 * Computes the standardized z-scores of an array using Welford's algorithm.
 *
 * # Arguments
 *
 * * `arr` - A slice of f64 values
 * * `flag` - Normalization flag (0: population, 1: sample)
 *
 * # Returns
 *
 * A vector of standardized z-score values
 */
export function zscorewasm(arr: Float64Array, flag: number): Float64Array;
/**
 * Computes the LU decomposition with partial pivoting.
 * Implements the same algorithm as the JavaScript version for consistency.
 *
 * # Arguments
 *
 * * `a` - A slice of f64 values representing the matrix in row-major order
 * * `rows` - The number of rows in the matrix
 * * `cols` - The number of columns in the matrix
 *
 * # Returns
 *
 * A vector encoded as: [sign, pivot[0], ..., pivot[rows-1], LU[0,0], LU[0,1], ...]
 * where:
 * - sign: permutation sign (-1.0 or 1.0)
 * - pivot[i]: permutation indices
 * - LU matrix in row-major order (lower triangle has implicit 1s on diagonal)
 */
export function luwasm(
  a: Float64Array,
  rows: number,
  cols: number,
): Float64Array;
/**
 * Computes the inverse of a square matrix.
 *
 * # Arguments
 *
 * * `a` - A slice of f64 values representing the square matrix in row-major order
 * * `n` - The size of the square matrix (n x n)
 *
 * # Returns
 *
 * A vector of f64 values representing the inverted matrix in row-major order,
 * or a vector of NaN if the matrix is singular
 */
export function invwasm(a: Float64Array, n: number): Float64Array;
/**
 * Computes the determinant of a square matrix using LU decomposition.
 *
 * # Arguments
 *
 * * `a` - A slice of f64 values representing the square matrix in row-major order
 * * `n` - The size of the square matrix (n x n)
 *
 * # Returns
 *
 * The determinant value
 */
export function detwasm(a: Float64Array, n: number): number;
/**
 * Computes the covariance matrix for a data matrix.
 *
 * # Arguments
 *
 * * `data` - A slice of f64 values representing the data matrix in row-major order
 * * `rows` - The number of observations (rows)
 * * `cols` - The number of variables (columns)
 * * `flag` - Normalization flag (0: population, 1: sample)
 *
 * # Returns
 *
 * A vector of f64 values representing the covariance matrix (cols x cols) in row-major order
 */
export function covwasm(
  data: Float64Array,
  rows: number,
  cols: number,
  flag: number,
): Float64Array;
