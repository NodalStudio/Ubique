/**
 * @type array
 * @summary Represents a one-dimensional array of numbers.
 * @description This type defines a one-dimensional array where each element is a number.
 * It is commonly used to represent a array or a sequence of numeric values.
 *
 * @example
 * const myArray: array = [1, 2, 3, 4, 5];
 */
export type array<T = number> = T[];

/**
 * @type matrix
 * @summary Represents a two-dimensional array of numbers.
 * @description This type defines a matrix, which is a two-dimensional array where each sub-array (row) contains numbers.
 * Each row in the matrix must have the same length, and the elements must all be numbers.
 *
 * @example
 * const myMatrix: matrix = [
 *   [1, 2, 3],
 *   [4, 5, 6],
 *   [7, 8, 9]
 * ];
 */
export type matrix<T = number> = T[][];

export type numarraymatrix<T = number> = T | array<T> | matrix<T>;
