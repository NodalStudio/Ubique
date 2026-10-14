use nalgebra::{DMatrix, DMatrixView, DVector};
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
pub fn timeswasm(a: &[f64], b: &[f64], rows_a: usize, cols_a: usize, cols_b: usize) -> Vec<f64> {
    // Row-major A/B are column-major views of Aᵀ/Bᵀ. Computing BᵀAᵀ
    // produces Cᵀ whose contiguous storage is already row-major C.
    // Borrow the input slices instead of allocating/reordering two matrices.
    let at = DMatrixView::<f64>::from_slice(a, cols_a, rows_a);
    let bt = DMatrixView::<f64>::from_slice(b, cols_b, cols_a);
    let result = bt * at;
    result.data.into()
}

/// Computes the arithmetic mean of an array.
///
/// # Arguments
///
/// * `arr` - A slice of f64 values
///
/// # Returns
///
/// The mean value
#[wasm_bindgen]
pub fn meanwasm(arr: &[f64]) -> f64 {
    let vec = DVector::from_row_slice(arr);
    vec.mean()
}

/// Computes the standard deviation of an array using Welford's algorithm.
///
/// # Arguments
///
/// * `arr` - A slice of f64 values
/// * `flag` - Normalization flag (0: population, 1: sample)
///
/// # Returns
///
/// The standard deviation
#[wasm_bindgen]
pub fn stdwasm(arr: &[f64], flag: u8) -> f64 {
    let n = arr.len();
    if n == 0 {
        return f64::NAN;
    }
    if n == 1 {
        return if flag == 1 { f64::NAN } else { 0.0 };
    }

    // Welford's algorithm for numerically stable variance
    let mut mean = 0.0;
    let mut m2 = 0.0;

    for (i, &x) in arr.iter().enumerate() {
        let delta = x - mean;
        mean += delta / (i + 1) as f64;
        let delta2 = x - mean;
        m2 += delta * delta2;
    }

    let variance = m2 / (n - flag as usize) as f64;
    variance.sqrt()
}

/// Computes the variance of an array using Welford's algorithm.
///
/// # Arguments
///
/// * `arr` - A slice of f64 values
/// * `flag` - Normalization flag (0: population, 1: sample)
///
/// # Returns
///
/// The variance
#[wasm_bindgen]
pub fn variancewasm(arr: &[f64], flag: u8) -> f64 {
    let n = arr.len();
    if n == 0 {
        return f64::NAN;
    }
    if n == 1 {
        return if flag == 1 { f64::NAN } else { 0.0 };
    }

    // Welford's algorithm for numerically stable variance
    let mut mean = 0.0;
    let mut m2 = 0.0;

    for (i, &x) in arr.iter().enumerate() {
        let delta = x - mean;
        mean += delta / (i + 1) as f64;
        let delta2 = x - mean;
        m2 += delta * delta2;
    }

    m2 / (n - flag as usize) as f64
}

/// Computes the standardized z-scores of an array using Welford's algorithm.
///
/// # Arguments
///
/// * `arr` - A slice of f64 values
/// * `flag` - Normalization flag (0: population, 1: sample)
///
/// # Returns
///
/// A vector of standardized z-score values
#[wasm_bindgen]
pub fn zscorewasm(arr: &[f64], flag: u8) -> Vec<f64> {
    let n = arr.len();
    if n == 0 {
        return Vec::new();
    }
    if n == 1 {
        return vec![0.0];
    }

    // Welford's algorithm for numerically stable variance
    let mut mean = 0.0;
    let mut m2 = 0.0;

    for (i, &x) in arr.iter().enumerate() {
        let delta = x - mean;
        mean += delta / (i + 1) as f64;
        let delta2 = x - mean;
        m2 += delta * delta2;
    }

    let variance = m2 / (n - flag as usize) as f64;
    let std_dev = variance.sqrt();

    // Standardize: (x - mean) / std
    if std_dev == 0.0 {
        // All values are the same
        vec![0.0; n]
    } else {
        arr.iter().map(|&val| (val - mean) / std_dev).collect()
    }
}

