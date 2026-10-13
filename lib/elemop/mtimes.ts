import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { isarray, ismatrix, isnumber } from "../../index.ts";
import { matmul } from "../linalgebra/matmul.ts";

/**
 * Matrix multiplication.
 *
 * Multiplies matrices. Two flat arrays produce a scalar dot product; matrix-array
 * treats the array as a column, and array-matrix treats it as a row.
 *
 * @param x The first operand, can be a number, array (orientation depends on operand position), or matrix
 * @param y The second operand, can be a number, array (orientation depends on operand position), or matrix
 * @returns The result of matrix multiplication of x and y
 * @throws If matrix dimensions do not agree for multiplication or if no arguments are provided
 *
 * @example Multiply two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes(2, 3), 6);
 *
 * ```
 *
 * @example Multiply matrix by scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], 2), [[2, 4], [6, 8]]);
 *
 * ```
 *
 * @example Multiply two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]]);
 *
 * ```
 *
 * @example Multiply matrix by column vector (array)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [5, 6]), [17, 39]);
 * ```
 */
export default function mtimes(x: number, y: number): number;
/**
 * Matrix multiplication.
 *
 * Multiplies matrices. Two flat arrays produce a scalar dot product; matrix-array
 * treats the array as a column, and array-matrix treats it as a row.
 *
 * @param x The first operand, can be a number, array (orientation depends on operand position), or matrix
 * @param y The second operand, can be a number, array (orientation depends on operand position), or matrix
 * @returns The result of matrix multiplication of x and y
 * @throws If matrix dimensions do not agree for multiplication or if no arguments are provided
 *
 * @example Multiply two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes(2, 3), 6);
 *
 * ```
 *
 * @example Multiply matrix by scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], 2), [[2, 4], [6, 8]]);
 *
 * ```
 *
 * @example Multiply two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]]);
 *
 * ```
 *
 * @example Multiply matrix by column vector (array)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [5, 6]), [17, 39]);
 * ```
 */
export default function mtimes(x: number, y: array): array;
/**
 * Matrix multiplication.
 *
 * Multiplies matrices. Two flat arrays produce a scalar dot product; matrix-array
 * treats the array as a column, and array-matrix treats it as a row.
 *
 * @param x The first operand, can be a number, array (orientation depends on operand position), or matrix
 * @param y The second operand, can be a number, array (orientation depends on operand position), or matrix
 * @returns The result of matrix multiplication of x and y
 * @throws If matrix dimensions do not agree for multiplication or if no arguments are provided
 *
 * @example Multiply two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes(2, 3), 6);
 *
 * ```
 *
 * @example Multiply matrix by scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], 2), [[2, 4], [6, 8]]);
 *
 * ```
 *
 * @example Multiply two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]]);
 *
 * ```
 *
 * @example Multiply matrix by column vector (array)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [5, 6]), [17, 39]);
 * ```
 */
export default function mtimes(x: array, y: number): array;
/**
 * Matrix multiplication.
 *
 * Multiplies matrices. Two flat arrays produce a scalar dot product; matrix-array
 * treats the array as a column, and array-matrix treats it as a row.
 *
 * @param x The first operand, can be a number, array (orientation depends on operand position), or matrix
 * @param y The second operand, can be a number, array (orientation depends on operand position), or matrix
 * @returns The result of matrix multiplication of x and y
 * @throws If matrix dimensions do not agree for multiplication or if no arguments are provided
 *
 * @example Multiply two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes(2, 3), 6);
 *
 * ```
 *
 * @example Multiply matrix by scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], 2), [[2, 4], [6, 8]]);
 *
 * ```
 *
 * @example Multiply two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]]);
 *
 * ```
 *
 * @example Multiply matrix by column vector (array)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [5, 6]), [17, 39]);
 * ```
 */
