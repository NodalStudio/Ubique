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

export function __wbindgen_init_externref_table() {
  const table = wasm.__wbindgen_export_0;
  const offset = table.grow(4);
  table.set(0, undefined);
  table.set(offset + 0, undefined);
  table.set(offset + 1, null);
  table.set(offset + 2, true);
  table.set(offset + 3, false);
}
