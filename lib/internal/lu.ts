import { matrixShape } from "./matrix.ts";

export function finiteMatrix(a: number[][]): [number, number] {
  const shape = matrixShape(a);
  for (const row of a) {
    for (const x of row) {
      if (!Number.isFinite(x)) throw new Error("Matrix entries must be finite");
    }
  }
  return shape;
}

/** Partial row pivoting, with no rank decision and no mutation of the input. */
export function factorLU(a: number[][]) {
  const m = a.length, n = a[0].length;
  const data = a.map((row) => row.slice());
  const permutation = Array.from({ length: m }, (_, i) => i);
  let sign = 1;
  for (let j = 0; j < Math.min(m, n); j++) {
    let pivot = j;
    for (let i = j + 1; i < m; i++) {
      if (Math.abs(data[i][j]) > Math.abs(data[pivot][j])) pivot = i;
    }
    if (pivot !== j) {
      [data[pivot], data[j]] = [data[j], data[pivot]];
      [permutation[pivot], permutation[j]] = [
        permutation[j],
        permutation[pivot],
      ];
      sign = -sign;
    }
    if (data[j][j] !== 0) {
      for (let i = j + 1; i < m; i++) {
        data[i][j] /= data[j][j];
        for (let k = j + 1; k < n; k++) data[i][k] -= data[i][j] * data[j][k];
      }
    }
  }
  return { data, permutation, sign };
}

/** Row equilibration makes the pivot policy invariant to row units/scales.
 * A pivot <= relativeTolerance is numerically singular. This is a pivot test,
 * not an SVD rank or condition-number estimate. Zero tolerance tests exact zeros.
 */
export function prepareSquare(a: number[][], relativeTolerance?: number) {
  const [rows, cols] = finiteMatrix(a);
  if (rows !== cols) throw new Error("Matrix must be square");
  const tolerance = relativeTolerance ?? rows * Number.EPSILON;
  if (!Number.isFinite(tolerance) || tolerance < 0) {
    throw new RangeError("Relative tolerance must be finite and nonnegative");
  }
  const scales = a.map((row) =>
    row.reduce((m, x) => Math.max(m, Math.abs(x)), 0) || 1
  );
  const normalized = a.map((row, i) => row.map((x) => x / scales[i]));
  const factor = factorLU(normalized);
  const singular = factor.data.some((row, i) =>
    !Number.isFinite(row[i]) || Math.abs(row[i]) <= tolerance
  );
  return { ...factor, scales, singular };
}