export default function mtimes(x: array, y: array): number;
/**
 * Matrix multiplication.
 *
 * Multiplies matrices. Two flat arrays produce a scalar dot product; matrix-array
 * treats the array as a column, and array-matrix treats it as a row.
 *
 * @param x The first operand, can be a number, array (orientation depends on operand position), or matrix
 * @param y The second operand, can be a number, array (orientation depends on operand position), or matrix
 * @returns The result of matrix multiplication of x and y
 * @throws If matrix dimensions do not agree for multiplication or if no arguments are provided
 *
 * @example Multiply two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes(2, 3), 6);
 *
 * ```
 *
 * @example Multiply matrix by scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], 2), [[2, 4], [6, 8]]);
 *
 * ```
 *
 * @example Multiply two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]]);
 *
 * ```
 *
 * @example Multiply matrix by column vector (array)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [5, 6]), [17, 39]);
 * ```
 */
export default function mtimes(x: number, y: matrix): matrix;
/**
 * Matrix multiplication.
 *
 * Multiplies matrices. Two flat arrays produce a scalar dot product; matrix-array
 * treats the array as a column, and array-matrix treats it as a row.
 *
 * @param x The first operand, can be a number, array (orientation depends on operand position), or matrix
 * @param y The second operand, can be a number, array (orientation depends on operand position), or matrix
 * @returns The result of matrix multiplication of x and y
 * @throws If matrix dimensions do not agree for multiplication or if no arguments are provided
 *
 * @example Multiply two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes(2, 3), 6);
 *
 * ```
 *
 * @example Multiply matrix by scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], 2), [[2, 4], [6, 8]]);
 *
 * ```
 *
 * @example Multiply two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]]);
 *
 * ```
 *
 * @example Multiply matrix by column vector (array)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [5, 6]), [17, 39]);
 * ```
 */
export default function mtimes(x: matrix, y: number): matrix;
/**
 * Matrix multiplication.
 *
 * Multiplies matrices. Two flat arrays produce a scalar dot product; matrix-array
 * treats the array as a column, and array-matrix treats it as a row.
 *
 * @param x The first operand, can be a number, array (orientation depends on operand position), or matrix
 * @param y The second operand, can be a number, array (orientation depends on operand position), or matrix
 * @returns The result of matrix multiplication of x and y
 * @throws If matrix dimensions do not agree for multiplication or if no arguments are provided
 *
 * @example Multiply two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes(2, 3), 6);
 *
 * ```
 *
 * @example Multiply matrix by scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], 2), [[2, 4], [6, 8]]);
 *
 * ```
 *
 * @example Multiply two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]]);
 *
 * ```
 *
 * @example Multiply matrix by column vector (array)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [5, 6]), [17, 39]);
 * ```
 */
export default function mtimes(x: matrix, y: array): array;
/**
 * Matrix multiplication.
 *
 * Multiplies matrices. Two flat arrays produce a scalar dot product; matrix-array
 * treats the array as a column, and array-matrix treats it as a row.
 *
 * @param x The first operand, can be a number, array (orientation depends on operand position), or matrix
 * @param y The second operand, can be a number, array (orientation depends on operand position), or matrix
 * @returns The result of matrix multiplication of x and y
 * @throws If matrix dimensions do not agree for multiplication or if no arguments are provided
 *
 * @example Multiply two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes(2, 3), 6);
 *
 * ```
 *
 * @example Multiply matrix by scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], 2), [[2, 4], [6, 8]]);
 *
 * ```
 *
 * @example Multiply two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]]);
 *
 * ```
 *
 * @example Multiply matrix by column vector (array)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [5, 6]), [17, 39]);
 * ```
 */
export default function mtimes(x: array, y: matrix): array;
/**
 * Matrix multiplication.
 *
 * Multiplies matrices. Two flat arrays produce a scalar dot product; matrix-array
 * treats the array as a column, and array-matrix treats it as a row.
 *
 * @param x The first operand, can be a number, array (orientation depends on operand position), or matrix
 * @param y The second operand, can be a number, array (orientation depends on operand position), or matrix
 * @returns The result of matrix multiplication of x and y
 * @throws If matrix dimensions do not agree for multiplication or if no arguments are provided
 *
 * @example Multiply two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes(2, 3), 6);
 *
 * ```
 *
 * @example Multiply matrix by scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], 2), [[2, 4], [6, 8]]);
 *
 * ```
 *
 * @example Multiply two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]]);
 *
 * ```
 *
 * @example Multiply matrix by column vector (array)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [5, 6]), [17, 39]);
 * ```
 */
