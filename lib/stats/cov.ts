import { packRows } from "../internal/matrix.ts";
import type { array, matrix } from "../types.d.ts";
import { isarray, ismatrix, varc } from "../../index.ts";
import { covwasm } from "../../rs_lib/pkg/rs_lib.js";

/**
 * Covariance matrix.
 *
 * Calculates the covariance matrix between arrays or matrices. For a single vector,
 * returns the variance. For two vectors, returns the 2x2 covariance matrix. For a matrix,
 * returns the covariance matrix between columns.
 *
 * @param x Input array or matrix
 * @param y Optional second input array or matrix, or flag value (0 or 1)
 * @param flag Optional Bessel's correction (0: population, 1: sample). Default is 1
 * @returns Covariance matrix or scalar variance
 * @throws When input dimensions do not agree
 *
 * @example Sample covariance (variance) of single array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cov([1, 2, 3]), 1);
 *
 * ```
 *
 * @example Population covariance with flag=0
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cov([1, 2, 3], 0), 0.6666666666666666);
 *
 * ```
 *
 * @example Covariance matrix from 2x2 data matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cov([[1, 2], [3, 4]]), [[2, 2], [2, 2]]);
 * ```
 */
export default function cov(x: array): number;
/**
 * Covariance matrix.
 *
 * Calculates the covariance matrix between arrays or matrices. For a single vector,
 * returns the variance. For two vectors, returns the 2x2 covariance matrix. For a matrix,
 * returns the covariance matrix between columns.
 *
 * @param x Input array or matrix
 * @param y Optional second input array or matrix, or flag value (0 or 1)
 * @param flag Optional Bessel's correction (0: population, 1: sample). Default is 1
 * @returns Covariance matrix or scalar variance
 * @throws When input dimensions do not agree
 *
 * @example Sample covariance (variance) of single array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cov([1, 2, 3]), 1);
 *
 * ```
 *
 * @example Population covariance with flag=0
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cov([1, 2, 3], 0), 0.6666666666666666);
 *
 * ```
 *
 * @example Covariance matrix from 2x2 data matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cov([[1, 2], [3, 4]]), [[2, 2], [2, 2]]);
 * ```
 */
export default function cov(x: array, flag: 0 | 1): number;
/**
 * Covariance matrix.
 *
 * Calculates the covariance matrix between arrays or matrices. For a single vector,
 * returns the variance. For two vectors, returns the 2x2 covariance matrix. For a matrix,
 * returns the covariance matrix between columns.
 *
 * @param x Input array or matrix
 * @param y Optional second input array or matrix, or flag value (0 or 1)
 * @param flag Optional Bessel's correction (0: population, 1: sample). Default is 1
 * @returns Covariance matrix or scalar variance
 * @throws When input dimensions do not agree
 *
 * @example Sample covariance (variance) of single array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cov([1, 2, 3]), 1);
 *
 * ```
 *
 * @example Population covariance with flag=0
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cov([1, 2, 3], 0), 0.6666666666666666);
 *
 * ```
 *
 * @example Covariance matrix from 2x2 data matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cov([[1, 2], [3, 4]]), [[2, 2], [2, 2]]);
 * ```
 */
export default function cov(x: array, y: array, flag?: 0 | 1): matrix;
/**
 * Covariance matrix.
 *
 * Calculates the covariance matrix between arrays or matrices. For a single vector,
 * returns the variance. For two vectors, returns the 2x2 covariance matrix. For a matrix,
 * returns the covariance matrix between columns.
 *
 * @param x Input array or matrix
 * @param y Optional second input array or matrix, or flag value (0 or 1)
 * @param flag Optional Bessel's correction (0: population, 1: sample). Default is 1
 * @returns Covariance matrix or scalar variance
 * @throws When input dimensions do not agree
 *
 * @example Sample covariance (variance) of single array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cov([1, 2, 3]), 1);
 *
 * ```
 *
 * @example Population covariance with flag=0
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cov([1, 2, 3], 0), 0.6666666666666666);
 *
 * ```
 *
 * @example Covariance matrix from 2x2 data matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cov([[1, 2], [3, 4]]), [[2, 2], [2, 2]]);
 * ```
 */
