import type { array, matrix } from "../types.d.ts";
import ismatrix from "../datatype/ismatrix.ts";
import nrows from "../matarrs/nrows.ts";
import zeros from "../matarrs/zeros.ts";
import isarray from "../datatype/isarray.ts";

/**
 * Diagonal matrix creation and extraction of diagonals from a matrix.
 *
 * For an input vector, creates a diagonal matrix. For a matrix input, extracts the k-th diagonal (0: main diagonal, k > 0: above main diagonal, k < 0: below main diagonal).
 *
 * @param x Input array or matrix.
 * @param k Index of the diagonal (0: main diagonal, k > 0 above, k < 0 below). Defaults to 0.
 * @returns Diagonal matrix or array of diagonal values.
 * @throws If the input is neither a vector nor a matrix.
 *
 * @example Create a diagonal matrix from a vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(diag([5, 6, -3]), [[5, 0, 0], [0, 6, 0], [0, 0, -3]]);
 *
 * ```
 *
 * @example Create a diagonal matrix with k = 1
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(diag([5, 6, -3], 1), [[0, 5, 0, 0], [0, 0, 6, 0], [0, 0, 0, -3], [0, 0, 0, 0]]);
 *
 * ```
 *
 * @example Create a diagonal matrix with k = -1
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(diag([5, 6, -3], -1), [[0, 0, 0, 0], [5, 0, 0, 0], [0, 6, 0, 0], [0, 0, -3, 0]]);
 *
 * ```
 *
 * @example Extract the main diagonal from a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(diag([[5, 0, 0], [0, 6, 0], [0, 0, -3]]), [5, 6, -3]);
 *
 * ```
 *
 * @example Extract the first superdiagonal from a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(diag([[0, 5, 0, 0], [0, 0, 6, 0], [0, 0, 0, -3], [0, 0, 0, 0]], 1), [5, 6, -3]);
 *
 * ```
 *
 * @example Extract the first subdiagonal from a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(diag([[0, 0, 0, 0], [5, 0, 0, 0], [0, 6, 0, 0], [0, 0, -3, 0]], -1), [5, 6, -3]);
 *
 * ```
 *
 * @example Extract a diagonal out of bounds (diagonal 2)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(diag([[5, 0, 0], [0, 6, 0], [0, 0, -3]], 2), [0]);
 *
 * ```
 */
export default function diag(x: array): matrix;
export default function diag(x: matrix): array;
export default function diag(x: array, k: number): matrix;
export default function diag(x: matrix, k: number): array;
export default function diag(x: array | matrix, k = 0): array | matrix {
  const absK = Math.abs(k);

  if (isarray(x)) {
    // Create a diagonal matrix from a vector
    const n = x.length;
    const matrixSize = n + absK;
    const out: matrix = zeros(matrixSize, matrixSize);

    for (let i = 0; i < n; i++) {
      const value = x[i] as number; // Safe: isarray confirms 1D array of numbers
      if (k >= 0) {
        out[i][i + absK] = value;
      } else {
        out[i + absK][i] = value;
      }
    }

    return out;
  }

  if (ismatrix(x)) {
    // Extract the k-th diagonal from a matrix
    const rows = nrows(x);
    const out: array = [];

    for (let i = 0; i < rows - absK; i++) {
      if (k >= 0) {
        out.push(x[i][i + absK]);
      } else {
        out.push(x[i + absK][i]);
      }
    }

    return out;
  }

  throw new TypeError("Expected array or matrix");
}
