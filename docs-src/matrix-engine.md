---
title: Making matrix multiplication fast
status: published
language: en
sources:
  - https://github.com/NodalStudio/Ubique
  - https://pomb.us/build-your-own-react/
---

Multiplying matrices is a useful way to understand numerical performance. The mathematics fits in one line, yet execution time depends on how we arrange memory, traverse it, cross runtime boundaries, and measure the result. We will build a small matrix multiplier in JavaScript, improve its data access, and follow the same calculation into Rust and WebAssembly.

Ubique provides the production context: a TypeScript mathematical library maintained by Nodal Studio, with selected operations backed by Rust and nalgebra. This version builds on Max Todaro’s original Ubique library; nalgebra supplies the numerical kernels discussed here. The teaching implementations below explain possible design choices. The 1.0.2 baseline delegated matrix multiplication to nalgebra. Since 1.0.3, Ubique includes JS/WASM dispatch and a persistent-memory API; both run in this site’s demos and are included in the npm/JSR packages. The tiled JavaScript kernel below remains a teaching implementation.

## Start with one output cell

If A has m rows and k columns, and B has k rows and n columns, their product C has m rows and n columns. Each output entry is a dot product:

`C[i,j] = sum(A[i,p] * B[p,j], p = 0 ... k-1)`

For `A = [[1,2],[3,4]]` and `B = [[5,6],[7,8]]`, the first output is `1*5 + 2*7 = 19`. The full result is `[[19,22],[43,50]]`.

We can translate that definition directly. This teaching function assumes validated, nonempty, rectangular numeric inputs with compatible dimensions.

```js
function multiply(A, B) {
  const m = A.length;
  const k = A[0].length;
  const n = B[0].length;
  const C = Array.from({length: m}, () => Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let sum = 0;
      for (let p = 0; p < k; p++) {
        sum += A[i][p] * B[p][j];
      }
      C[i][j] = sum;
    }
  }
  return C;
}
```

There are m*n*k multiplications and roughly as many additions. For square matrices, doubling the side length gives about eight times the arithmetic. That explains why a tiny example says little about a large workload. It does not explain why two implementations of the same loops can have very different speeds.

## Give the numbers a predictable layout

Nested JavaScript arrays are convenient. They do not give us a single contiguous numeric buffer with an explicit layout contract. For that, we can use a Float64Array and store rows consecutively.

The matrix `[[1,2,3],[4,5,6]]` becomes `[1,2,3,4,5,6]`. Entry `(i,j)` lives at `i*cols+j`. We must carry the dimensions separately: six numbers could represent a 2-by-3 matrix or a 3-by-2 matrix.

```js
function packRows(A) {
  const rows = A.length;
  const cols = A[0].length;
  const data = new Float64Array(rows * cols);
  for (let i = 0; i < rows; i++) data.set(A[i], i * cols);
  return {data, rows, cols};
}
```

This is also an API decision. If an application repeatedly multiplies the same matrix, requiring nested arrays forces repeated conversion. Accepting a reusable buffer makes that cost avoidable. Typed arrays alone do not guarantee a faster loop; they make storage and interoperability more predictable.

## Change the walk through memory

Our first implementation fixes an output column and walks down a column of B. In row-major storage, those B entries are separated by n elements. We can instead reuse one value from A while walking along a row of B and a row of C.

```js
function multiplyFlat(A, B, m, k, n) {
  const C = new Float64Array(m * n);
  for (let i = 0; i < m; i++) {
    for (let p = 0; p < k; p++) {
      const a = A[i * k + p];
      for (let j = 0; j < n; j++) {
        C[i * n + j] += a * B[p * n + j];
      }
    }
  }
  return C;
}
```

The arithmetic count is unchanged. The memory access pattern has changed: the inner loop now accesses neighboring entries of B and C. Processors use caches to retain recently accessed data, and contiguous traversal can make those caches more useful. Whether this version wins depends on dimensions and the runtime. Measure it.

For each output cell, this version still accumulates contributions in increasing p order. More aggressive transformations may change accumulation order and therefore floating-point rounding.

## Work on smaller regions

