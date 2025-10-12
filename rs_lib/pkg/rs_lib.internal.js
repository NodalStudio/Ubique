// @generated file from wasmbuild -- do not edit
// @ts-nocheck: generated
// deno-lint-ignore-file
// deno-fmt-ignore-file

let wasm;
export function __wbg_set_wasm(val) {
  wasm = val;
}

let cachedFloat64ArrayMemory0 = null;

function getFloat64ArrayMemory0() {
  if (
    cachedFloat64ArrayMemory0 === null ||
    cachedFloat64ArrayMemory0.byteLength === 0
  ) {
    cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
  }
  return cachedFloat64ArrayMemory0;
}

let WASM_VECTOR_LEN = 0;

function passArrayF64ToWasm0(arg, malloc) {
  const ptr = malloc(arg.length * 8, 8) >>> 0;
  getFloat64ArrayMemory0().set(arg, ptr / 8);
  WASM_VECTOR_LEN = arg.length;
  return ptr;
}

function getArrayF64FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}
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
 * @param {Float64Array} a
 * @param {Float64Array} b
 * @param {number} rows_a
 * @param {number} cols_a
 * @param {number} cols_b
 * @returns {Float64Array}
 */
export function timeswasm(a, b, rows_a, cols_a, cols_b) {
  const ptr0 = passArrayF64ToWasm0(a, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ptr1 = passArrayF64ToWasm0(b, wasm.__wbindgen_malloc);
  const len1 = WASM_VECTOR_LEN;
  const ret = wasm.timeswasm(ptr0, len0, ptr1, len1, rows_a, cols_a, cols_b);
  var v3 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
  wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
  return v3;
}

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
 * @param {Float64Array} arr
 * @returns {number}
 */
export function meanwasm(arr) {
  const ptr0 = passArrayF64ToWasm0(arr, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.meanwasm(ptr0, len0);
  return ret;
}

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
 * @param {Float64Array} arr
 * @param {number} flag
 * @returns {number}
 */
export function stdwasm(arr, flag) {
  const ptr0 = passArrayF64ToWasm0(arr, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.stdwasm(ptr0, len0, flag);
  return ret;
}

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
 * @param {Float64Array} arr
 * @param {number} flag
 * @returns {number}
 */
export function variancewasm(arr, flag) {
  const ptr0 = passArrayF64ToWasm0(arr, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.variancewasm(ptr0, len0, flag);
  return ret;
}

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
 * @param {Float64Array} arr
 * @param {number} flag
 * @returns {Float64Array}
 */
export function zscorewasm(arr, flag) {
  const ptr0 = passArrayF64ToWasm0(arr, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.zscorewasm(ptr0, len0, flag);
  var v2 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
  wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
  return v2;
}

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
 * @param {Float64Array} a
 * @param {number} rows
 * @param {number} cols
 * @returns {Float64Array}
 */
export function luwasm(a, rows, cols) {
  const ptr0 = passArrayF64ToWasm0(a, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.luwasm(ptr0, len0, rows, cols);
  var v2 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
  wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
  return v2;
}

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
 * @param {Float64Array} a
 * @param {number} n
 * @returns {Float64Array}
 */
export function invwasm(a, n) {
  const ptr0 = passArrayF64ToWasm0(a, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.invwasm(ptr0, len0, n);
  var v2 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
  wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
  return v2;
}

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
 * @param {Float64Array} a
 * @param {number} n
 * @returns {number}
 */
export function detwasm(a, n) {
  const ptr0 = passArrayF64ToWasm0(a, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.detwasm(ptr0, len0, n);
  return ret;
}

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
 * @param {Float64Array} data
 * @param {number} rows
 * @param {number} cols
 * @param {number} flag
 * @returns {Float64Array}
 */
export function covwasm(data, rows, cols, flag) {
  const ptr0 = passArrayF64ToWasm0(data, wasm.__wbindgen_malloc);
  const len0 = WASM_VECTOR_LEN;
  const ret = wasm.covwasm(ptr0, len0, rows, cols, flag);
  var v2 = getArrayF64FromWasm0(ret[0], ret[1]).slice();
  wasm.__wbindgen_free(ret[0], ret[1] * 8, 8);
  return v2;
}

export function __wbindgen_init_externref_table() {
  const table = wasm.__wbindgen_export_0;
  const offset = table.grow(4);
  table.set(0, undefined);
  table.set(offset + 0, undefined);
  table.set(offset + 1, null);
  table.set(offset + 2, true);
  table.set(offset + 3, false);
}
