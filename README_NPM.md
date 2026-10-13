<p align="center">
  <a href="https://nodalstudio.github.io/Ubique/"><img alt="Ubique — mathematical and quantitative library for TypeScript, by Nodal Studio" src="https://cdn.jsdelivr.net/gh/NodalStudio/Ubique@main/.github/assets/banner-light.svg" width="100%"></a>
</p>

<p align="center">
  <a href="https://nodalstudio.github.io/Ubique/"><img alt="API reference" src="https://img.shields.io/badge/API_reference_→-030406?style=for-the-badge"></a>
  <a href="https://nodalstudio.github.io/Ubique/learn.html"><img alt="Interactive article" src="https://img.shields.io/badge/Interactive_article_→-030406?style=for-the-badge"></a>
  <a href="https://nodalstudio.github.io/Ubique/benchmark.html"><img alt="Benchmark" src="https://img.shields.io/badge/Benchmark_→-030406?style=for-the-badge"></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/ubique"><img alt="npm" src="https://img.shields.io/npm/v/ubique?style=for-the-badge&label=npm&labelColor=030406&color=FFFDE9"></a>
  <a href="https://www.npmjs.com/package/ubique"><img alt="npm downloads" src="https://img.shields.io/npm/d18m/ubique?style=for-the-badge&label=downloads&labelColor=030406&color=FFFDE9"></a>
  <a href="https://jsr.io/@nodalstudio/ubique"><img alt="JSR" src="https://img.shields.io/jsr/v/@nodalstudio/ubique?style=for-the-badge&label=JSR&labelColor=030406&color=FFFDE9"></a>
  <a href="https://github.com/NodalStudio/Ubique/blob/main/LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-FFFDE9?style=for-the-badge&labelColor=030406"></a>
</p>

Ubique is a modern mathematical and quantitative library built with contemporary
JavaScript, TypeScript, and WebAssembly. It delivers high-performance numerical
computations by leveraging Rust's [nalgebra](https://nalgebra.org/) library
compiled to WebAssembly. The library provides a comprehensive suite of functions
for vectors, matrices, linear algebra, statistics, time series analysis, and
computational finance.