/// Computes the LU decomposition with partial pivoting.
/// Implements the same algorithm as the JavaScript version for consistency.
///
/// # Arguments
///
/// * `a` - A slice of f64 values representing the matrix in row-major order
/// * `rows` - The number of rows in the matrix
/// * `cols` - The number of columns in the matrix
///
/// # Returns
///
/// A vector encoded as: [sign, pivot[0], ..., pivot[rows-1], LU[0,0], LU[0,1], ...]
/// where:
/// - sign: permutation sign (-1.0 or 1.0)
/// - pivot[i]: permutation indices
/// - LU matrix in row-major order (lower triangle has implicit 1s on diagonal)
#[wasm_bindgen]
pub fn luwasm(a: &[f64], rows: usize, cols: usize) -> Vec<f64> {
    // Clone input matrix
    let mut lu_mat = a.to_vec();

    // Initialize pivot vector (zero-based)
    let mut piv: Vec<usize> = (0..rows).collect();
    let mut pivsign = 1;

    // LU decomposition with partial pivoting (Doolittle algorithm)
    for j in 0..rows.min(cols) {
        // Find pivot element in current column
        let mut max_index = j;
        for i in (j + 1)..rows {
            if lu_mat[i * cols + j].abs() > lu_mat[max_index * cols + j].abs() {
                max_index = i;
            }
        }

        // Swap rows if needed
        if max_index != j {
            for k in 0..cols {
                let temp = lu_mat[max_index * cols + k];
                lu_mat[max_index * cols + k] = lu_mat[j * cols + k];
                lu_mat[j * cols + k] = temp;
            }
            // Update pivot vector
            let temp_piv = piv[max_index];
            piv[max_index] = piv[j];
            piv[j] = temp_piv;
            pivsign = -pivsign;
        }

        // Perform elimination below pivot
        if lu_mat[j * cols + j] != 0.0 {
            for i in (j + 1)..rows {
                lu_mat[i * cols + j] /= lu_mat[j * cols + j];
                for k in (j + 1)..cols {
                    lu_mat[i * cols + k] -= lu_mat[i * cols + j] * lu_mat[j * cols + k];
                }
            }
        }
    }

    // Build result: [sign, pivot indices, LU matrix]
    let mut result = Vec::with_capacity(1 + rows + rows * cols);
    result.push(pivsign as f64);

    // Add pivot indices
    for &idx in &piv {
        result.push(idx as f64);
    }

    // Add LU matrix
    result.extend_from_slice(&lu_mat);

    result
}

/// Computes the inverse of a square matrix.
///
/// # Arguments
///
/// * `a` - A slice of f64 values representing the square matrix in row-major order
/// * `n` - The size of the square matrix (n x n)
///
/// # Returns
///
/// A vector of f64 values representing the inverted matrix in row-major order,
/// or a vector of NaN if the matrix is singular
#[wasm_bindgen]
pub fn invwasm(a: &[f64], n: usize) -> Vec<f64> {
    let scales: Vec<f64> = (0..n)
        .map(|i| {
            a[i * n..(i + 1) * n]
                .iter()
                .fold(0.0_f64, |s, v| s.max(v.abs()))
        })
        .collect();
    if scales.iter().any(|s| *s == 0.0 || !s.is_finite()) {
        return vec![f64::NAN; n * n];
    }
    let normalized: Vec<f64> = a
        .iter()
        .enumerate()
        .map(|(idx, v)| v / scales[idx / n])
        .collect();
    let factor = DMatrix::<f64>::from_row_slice(n, n, &normalized).lu();
    let u = factor.u();
    let tolerance = n as f64 * f64::EPSILON;
    if (0..n).any(|i| !u[(i, i)].is_finite() || u[(i, i)].abs() <= tolerance) {
        return vec![f64::NAN; n * n];
    }
    match factor.try_inverse() {
        Some(inv) => {
            let mut output = Vec::with_capacity(n * n);
            for i in 0..n {
                for j in 0..n {
                    output.push(inv[(i, j)] / scales[j]);
                }
            }
            output
        }
        None => vec![f64::NAN; n * n],
    }
}

