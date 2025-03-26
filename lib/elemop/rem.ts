import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { isnumber, isarray, ismatrix, fix } from "../../index.ts";

/**
 * @function rem
 * @summary Remainder after division
 * @description Computes the remainder after division for each element of `x` divided by the corresponding element of `y`. Works element-wise for arrays and matrices.
 *
 * @param x The dividend
 * @param y The divisor
 * @returns The remainder after division
 * @throws {Error} If no arguments are provided
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Remainder of a vector divided by a scalar
 * assertEquals(rem([13, -7], 2.2), [2, -0.39999999999999947]);
 *
 * // Example 2: Remainder of two vectors
 * assertEquals(rem([13, -7], [5, 6]), [3, -1]);
 *
 * // Example 3: Remainder of two matrices
 * assertEquals(rem([[5, 6, 5], [7, 8, -1]], [[-1, 3, -1], [4, 5, 9]]), [[0, 0, 0], [3, 3, -1]]);
 * ```
 */
export default function rem(x: number, y: number): number;
export default function rem(x: array, y: number): array;
export default function rem(x: matrix, y: number): matrix;
export default function rem(x: array, y: array): array;
export default function rem(x: matrix, y: matrix): matrix;
export default function rem(x: numarraymatrix, y: numarraymatrix): numarraymatrix {
  if (arguments.length === 0) {
    throw new Error("Not enough input arguments");
  }

  if (isnumber(x) && isnumber(y)) {
    const n = fix(x / y);
    return x - n * y;
  }

  if (isarray(x) && isarray(y)) {
    const xArr = x as array;
    const yArr = y as array;
    return xArr.map((val, i) => {
      const n = fix(val / yArr[i]);
      return val - n * yArr[i];
    });
  }

  if (ismatrix(x) && ismatrix(y)) {
    const xMat = x as matrix;
    const yMat = y as matrix;
    return xMat.map((row, i) =>
      row.map((val, j) => {
        const n = fix(val / yMat[i][j]);
        return val - n * yMat[i][j];
      })
    );
  }

  if (isnumber(y)) {
    if (isarray(x)) {
      const xArr = x as array;
      return xArr.map(val => {
        const n = fix(val / y);
        return val - n * y;
      });
    }
    if (ismatrix(x)) {
      const xMat = x as matrix;
      return xMat.map(row =>
        row.map(val => {
          const n = fix(val / y);
          return val - n * y;
        })
      );
    }
  }

  if (isnumber(x)) {
    if (isarray(y)) {
      const yArr = y as array;
      return yArr.map(val => {
        const n = fix(x / val);
        return x - n * val;
      });
    }
    if (ismatrix(y)) {
      const yMat = y as matrix;
      return yMat.map(row =>
        row.map(val => {
          const n = fix(x / val);
          return x - n * val;
        })
      );
    }
  }

  throw new Error("Unsupported input types");
}