**Version 1.0** represents a complete rewrite of the original Ubique library,
bringing significant improvements in performance, modern tooling, and developer experience.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Performance Highlights](#performance-highlights)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview

Ubique is designed for modern web and server-side applications requiring robust
and efficient mathematical operations. By integrating WebAssembly for heavy
linear algebra tasks, Ubique offers good performance while maintaining
a simple and intuitive API. The library supports vectors, matrices, linear
algebra, statistics, time series analysis, and computational finance—all while
delivering performance gains of up to 20x compared to traditional JavaScript
solutions.

## Key Features

- **High Performance:** Uses Rust's [nalgebra](https://nalgebra.org/) compiled
  to WebAssembly for accelerated matrix operations
- **WebAssembly Integration:** WASM code is inlined for zero-config deployment
  (no separate .wasm files to manage)
- **Universal Compatibility:** Works seamlessly in Node.js, browsers, and modern
  JavaScript runtimes
- **TypeScript Support:** Full TypeScript definitions included for excellent IDE
  support and type safety
- **Comprehensive Functionality:** Full suite of operations for vectors, matrices,
  statistics, time series, and financial computations
- **Zero Dependencies:** Minimal external dependencies (only dayjs for date operations)

## Performance

Run `deno task benchmark` in the source checkout for seeded, correctness-gated
comparisons with math.js 15.2.0, using warmups and alternating batches. Historical
headline ratios used an older protocol and have been removed. Results depend on
shape, hardware, runtime and whether data is already resident in WASM memory.
See the source README and `benchmarks/README.md` for the measured protocol.

## Installation

### npm

```bash
npm install ubique
```

### yarn

```bash
yarn add ubique
```

### pnpm

```bash
pnpm add ubique
```

## Usage

### ESM (Modern Node.js, TypeScript, bundlers)

```typescript
import * as ubique from "ubique";

const A = [
  [1, 2],
  [3, 4],
];

const B = [
  [5, 6],
  [7, 8],
];

const C = ubique.mtimes(A, B);
console.log(C);
// Output:
// [
//   [19, 22],
//   [43, 50],
// ]
```

### CommonJS (Node.js)

```javascript
const ubique = require("ubique");

const A = [
  [1, 2],
  [3, 4],
];

const inverse = ubique.inv(A);
console.log(inverse);
```

### Browser (via CDN)

```html
<script type="module">
  import * as ubique from "https://esm.sh/ubique@1.0.0";

  const matrix = ubique.eye(3); // Create 3x3 identity matrix
  console.log(matrix);
</script>
```

### More Examples

#### Linear Algebra

```typescript
import { eye, inv, det, lu, linsolve } from "ubique";

// Identity matrix
const I = eye(3);

// Matrix inversion
const A = [
  [1, 2],
  [3, 4],
];
const A_inv = inv(A);

// Determinant
const detA = det(A);

// LU decomposition
const luResult = lu(A);
const L = luResult.L;
const U = luResult.U;
const P = luResult.P;

// Solve linear system Ax = b
const b = [5, 6];
const x = linsolve(A, b);
```

#### Statistics

```typescript
import { mean, std, corrcoef, cov, median } from "ubique";

const data = [1, 2, 3, 4, 5];

// Descriptive statistics
const avg = mean(data); // 3
const stdDev = std(data); // ~1.58
const med = median(data); // 3

// Correlation and covariance
const x = [1, 2, 3, 4, 5];
const y = [2, 4, 5, 4, 5];
const corr = corrcoef(x, y);
const covariance = cov(x, y);
```

#### Quantitative Finance

```typescript
import { sharpe, sortino, drawdown, cagr, histvar } from "ubique";

const returns = [0.01, 0.02, -0.01, 0.03, -0.02];

// Risk metrics
const sharpeRatio = sharpe(returns);
const sortinoRatio = sortino(returns);
const ddResult = drawdown(returns);
const maxDD = ddResult.maxdd;

// Performance metrics
// Note: cagr requires price data and time array
const prices = [100, 101, 103, 102, 105.06, 102.96];
const time = [0, 1, 2, 3, 4, 5];
const annualReturn = cagr(prices, time);

// Risk measures
const var95 = histvar(returns, 0.95);
```

#### Matrix Operations

```typescript
import {
  zeros,
  ones,
  rand,
  eye,
  transpose,
  reshape,
  diag,
  sum,
  prod,
  cumsum,
} from "ubique";

// Matrix creation
const Z = zeros(3, 3); // 3x3 zero matrix
const O = ones(2, 4); // 2x4 ones matrix
const R = rand(5, 5); // 5x5 random matrix
const I = eye(4); // 4x4 identity matrix

// Matrix manipulation
const A = [
  [1, 2, 3],
  [4, 5, 6],
];
const At = transpose(A); // Transpose
const B = reshape(A, 3, 2); // Reshape to 3x2
const d = diag(I); // Extract diagonal

// Aggregations
const s = sum(A); // Sum all elements
const p = prod(A); // Product of all elements
const cs = cumsum(A); // Cumulative sum
```

## API Documentation

Ubique provides functions organized into the following modules:

- **Data Types** (`datatype`): Type checking, assertions, data manipulation
- **Element Operations** (`elemop`): Element-wise operations on arrays and matrices
- **Elementary Math** (`elmath`): Mathematical functions (exp, log, sqrt, erf, etc.)
- **Linear Algebra** (`linalgebra`): Matrix operations (inv, det, lu, linsolve)
- **Matrix Arrays** (`matarrs`): Matrix creation and manipulation
- **Probability Distributions** (`probdistr`): Statistical distributions and tests
- **Quantitative Finance** (`quants`): Portfolio analytics and risk metrics
- **Regression** (`reglin`): Regression and interpolation functions
- **Statistics** (`stats`): Descriptive statistics (mean, std, median, etc.)

For complete API documentation, visit: [https://nodalstudio.github.io/Ubique/](https://nodalstudio.github.io/Ubique/)

## TypeScript Support

Ubique is written in TypeScript and includes full type definitions. Your IDE will provide autocomplete and type checking out of the box:

```typescript
import { inv, Matrix } from "ubique";

const A: Matrix = [
  [1, 2],
  [3, 4],
];
const A_inv = inv(A); // Type: Matrix
```

## Browser Compatibility

Ubique works in all modern browsers that support WebAssembly:

- Chrome/Edge 57+
- Firefox 52+
- Safari 11+
- Node.js 12+

The WebAssembly code is automatically inlined, so no additional configuration or file serving is required.

## Contributing

Contributions are welcome and encouraged! If you have ideas or improvements,
please fork the repository and submit a pull request. For issues or feature
requests, use the [GitHub Issues](https://github.com/nodalstudio/ubique/issues)
page.

## License

Ubique is released under the MIT License. See the [LICENSE](https://github.com/NodalStudio/Ubique/blob/main/LICENSE) file for details.


## Development preview

The upcoming source revision adds reusable `factorize(A).solve(b)`, corrects
singularity/determinant behavior, integer powers, IRR, initial drawdown and
large-coordinate regression, and provides an interactive browser lab/tutorial.
These changes are not yet published. See the source repository's `CHANGELOG.md`,
`docs-src/numerical-contract.md` and `examples/README.md` for the exact contracts
and local build instructions. Existing published versions do not contain these fixes.

<br>

<p align="center">
  <a href="https://nodalstudio.io/"><img alt="Built and maintained by Nodal Studio — independent software studio, Barcelona and Paris" src="https://cdn.jsdelivr.net/gh/NodalStudio/Ubique@main/.github/assets/footer.svg" width="100%"></a>
</p>
