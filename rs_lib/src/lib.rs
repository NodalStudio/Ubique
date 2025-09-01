use nalgebra::DMatrix;
use wasm_bindgen::prelude::*;

/// Performs standard matrix multiplication of two dynamic matrices.
///
/// # Arguments
///
/// * `a` - A slice of f64 values representing the first matrix in row-major order.
/// * `b` - A slice of f64 values representing the second matrix in row-major order.
/// * `rows_a` - The number of rows in the first matrix.
/// * `cols_a` - The number of columns in the first matrix (this must equal the number of rows in the second matrix).
/// * `cols_b` - The number of columns in the second matrix.
///
/// # Returns
///
/// A vector of f64 values representing the resulting matrix in row-major order.
/// The resulting matrix has dimensions `rows_a x cols_b`.
#[wasm_bindgen]
pub fn timeswasm(
  a: &[f64],
  b: &[f64],
  rows_a: usize,
  cols_a: usize,
  cols_b: usize,
) -> Vec<f64> {
  let mat_a = DMatrix::<f64>::from_row_slice(rows_a, cols_a, a);
  let mat_b = DMatrix::<f64>::from_row_slice(cols_a, cols_b, b);
  let result = &mat_a * &mat_b;

  result.as_slice().to_vec()
}