export default function mtimes(x: matrix, y: matrix): matrix;
/**
 * Matrix multiplication.
 *
 * Multiplies matrices. Two flat arrays produce a scalar dot product; matrix-array
 * treats the array as a column, and array-matrix treats it as a row.
 *
 * @param x The first operand, can be a number, array (orientation depends on operand position), or matrix
 * @param y The second operand, can be a number, array (orientation depends on operand position), or matrix
 * @returns The result of matrix multiplication of x and y
 * @throws If matrix dimensions do not agree for multiplication or if no arguments are provided
 *
 * @example Multiply two numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes(2, 3), 6);
 *
 * ```
 *
 * @example Multiply matrix by scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], 2), [[2, 4], [6, 8]]);
 *
 * ```
 *
 * @example Multiply two matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[19, 22], [43, 50]]);
 *
 * ```
 *
 * @example Multiply matrix by column vector (array)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(mtimes([[1, 2], [3, 4]], [5, 6]), [17, 39]);
 * ```
 */
export default function mtimes(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (isnumber(x) && isnumber(y)) {
    return x * y;
  }

  return handleMatrixMultiplication(x, y);
}

/**
 * Handle matrix multiplication where at least one operand is not a number.
 */
function handleMatrixMultiplication(
  x: numarraymatrix,
  y: numarraymatrix,
): numarraymatrix {
  if (isnumber(x)) {
    return scalarMultiplication(x as number, y);
  }

  if (isnumber(y)) {
    return scalarMultiplication(y as number, x);
  }

  if (isarray(x) && isarray(y)) {
    return vectorMultiplication(x as array, y as array);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return matrixMultiplication(x as matrix, y as matrix);
  }

  if (ismatrix(x) && isarray(y)) {
    return matrixVectorMultiplication(x as matrix, y as array);
  }

  if (isarray(x) && ismatrix(y)) {
    return vectorMatrixMultiplication(x as array, y as matrix);
  }

  throw new Error("Invalid input types");
}

/**
 * Multiply a scalar by an array or matrix.
 */
function scalarMultiplication(
  scalar: number,
  operand: numarraymatrix,
): numarraymatrix {
  if (isarray(operand)) {
    return (operand as array).map((val: number) => scalar * val);
  }

  if (ismatrix(operand)) {
    return (operand as matrix).map((row: array) =>
      row.map((val: number) => scalar * val)
    );
  }

  throw new Error("Invalid operand type");
}

/**
 * Multiply two vectors (dot product).
 */
function vectorMultiplication(x: array, y: array): number {
  if (x.length !== y.length) {
    throw new Error("Vectors must have the same length");
  }
  return x.reduce((sum: number, val: number, i: number) => sum + val * y[i], 0);
}

/**
 * Multiply two matrices.
 */
function matrixMultiplication(x: matrix, y: matrix): matrix {
  return matmul(x, y);
}

/**
 * Multiply a matrix by a vector.
 */
function matrixVectorMultiplication(x: matrix, y: array): array {
  if (x[0].length !== y.length) {
    throw new Error("Matrix and vector dimensions must agree");
  }

  return x.map((row: array) =>
    row.reduce((sum: number, val: number, i: number) => sum + val * y[i], 0)
  );
}

/**
 * Multiply a vector by a matrix.
 */
function vectorMatrixMultiplication(x: array, y: matrix): array {
  if (x.length !== y.length) {
    throw new Error("Vector and matrix dimensions must agree");
  }

  const result: array = new Array(y[0].length).fill(0);
  for (let j = 0; j < y[0].length; j++) {
    for (let i = 0; i < x.length; i++) {
      result[j] += x[i] * y[i][j];
    }
  }
  return result;
}