/// Computes the determinant of a square matrix using LU decomposition.
///
/// # Arguments
///
/// * `a` - A slice of f64 values representing the square matrix in row-major order
/// * `n` - The size of the square matrix (n x n)
///
/// # Returns
///
/// The determinant value
#[wasm_bindgen]
pub fn detwasm(a: &[f64], n: usize) -> f64 {
    let mat = DMatrix::<f64>::from_row_slice(n, n, a);
    let det = mat.determinant();
    if det == 0.0 {
        0.0
    } else {
        det
    }
}

/// Computes the covariance matrix for a data matrix.
///
/// # Arguments
///
/// * `data` - A slice of f64 values representing the data matrix in row-major order
/// * `rows` - The number of observations (rows)
/// * `cols` - The number of variables (columns)
/// * `flag` - Normalization flag (0: population, 1: sample)
///
/// # Returns
///
/// A vector of f64 values representing the covariance matrix (cols x cols) in row-major order
#[wasm_bindgen]
pub fn covwasm(data: &[f64], rows: usize, cols: usize, flag: u8) -> Vec<f64> {
    // Center relative to an observed origin before averaging. Adding the large
    // origin back would round away the small mean correction.
    let mut centered = DMatrix::<f64>::from_row_slice(rows, cols, data);
    for j in 0..cols {
        let origin = centered[(0, j)];
        let mut mean_delta = 0.0;
        for i in 0..rows {
            centered[(i, j)] -= origin;
            mean_delta += centered[(i, j)] / rows as f64;
        }
        for i in 0..rows {
            centered[(i, j)] -= mean_delta;
        }
    }

    // Compute covariance: (1/(n-flag)) * X^T * X
    let cov_mat = (centered.transpose() * centered) / (rows - flag as usize) as f64;

    // Convert to row-major order
    let mut output = Vec::with_capacity(cols * cols);
    for i in 0..cols {
        for j in 0..cols {
            output.push(cov_mat[(i, j)]);
        }
    }

    output
}

/// An owned column-major matrix kept in WASM across operations.
#[wasm_bindgen]
pub struct MatrixBuffer {
    data: DMatrix<f64>,
}

#[wasm_bindgen]
impl MatrixBuffer {
    #[wasm_bindgen(constructor)]
    pub fn new(rows: usize, cols: usize) -> MatrixBuffer {
        MatrixBuffer {
            data: DMatrix::zeros(rows, cols),
        }
    }

    pub fn data_ptr(&self) -> usize {
        self.data.as_ptr() as usize
    }

    /// Overwrites output; callers must not alias it with either input.
    pub fn multiply_into(&self, rhs: &MatrixBuffer, out: &mut MatrixBuffer) -> Result<(), JsValue> {
        if self.data.ncols() != rhs.data.nrows()
            || out.data.nrows() != self.data.nrows()
            || out.data.ncols() != rhs.data.ncols()
        {
            return Err(JsValue::from_str("Matrix dimensions must agree"));
        }
        out.data.gemm(1.0, &self.data, &rhs.data, 0.0);
        Ok(())
    }
}

/// Exposes the current memory so JavaScript can fill resident buffers directly.
#[wasm_bindgen]
pub fn matrix_memory() -> JsValue {
    wasm_bindgen::memory()
}

/// IEEE binary64 special functions from libm, including accurate small tails.
#[wasm_bindgen]
pub fn erfwasm(x: f64) -> f64 {
    libm::erf(x)
}
#[wasm_bindgen]
pub fn erfcwasm(x: f64) -> f64 {
    libm::erfc(x)
}
