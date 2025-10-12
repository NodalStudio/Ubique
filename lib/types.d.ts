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

/**
 * @type numarraymatrix
 * @summary Union type for numeric, array, or matrix values
 * @description Represents a value that can be a scalar number, a 1D array, or a 2D matrix.
 * This type is commonly used in functions that accept flexible input types.
 *
 * @example
 * const scalar: numarraymatrix = 5;
 * const vector: numarraymatrix = [1, 2, 3];
 * const matrix: numarraymatrix = [[1, 2], [3, 4]];
 */
export type numarraymatrix<T = number> = T | array<T> | matrix<T>;

/**
 * @type Dimension
 * @summary Dimension parameter for matrix operations
 * @description Specifies the dimension along which to perform operations:
 * - 0: operate along rows (column-wise results)
 * - 1: operate along columns (row-wise results)
 */
export type Dimension = 0 | 1;

/**
 * @type NormalizationFlag
 * @summary Normalization flag for statistical calculations
 * @description Specifies the normalization method:
 * - 0: population normalization (divide by N)
 * - 1: sample normalization (divide by N-1)
 */
export type NormalizationFlag = 0 | 1;

/**
 * @type ScalarResult
 * @summary Single numeric value result
 */
export type ScalarResult = number;

/**
 * @type VectorResult
 * @summary One-dimensional array result
 */
export type VectorResult = array;

/**
 * @type MatrixResult
 * @summary Two-dimensional matrix result
 */
export type MatrixResult = matrix;

/**
 * @type NumericResult
 * @summary Union of all possible numeric result types
 */
export type NumericResult = ScalarResult | VectorResult | MatrixResult;

/**
 * @interface MatrixOperationOptions
 * @summary Common options for matrix operations
 */
export interface MatrixOperationOptions {
  /** Dimension along which to operate (0: rows, 1: columns) */
  dim?: Dimension;
  /** Normalization flag (0: population, 1: sample) */
  flag?: NormalizationFlag;
}

/**
 * @interface StatisticsOptions
 * @summary Options for statistical calculations
 */
export interface StatisticsOptions extends MatrixOperationOptions {
  /** Percentile value (0-100) for quantile calculations */
  percentile?: number;
}

/**
 * @interface FinancialOptions
 * @summary Options for quantitative finance calculations
 */
export interface FinancialOptions {
  /** Number of periods for annualization */
  periods?: number;
  /** Risk-free rate for Sharpe ratio and similar metrics */
  riskFreeRate?: number;
  /** Return calculation method */
  method?: "simple" | "continuous";
}