export default function cov(x: matrix, flag?: 0 | 1): matrix;
/**
 * Covariance matrix.
 *
 * Calculates the covariance matrix between arrays or matrices. For a single vector,
 * returns the variance. For two vectors, returns the 2x2 covariance matrix. For a matrix,
 * returns the covariance matrix between columns.
 *
 * @param x Input array or matrix
 * @param y Optional second input array or matrix, or flag value (0 or 1)
 * @param flag Optional Bessel's correction (0: population, 1: sample). Default is 1
 * @returns Covariance matrix or scalar variance
 * @throws When input dimensions do not agree
 *
 * @example Sample covariance (variance) of single array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cov([1, 2, 3]), 1);
 *
 * ```
 *
 * @example Population covariance with flag=0
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cov([1, 2, 3], 0), 0.6666666666666666);
 *
 * ```
 *
 * @example Covariance matrix from 2x2 data matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cov([[1, 2], [3, 4]]), [[2, 2], [2, 2]]);
 * ```
 */
export default function cov(
  x: array | matrix,
  y?: array | matrix | number,
  flag?: number,
): number | matrix {
  // Process arguments to handle optional parameters
  let actualFlag = 1; // Default flag value
  let actualY: array | matrix | undefined = undefined;

  if (typeof y === "number" && (y === 0 || y === 1)) {
    // y is being used as the flag
    actualFlag = y;
  } else if (y !== undefined) {
    // y is a second array/matrix
    actualY = y as array | matrix;

    if (typeof flag === "number" && (flag === 0 || flag === 1)) {
      actualFlag = flag;
    }
  }

  // Case 1: Single vector - return variance
  if (actualY === undefined && isarray(x)) {
    return varc(x as array, actualFlag as 0 | 1);
  }

  // Case 2: Two vectors - calculate 2x2 covariance matrix
  if (actualY !== undefined && isarray(x) && isarray(actualY)) {
    const flatX = x as array;
    const flatY = actualY as array;

    if (flatX.length !== flatY.length) {
      throw new Error("input dimension must agree");
    }

    const varX = varc(flatX, actualFlag as 0 | 1);
    const varY = varc(flatY, actualFlag as 0 | 1);

    // Calculate covariance between X and Y
    const originX = flatX[0], originY = flatY[0];
    const meanX = flatX.reduce(
      (sum, v) => sum + (v - originX) / flatX.length,
      0,
    );
    const meanY = flatY.reduce(
      (sum, v) => sum + (v - originY) / flatY.length,
      0,
    );
    const n = flatX.length;

    let covXY = 0;
    for (let i = 0; i < n; i++) {
      covXY += ((flatX[i] - originX) - meanX) * ((flatY[i] - originY) - meanY);
    }
    covXY = covXY / (n - actualFlag);

    return [
      [varX, covXY],
      [covXY, varY],
    ];
  }

  // Case 3: Matrix input - calculate covariance matrix between columns
  if (ismatrix(x)) {
    const matrix = x as matrix;
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    // Use WASM for all matrices (benchmarks show it's consistently faster)
    if (typeof covwasm === "function") {
      const flatData = packRows(matrix);
      const flatResult = covwasm(flatData, numRows, numCols, actualFlag);

      // Reshape flat result back to matrix
      const result: matrix = [];
      for (let i = 0; i < numCols; i++) {
        result[i] = [];
        for (let j = 0; j < numCols; j++) {
          result[i][j] = flatResult[i * numCols + j];
        }
      }
      return result;
    }

    // JavaScript fallback only if WASM not available
    const result: matrix = [];

    // Initialize result matrix
    for (let i = 0; i < numCols; i++) {
      result[i] = [];
    }

    // Calculate covariance between each pair of columns
    for (let i = 0; i < numCols; i++) {
      for (let j = 0; j < numCols; j++) {
        const colI = matrix.map((row) => row[i]);
        const colJ = matrix.map((row) => row[j]);

        if (i === j) {
          // Variance on diagonal
          result[i][j] = varc(colI, actualFlag as 0 | 1);
        } else {
          // Covariance off diagonal
          const originI = colI[0], originJ = colJ[0];
          const meanI = colI.reduce(
            (sum, v) => sum + (v - originI) / colI.length,
            0,
          );
          const meanJ = colJ.reduce(
            (sum, v) => sum + (v - originJ) / colJ.length,
            0,
          );
          const n = colI.length;

          let cov = 0;
          for (let k = 0; k < n; k++) {
            cov += ((colI[k] - originI) - meanI) *
              ((colJ[k] - originJ) - meanJ);
          }
          result[i][j] = cov / (n - actualFlag);
        }
      }
    }

    return result;
  }

  throw new Error("Invalid input types for covariance calculation");
}
