/** Validate once at the numeric API boundary. */
export function matrixShape(a: number[][]): [number, number] {
  if (
    !Array.isArray(a) || a.length === 0 || !Array.isArray(a[0]) ||
    a[0].length === 0
  ) {
    throw new Error("Expected a nonempty numeric matrix");
  }
  const cols = a[0].length;
  for (const row of a) {
    if (
      !Array.isArray(row) || row.length !== cols
    ) {
      throw new Error("Expected a rectangular numeric matrix");
    }
    for (let j = 0; j < cols; j++) {
      if (typeof row[j] !== "number") {
        throw new Error("Expected numeric matrix entries");
      }
    }
  }
  return [a.length, cols];
}

/** Row-major packing without an intermediate Array.flat allocation. */
export function packRows(a: number[][]): Float64Array {
  const cols = a[0].length;
  const data = new Float64Array(a.length * cols);
  for (let i = 0; i < a.length; i++) data.set(a[i], i * cols);
  return data;
}

export function unpackRows(
  data: Float64Array,
  rows: number,
  cols: number,
): number[][] {
  const out = new Array<number[]>(rows);
  for (let i = 0; i < rows; i++) {
    const row = new Array<number>(cols);
    for (let j = 0; j < cols; j++) row[j] = data[i * cols + j];
    out[i] = row;
  }
  return out;
}
