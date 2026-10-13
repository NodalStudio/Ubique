import { matrix_memory, MatrixBuffer } from "../../rs_lib/pkg/rs_lib.js";
import { matrixShape } from "../internal/matrix.ts";

/**
 * An f64 matrix resident in WASM memory. Storage is column-major:
 * `view()[column * rows + row]`. Fill the view directly to avoid a JS-to-WASM
 * input copy; use multiplyInto to reuse output storage across calculations.
 *
 * A view is a short-lived borrow: reacquire it after ANY WASM allocation/call
 * that may grow memory, and never use it after dispose(). Do not retain views
 * across async boundaries. toArray() returns an independent copy.
 */
export class DenseMatrix {
  readonly #rows: number;
  readonly #cols: number;
  get rows(): number {
    return this.#rows;
  }
  get cols(): number {
    return this.#cols;
  }
  #buffer: MatrixBuffer | undefined;

  constructor(rows: number, cols: number) {
    if (
      !Number.isSafeInteger(rows) || !Number.isSafeInteger(cols) || rows <= 0 ||
      cols <= 0 || rows * cols > 0x1fffffff
    ) {
      throw new RangeError(
        "Matrix dimensions must be positive integers fitting WASM memory",
      );
    }
    this.#rows = rows;
    this.#cols = cols;
    this.#buffer = new MatrixBuffer(rows, cols);
  }

  /** Copy nested row-major input once into persistent column-major storage. */
  static from(a: number[][]): DenseMatrix {
    const [rows, cols] = matrixShape(a);
    const result = new DenseMatrix(rows, cols);
    const data = result.view();
    for (let j = 0; j < cols; j++) {
      for (let i = 0; i < rows; i++) data[j * rows + i] = a[i][j];
    }
    return result;
  }

  #alive(): MatrixBuffer {
    if (!this.#buffer) throw new Error("Matrix has been disposed");
    return this.#buffer;
  }

  /** Borrow the current memory view; see the class lifetime contract. */
  view(): Float64Array {
    const ptr = this.#alive().data_ptr();
    const memory = matrix_memory() as WebAssembly.Memory;
    return new Float64Array(memory.buffer, ptr, this.rows * this.cols);
  }

  /** Replace values from a typed buffer without allocating WASM storage. */
  setData(
    data: Float64Array,
    layout: "row-major" | "column-major" = "row-major",
  ): this {
    if (data.length !== this.rows * this.cols) {
      throw new Error("Data length does not match matrix shape");
    }
    if (layout !== "row-major" && layout !== "column-major") {
      throw new Error("Unknown matrix layout");
    }
    const target = this.view();
    // Row-major rearrangement must not overwrite still-unread aliased input.
    const source = data.buffer === target.buffer && layout === "row-major"
      ? data.slice()
      : data;
    if (layout === "column-major") target.set(source);
    else {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
          target[j * this.rows + i] = source[i * this.cols + j];
        }
      }
    }
    return this;
  }

  /** Multiply without JS input/output copies, overwriting a distinct output. */
  multiplyInto(rhs: DenseMatrix, out: DenseMatrix): DenseMatrix {
    if (out === this || out === rhs) {
      throw new Error("Output must not alias an input");
    }
    if (
      this.cols !== rhs.rows || out.rows !== this.rows || out.cols !== rhs.cols
    ) throw new Error("Matrix dimensions must agree");
    this.#alive().multiply_into(rhs.#alive(), out.#alive());
    return out;
  }

  /** Copy results out only when needed by the application. */
  toArray(): number[][] {
    const data = this.view();
    return Array.from(
      { length: this.rows },
      (_, i) =>
        Array.from({ length: this.cols }, (_, j) => data[j * this.rows + i]),
    );
  }

  /** Release WASM storage. Repeated disposal is harmless. */
  dispose(): void {
    this.#buffer?.free();
    this.#buffer = undefined;
  }
}
