import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { isarray, ismatrix, isnumber } from "../../index.ts";

/**
 * Less than comparison X < Y.
 *
 * Compares two inputs element-wise, returning true where elements in X are less than corresponding elements in Y.
 *
 * @param x First operand for comparison
 * @param y Second operand for comparison
 * @returns The result of the comparison
 * @throws If the input dimensions do not agree or if no arguments are provided
 *
 * @example Comparison between two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, 5), false);
 *
 * ```
 *
 * @example Comparison between a number and an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, [5, 6, 3]), [false, true, false]);
 *
 * ```
 *
 * @example Comparison between a number and a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, [[5, 6], [3, 5]]), [[false, true], [false, false]]);
 *
 * ```
 *
 * @example Comparison between an array and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([5, 6, 3], 5), [false, false, true]);
 *
 * ```
 *
 * @example Comparison between a matrix and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([[5, 6], [3, 5]], 5), [[false, false], [true, false]]);
 *
 * ```
 *
 * @example Comparison between two arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([5, 6, 3], [2, 6, 0]), [false, false, false]);
 *
 * ```
 *
 * @example Comparison between two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[false, false], [true, true]]);
 * ```
 */
export default function lt(x: number, y: number): boolean;
/**
 * Less than comparison X < Y.
 *
 * Compares two inputs element-wise, returning true where elements in X are less than corresponding elements in Y.
 *
 * @param x First operand for comparison
 * @param y Second operand for comparison
 * @returns The result of the comparison
 * @throws If the input dimensions do not agree or if no arguments are provided
 *
 * @example Comparison between two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, 5), false);
 *
 * ```
 *
 * @example Comparison between a number and an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, [5, 6, 3]), [false, true, false]);
 *
 * ```
 *
 * @example Comparison between a number and a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, [[5, 6], [3, 5]]), [[false, true], [false, false]]);
 *
 * ```
 *
 * @example Comparison between an array and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([5, 6, 3], 5), [false, false, true]);
 *
 * ```
 *
 * @example Comparison between a matrix and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([[5, 6], [3, 5]], 5), [[false, false], [true, false]]);
 *
 * ```
 *
 * @example Comparison between two arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([5, 6, 3], [2, 6, 0]), [false, false, false]);
 *
 * ```
 *
 * @example Comparison between two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[false, false], [true, true]]);
 * ```
 */
export default function lt(x: number, y: array): boolean[];
/**
 * Less than comparison X < Y.
 *
 * Compares two inputs element-wise, returning true where elements in X are less than corresponding elements in Y.
 *
 * @param x First operand for comparison
 * @param y Second operand for comparison
 * @returns The result of the comparison
 * @throws If the input dimensions do not agree or if no arguments are provided
 *
 * @example Comparison between two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, 5), false);
 *
 * ```
 *
 * @example Comparison between a number and an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, [5, 6, 3]), [false, true, false]);
 *
 * ```
 *
 * @example Comparison between a number and a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, [[5, 6], [3, 5]]), [[false, true], [false, false]]);
 *
 * ```
 *
 * @example Comparison between an array and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([5, 6, 3], 5), [false, false, true]);
 *
 * ```
 *
 * @example Comparison between a matrix and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([[5, 6], [3, 5]], 5), [[false, false], [true, false]]);
 *
 * ```
 *
 * @example Comparison between two arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([5, 6, 3], [2, 6, 0]), [false, false, false]);
 *
 * ```
 *
 * @example Comparison between two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[false, false], [true, true]]);
 * ```
 */
export default function lt(x: array, y: number): boolean[];
/**
 * Less than comparison X < Y.
 *
 * Compares two inputs element-wise, returning true where elements in X are less than corresponding elements in Y.
 *
 * @param x First operand for comparison
 * @param y Second operand for comparison
 * @returns The result of the comparison
 * @throws If the input dimensions do not agree or if no arguments are provided
 *
 * @example Comparison between two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, 5), false);
 *
 * ```
 *
 * @example Comparison between a number and an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, [5, 6, 3]), [false, true, false]);
 *
 * ```
 *
 * @example Comparison between a number and a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, [[5, 6], [3, 5]]), [[false, true], [false, false]]);
 *
 * ```
 *
 * @example Comparison between an array and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([5, 6, 3], 5), [false, false, true]);
 *
 * ```
 *
 * @example Comparison between a matrix and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([[5, 6], [3, 5]], 5), [[false, false], [true, false]]);
 *
 * ```
 *
 * @example Comparison between two arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([5, 6, 3], [2, 6, 0]), [false, false, false]);
 *
 * ```
 *
 * @example Comparison between two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[false, false], [true, true]]);
 * ```
 */
export default function lt(x: array, y: array): boolean[];
/**
 * Less than comparison X < Y.
 *
 * Compares two inputs element-wise, returning true where elements in X are less than corresponding elements in Y.
 *
 * @param x First operand for comparison
 * @param y Second operand for comparison
 * @returns The result of the comparison
 * @throws If the input dimensions do not agree or if no arguments are provided
 *
 * @example Comparison between two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, 5), false);
 *
 * ```
 *
 * @example Comparison between a number and an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, [5, 6, 3]), [false, true, false]);
 *
 * ```
 *
 * @example Comparison between a number and a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, [[5, 6], [3, 5]]), [[false, true], [false, false]]);
 *
 * ```
 *
 * @example Comparison between an array and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([5, 6, 3], 5), [false, false, true]);
 *
 * ```
 *
 * @example Comparison between a matrix and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([[5, 6], [3, 5]], 5), [[false, false], [true, false]]);
 *
 * ```
 *
 * @example Comparison between two arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([5, 6, 3], [2, 6, 0]), [false, false, false]);
 *
 * ```
 *
 * @example Comparison between two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[false, false], [true, true]]);
 * ```
 */
