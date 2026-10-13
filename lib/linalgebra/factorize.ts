import { finiteMatrix, prepareSquare } from "../internal/lu.ts";

/** Reusable, row-equilibrated LU factorization of a finite square matrix.
 * The default numerical singularity threshold is n * Number.EPSILON on pivots
 * after each row is scaled by its largest absolute entry. It is not a condition
 * number estimate. Pass an explicit nonnegative relative tolerance to override.
 * Inputs and factorization state are never exposed or mutated by solve().
 */
export class LUFactorization {
  readonly #factor: ReturnType<typeof prepareSquare>;
  get size(): number {
    return this.#factor.data.length;
  }
  constructor(a: number[][], relativeTolerance?: number) {
    this.#factor = prepareSquare(a, relativeTolerance);
    if (this.#factor.singular) {
      throw new Error("Matrix is singular to the working tolerance");
    }
  }
  solve(b: number[]): number[];
  solve(b: number[][]): number[][];
  solve(b: number[] | number[][]): number[] | number[][];
  solve(b: number[] | number[][]): number[] | number[][] {
    if (!Array.isArray(b) || b.length !== this.size) {
      throw new Error("Matrix dimensions must agree");
    }
    const vector = !Array.isArray(b[0]);
    const rhs = vector ? (b as number[]).map((v) => [v]) : b as number[][];
    const [, cols] = finiteMatrix(rhs);
    const { data: lu, permutation, scales } = this.#factor;
    const result = permutation.map((p) => rhs[p].map((v) => v / scales[p]));
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < i; j++) {
        for (let c = 0; c < cols; c++) {
          result[i][c] -= lu[i][j] * result[j][c];
        }
      }
    }
    for (let i = this.size - 1; i >= 0; i--) {
      for (let j = i + 1; j < this.size; j++) {
        for (let c = 0; c < cols; c++) {
          result[i][c] -= lu[i][j] * result[j][c];
        }
      }
      for (let c = 0; c < cols; c++) {
        result[i][c] /= lu[i][i];
        if (!Number.isFinite(result[i][c])) {
          throw new Error(
            "Solution is not representable with finite f64 values",
          );
        }
      }
    }
    return vector ? result.map((row) => row[0]) : result;
  }
}

/** Factor once and solve several right-hand sides without repeating elimination. */
export function factorize(
  a: number[][],
  relativeTolerance?: number,
): LUFactorization {
  return new LUFactorization(a, relativeTolerance);
}
