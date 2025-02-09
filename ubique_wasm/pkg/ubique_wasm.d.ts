/* tslint:disable */
/* eslint-disable */
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