export default function lt(x: number, y: matrix): boolean[][];
/**
 * Less than comparison X < Y.
 *
 * Compares two inputs element-wise, returning true where elements in X are less than corresponding elements in Y.
 *
 * @param x First operand for comparison
 * @param y Second operand for comparison
 * @returns The result of the comparison
 * @throws If the input dimensions do not agree or if no arguments are provided
 *
 * @example Comparison between two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, 5), false);
 *
 * ```
 *
 * @example Comparison between a number and an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, [5, 6, 3]), [false, true, false]);
 *
 * ```
 *
 * @example Comparison between a number and a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, [[5, 6], [3, 5]]), [[false, true], [false, false]]);
 *
 * ```
 *
 * @example Comparison between an array and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([5, 6, 3], 5), [false, false, true]);
 *
 * ```
 *
 * @example Comparison between a matrix and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([[5, 6], [3, 5]], 5), [[false, false], [true, false]]);
 *
 * ```
 *
 * @example Comparison between two arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([5, 6, 3], [2, 6, 0]), [false, false, false]);
 *
 * ```
 *
 * @example Comparison between two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[false, false], [true, true]]);
 * ```
 */
export default function lt(x: matrix, y: number): boolean[][];
/**
 * Less than comparison X < Y.
 *
 * Compares two inputs element-wise, returning true where elements in X are less than corresponding elements in Y.
 *
 * @param x First operand for comparison
 * @param y Second operand for comparison
 * @returns The result of the comparison
 * @throws If the input dimensions do not agree or if no arguments are provided
 *
 * @example Comparison between two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, 5), false);
 *
 * ```
 *
 * @example Comparison between a number and an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, [5, 6, 3]), [false, true, false]);
 *
 * ```
 *
 * @example Comparison between a number and a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, [[5, 6], [3, 5]]), [[false, true], [false, false]]);
 *
 * ```
 *
 * @example Comparison between an array and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([5, 6, 3], 5), [false, false, true]);
 *
 * ```
 *
 * @example Comparison between a matrix and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([[5, 6], [3, 5]], 5), [[false, false], [true, false]]);
 *
 * ```
 *
 * @example Comparison between two arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([5, 6, 3], [2, 6, 0]), [false, false, false]);
 *
 * ```
 *
 * @example Comparison between two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[false, false], [true, true]]);
 * ```
 */
export default function lt(x: matrix, y: matrix): boolean[][];
/**
 * Less than comparison X < Y.
 *
 * Compares two inputs element-wise, returning true where elements in X are less than corresponding elements in Y.
 *
 * @param x First operand for comparison
 * @param y Second operand for comparison
 * @returns The result of the comparison
 * @throws If the input dimensions do not agree or if no arguments are provided
 *
 * @example Comparison between two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, 5), false);
 *
 * ```
 *
 * @example Comparison between a number and an array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, [5, 6, 3]), [false, true, false]);
 *
 * ```
 *
 * @example Comparison between a number and a matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt(5, [[5, 6], [3, 5]]), [[false, true], [false, false]]);
 *
 * ```
 *
 * @example Comparison between an array and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([5, 6, 3], 5), [false, false, true]);
 *
 * ```
 *
 * @example Comparison between a matrix and a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([[5, 6], [3, 5]], 5), [[false, false], [true, false]]);
 *
 * ```
 *
 * @example Comparison between two arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([5, 6, 3], [2, 6, 0]), [false, false, false]);
 *
 * ```
 *
 * @example Comparison between two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(lt([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[false, false], [true, true]]);
 * ```
 */
export default function lt(
  x: numarraymatrix,
  y: numarraymatrix,
): boolean | boolean[] | boolean[][] {
  if (isnumber(x) && isnumber(y)) {
    return x < y;
  }

  if (isarray(x) && isarray(y)) {
    return elementwiseArrayComparison(x as array, y as array);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return elementwiseMatrixComparison(x as matrix, y as matrix);
  }

  if (isnumber(x)) {
    if (isarray(y)) {
      return (y as array).map((val) => x < val);
    }
    if (ismatrix(y)) {
      return (y as matrix).map((row) => row.map((val) => x < val));
    }
  }

  if (isnumber(y)) {
    if (isarray(x)) {
      return (x as array).map((val) => val < y);
    }
    if (ismatrix(x)) {
      return (x as matrix).map((row) => row.map((val) => val < y));
    }
  }

  if (isarray(x) && ismatrix(y)) {
    return (y as matrix).map((row) =>
      row.map((val, j) => (x as array)[j] < val)
    );
  }

  if (ismatrix(x) && isarray(y)) {
    return (x as matrix).map((row) =>
      row.map((val, j) => val < (y as array)[j])
    );
  }

  throw new Error("Unsupported input types");
}

/**
 * Element-wise comparison of two arrays.
 */
function elementwiseArrayComparison(x: array, y: array): boolean[] {
  if (x.length !== y.length) {
    throw new Error("Arrays must have the same length");
  }
  return x.map((val: number, i: number) => val < y[i]);
}

/**
 * Element-wise comparison of two matrices.
 */
function elementwiseMatrixComparison(x: matrix, y: matrix): boolean[][] {
  if (x.length !== y.length || x[0].length !== y[0].length) {
    throw new Error("Matrices must have the same dimensions");
  }
  return x.map((row: array, i: number) =>
    row.map((val: number, j: number) => val < y[i][j])
  );
}