A contiguous walk helps, but large working sets may exceed cache capacity. Tiling divides the computation into bounded regions so parts of A, B, and C can be reused before moving elsewhere.

```js
function multiplyBlocked(A, B, m, k, n, tile = 32) {
  if (!Number.isInteger(tile) || tile <= 0) {
    throw new Error('tile must be a positive integer');
  }
  const C = new Float64Array(m * n);
  for (let ii = 0; ii < m; ii += tile) {
    for (let pp = 0; pp < k; pp += tile) {
      for (let jj = 0; jj < n; jj += tile) {
        const iEnd = Math.min(ii + tile, m);
        const pEnd = Math.min(pp + tile, k);
        const jEnd = Math.min(jj + tile, n);
        for (let i = ii; i < iEnd; i++) {
          for (let p = pp; p < pEnd; p++) {
            const a = A[i * k + p];
            for (let j = jj; j < jEnd; j++) {
              C[i * n + j] += a * B[p * n + j];
            }
          }
        }
      }
    }
  }
  return C;
}
```

The edge bounds matter: real matrices are not always multiples of 32. A 31-by-65 input is a useful test. Tile size is an experimental parameter; 32 is an illustrative starting point, not an optimum.

Production matrix libraries take this further. They may pack panels into temporary buffers and use small kernels that keep several output accumulators in registers. Packing introduces an extra copy but can pay for itself through reuse. The [matrixmultiply project](https://github.com/bluss/matrixmultiply) describes its macro/microkernel approach and target-specific implementations. Those target-specific capabilities must be checked for the exact dependency version and WebAssembly build; a native CPU optimization is not automatically present in a browser.

## Understand what WebAssembly receives

WebAssembly gives us a portable execution format with explicitly typed instructions. Rust can compile to it, and a JavaScript host can load the resulting module. It does not make memory movement disappear.

A tiny function in WebAssembly text format shows the basic model:

```wat
(module
  (func (export "multiply") (param $a f64) (param $b f64) (result f64)
    local.get $a
    local.get $b
    f64.mul))
```

The parameters are 64-bit floating-point numbers. The instructions place them on an operand stack and multiply them. The result is left for the caller. WAT is the readable representation; it must be converted to binary before WebAssembly instantiation. The engine validates and compiles the binary for execution. [MDN explains this text and binary relationship](https://developer.mozilla.org/en-US/docs/WebAssembly/Guides/Understanding_the_text_format).

A matrix needs more than a pair of scalar parameters. A typical low-level interface passes byte offsets into linear memory and dimensions. For f64 storage, an element at index q starts at byte offset `base + 8*q`. A JavaScript Float64Array can view a compatible region of that memory. Ownership then becomes part of correctness: who allocated the region, how long is it valid, and may the callee overwrite it?

## Follow Ubique across the boundary

In the reviewed Ubique implementation, the public API accepts nested arrays. It flattens each input, constructs Float64Arrays, and calls generated wasm-bindgen bindings. The bindings allocate space and copy the inputs into WASM memory.

Rust then constructs nalgebra matrices with `DMatrix::from_row_slice`, performs `&mat_a * &mat_b`, and builds a row-major output vector. Nalgebra's owned matrix layout is column-major, so its row-slice constructor handles an additional representation conversion. The returned result is copied into a JavaScript typed array, and the wrapper reconstructs nested output rows. See [Ubique's wrapper](https://github.com/NodalStudio/Ubique/blob/ba3099fdb12b6d38909520a7402ad994143bf876/lib/elemop/mtimes.ts), [its Rust implementation](https://github.com/NodalStudio/Ubique/blob/ba3099fdb12b6d38909520a7402ad994143bf876/rs_lib/src/lib.rs), and [nalgebra's layout documentation](https://nalgebra.rs/docs/user_guide/vectors_and_matrices/).

```text
nested arrays
  -> flat JavaScript arrays
  -> Float64Arrays
  -> copied WASM inputs
  -> owned nalgebra matrices
  -> multiplication
  -> row-major result vector
  -> copied JavaScript result
  -> nested arrays
```

Every stage has a purpose, and every stage costs something. A useful model is:

`total time = validation + packing + boundary copies + kernel + output conversion`

For roughly square matrices, conversion grows quadratically while multiplication grows cubically. Larger matrices can therefore amortize conversion costs better. Thin or unusually shaped matrices can behave differently. This is why a single threshold based on side length is inadequate for every workload.

## Remove a representation conversion

Packing directly with `Float64Array.set` removes the temporary ordinary array.
There is also an algebraic way to avoid building two reordered owned matrices.
A row-major buffer for A has exactly the same bytes as a column-major buffer for
A transposed. We can borrow it as that transposed matrix rather than move its
numbers.

The identity `(A B)^T = B^T A^T` then gives the product. If A is m-by-k and B is
k-by-n, their borrowed transposed views are k-by-m and n-by-k. The product B^T A^T
is n-by-m. Its column-major storage is already the row-major storage needed for
the m-by-n answer.

```rust
let at = DMatrixView::<f64>::from_slice(a, cols_a, rows_a);
let bt = DMatrixView::<f64>::from_slice(b, cols_b, cols_a);
let result = bt * at;
let output: Vec<f64> = result.data.into();
```

This is the approach implemented in the current source. It removes the owned input
conversions and transfers ownership of the output vector without another Rust
copy. It does not remove the wasm-bindgen copies at the JavaScript boundary,
and the numerical kernel can still pack internal blocks. Removing an allocation
is a hypothesis about speed until the complete operation has been measured.

## Keep reusable data close to the calculation

There are two different improvements to try. First, pack directly into typed arrays so that `flat()` does not create an intermediate ordinary array. Second, offer an advanced API that retains matrices in WASM memory across calls.

Ubique exposes this API in both the site’s bundle and the npm/JSR packages:

```js
import { DenseMatrix } from "ubique";

const a = DenseMatrix.from(A);
const b = DenseMatrix.from(B);
const out = new DenseMatrix(a.rows, b.cols);
try {
  a.multiplyInto(b, out);
  const result = out.toArray();
} finally {
  out.dispose();
  b.dispose();
  a.dispose();
}
```

The important benefit appears in a chain of operations: upload once, compute several times, download when necessary. Such an API needs explicit ownership and error handling, aliasing rules for output buffers, and safe behavior after disposal.

For direct input generation, allocate all matrices first and then acquire
`matrix.view()`. The view is column-major: `view[column * rows + row]`. A parser
or generator can write there without creating an intermediate JS array. If the
values already exist in an ordinary JavaScript buffer, `setData` copies them;
WebAssembly cannot adopt an arbitrary existing ArrayBuffer as its linear memory.
Each subsequent `multiplyInto` reuses the inputs and output. `toArray` makes an
explicit copy back to the application.

Output aliasing is rejected: an output must be a different owned matrix from
both inputs. Disposal is idempotent, and accessing a disposed owner throws. Raw
views are still borrows whose lifetime the caller must respect.

Memory growth deserves particular care. Growing an ordinary WebAssembly memory detaches the previous ArrayBuffer, so cached views must be refreshed. A pointer is not a lifetime guarantee. [MDN documents the behavior of memory growth](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Memory/grow).

## Test compiler options before writing a new kernel

The reviewed baseline used `opt-level = "z"`, which prioritizes binary size. Ubique uses `opt-level = 3`, LTO and one codegen unit, and retains a separate SIMD experiment. Compare the generated artifacts and measure the complete API. A larger kernel might run faster but increase download, parsing, or compilation costs. The [Rust compiler documentation](https://doc.rust-lang.org/rustc/codegen-options/index.html#opt-level) defines the optimization levels; it does not promise a speedup for this workload.

SIMD is another experiment. A 128-bit vector can contain two f64 lanes or four f32 lanes. That creates opportunities to process several values per instruction, but useful speedup depends on the kernel and its memory access. Enabling a target feature does not prove that the compiler emitted the desired instructions. Inspect the binary and benchmark it. Rust exposes [WebAssembly SIMD intrinsics and feature controls](https://doc.rust-lang.org/core/arch/wasm32/index.html).

Changing from f64 to f32 also changes the numerical contract. It should be an explicit precision choice, accompanied by error measurements. Faster arithmetic with unsuitable precision is a different product.

## Separate responsiveness from throughput

An operation can complete quickly and still block an animation long enough to feel slow. Moving work to a Web Worker can keep the interface responsive, even if elapsed calculation time stays the same or increases because of messaging and transfers.

A good demonstration therefore measures two outcomes separately: how long the mathematical operation takes and how responsive the page remains. Keep drawing and benchmark computation apart. A continuously animated progress display should not contaminate the timing experiment it presents.

Multiple workers and shared memory are further design choices, with their own setup and deployment costs. They become worthwhile only when the workload is large enough to amortize coordination. Start with one correct, well-measured kernel.

## Make correctness part of each step

Performance is useful only when the result remains meaningful. In the experiment below, adding 10¹² to every x coordinate preserves the slope and predictions. Centering the data avoids subtracting two large, nearly equal accumulated moments. Click to add an outlier and inspect the residuals.

A matrix result can look plausible while being wrong. Keep the simple implementation as a reference for small cases and add independent fixtures. Test rectangular shapes, identity matrices, zeros, negative values, mixed scales, and dimensions around tile boundaries. Validate that output-buffer reuse does not accumulate old results.

For a componentwise comparison, a common starting rule is `abs(actual-expected) <= atol + rtol*abs(expected)`. Choose tolerances from the scale and the computation, and handle NaN and infinities explicitly. A single relative tolerance fails near zero; a single absolute tolerance fails across very different scales. For cancellation-heavy products, bounds based on the accumulated magnitudes can be more informative than output-relative error alone.

For a linear solve, also measure the residual `A*x-b` relative to `norm(A)*norm(x)+norm(b)`. A small residual does not guarantee a small solution error when the matrix is ill-conditioned. [LAPACK's discussion of error measurement](https://www.netlib.org/lapack/lug/node75.html) explains the distinction between backward error, forward error, and conditioning.

Never make a determinant look cleaner by replacing every tiny magnitude with zero. The diagonal matrix with entries 1e-8 and 1e-8 has determinant 1e-16 and is perfectly well-conditioned. Small determinant magnitude alone is not a singularity test.

## Build a benchmark readers can reproduce

Measure at least two paths: the public API from user input to user output, and a prepared-buffer kernel path. Label them separately. Otherwise, an improvement in arithmetic can disappear into conversion costs, or a kernel-only chart can exaggerate what a user experiences.

Use seeded inputs, pinned library versions, warmup, repeated measurement batches, and alternating library order. Batch very short operations so timer resolution does not dominate. Validate results outside the timed region and retain a checksum or result consumer. Publish absolute milliseconds alongside ratios and preserve the raw samples.

Cover small and large square matrices, rectangular products, matrix-vector operations, cold startup, and repeated operations on resident data. Record the runtime, hardware, precision, source revision, compiler flags, and dependency versions. Include an optimized JavaScript baseline as well as math.js: a general-purpose mathematical system makes different tradeoffs from a specialized dense numeric kernel.

A publishable claim describes an operation and conditions: a particular matrix size, precision, runtime, device, input/output contract, and measured latency. A blanket claim that WASM is faster cannot tell a developer whether their application will improve.

## Turn the experiment into a useful library

The convenient nested-array API remains valuable. It makes first use easy and keeps small examples readable. An advanced buffer API can serve applications that repeat large calculations. A measured dispatcher can choose JavaScript for small work and WASM where it pays off.

That is the direction for Ubique: preserve the approachable TypeScript surface while making the expensive parts visible, testable, and increasingly reusable. The engineering work includes the mathematical definitions, the copying policy, the build configuration, and the benchmark—not just the multiplication instruction.

The interactive edition includes a dot-product stepper, a memory-access visualization, and runnable dot-product, row-streaming, and tiled kernels. Change dimensions and tile size, then inspect both timing and numerical error. The embedded boundary experiment exercises the production JS and WASM implementations. The regression experiment applies the same attention to numerical correctness. Click to add a point: no preparation or file upload is needed. The incremental teaching structure is inspired by Rodrigo Pombo's [Build your own React](https://pomb.us/build-your-own-react/); the matrix examples and exposition here are original.

The next useful optimization is the one that survives both the correctness test and the user's complete workload.
