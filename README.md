# Ubique

[![JSR](https://jsr.io/badges/@nodalstudio/ubique)](https://jsr.io/@nodalstudio/ubique)
[![JSR Score](https://jsr.io/badges/@nodalstudio/ubique/score)](https://jsr.io/@nodalstudio/ubique)
[![npm version](https://img.shields.io/npm/v/ubique.svg)](https://www.npmjs.com/package/ubique)
[![npm downloads](https://img.shields.io/npm/d18m/ubique)](https://www.npmjs.com/package/ubique)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/NodalStudio/Ubique.svg)](https://github.com/NodalStudio/Ubique/stargazers)

Ubique is a modern mathematical and quantitative library built with contemporary
JavaScript, TypeScript, and Deno. It delivers high-performance numerical
computations by leveraging Rust's [nalgebra](https://nalgebra.org/) library
compiled to WebAssembly. The library provides a comprehensive suite of functions
for vectors, matrices, linear algebra, statistics, time series analysis, and
computational finance.

**Version 1.0** represents a complete rewrite of the [original Ubique library](https://github.com/maxto/ubique),
bringing significant improvements in performance, modern tooling, and developer experience.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Performance Highlights](#performance-highlights)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

Ubique is designed for modern web and server-side applications requiring robust
and efficient mathematical operations. By integrating WebAssembly for heavy
linear algebra tasks and using Deno as its runtime, Ubique offers a secure and
developer-friendly environment. The library supports vectors, matrices, linear
algebra, statistics, time series analysis, and computational finance—all while
maintaining good performance compared to traditional JavaScript
solutions.

## Key Features

- **Modern Syntax & Tooling:** Written in TypeScript and running on Deno for
  improved development experience, security, and performance.
- **Efficient Linear Algebra:** Uses Rust's [nalgebra](https://nalgebra.org/)
  compiled to WebAssembly to accelerate matrix operations.
- **Comprehensive Functionality:** Provides a full suite of operations for
  vectors and matrices, including elementary operations, statistics, time series
  analysis, and financial computations.
- **High Performance:** Benchmarks show significant speed improvements over
  traditional JavaScript libraries, making Ubique ideal for
  computation-intensive applications.

## Performance Highlights

Ubique demonstrates exceptional performance gains across multiple operations compared to math.js (benchmarked on Mac mini M1):

### Matrix Operations
- **Matrix Multiply (500x500):** 13.05x faster
- **Matrix Add (100x100):** 6.61x faster
- **Transpose (100x100):** 4.63x faster

### Linear Algebra
- **Determinant (50x50):** 26.04x faster
- **Matrix Inverse (20x20):** 7.53x faster
- **Determinant (20x20):** 12.27x faster

### Interactive Benchmark

Want to see these performance gains in action?

- **Browser:** Check out our **[interactive benchmark page](https://nodalstudio.github.io/Ubique/benchmark.html)** with live matrix visualizations and real-time performance comparisons!
- **CLI:** Run `deno task benchmark` for a comprehensive terminal-based benchmark suite with colored output and detailed results.

## Installation

### For Deno

Ubique is published on [JSR (JavaScript Registry)](https://jsr.io/@nodalstudio/ubique):

```bash
deno add @nodalstudio/ubique
```

Or import directly:

```ts
import * as ubique from "jsr:@nodalstudio/ubique";
```

### For Node.js / npm

**Option 1: Using JSR auto-generated package**
```bash
npm install @jsr/nodalstudio__ubique
```

```ts
import * as ubique from "@jsr/nodalstudio__ubique";
```

**Option 2: Using JSR specifier (Node.js 20.6+)**
```bash
npm install jsr:@nodalstudio/ubique
```

```ts
import * as ubique from "@nodalstudio/ubique";
```

### For browsers

Use the esm.sh CDN to load Ubique directly in the browser:

```html
<script type="module">
  import * as ubique from 'https://esm.sh/jsr/@nodalstudio/ubique@1.0.0';

  const matrix = ubique.inv([[1, 2], [3, 4]]);
  console.log(matrix);
</script>
```

### For development

Clone the repository to contribute or explore the source code:

```bash
git clone https://github.com/NodalStudio/Ubique.git
cd ubique
```

## Usage

Below is a quick example demonstrating matrix multiplication with Ubique:

```ts
// Deno
import * as ubique from "jsr:@nodalstudio/ubique";

// Node.js
// import * as ubique from "@jsr/nodalstudio__ubique";

const A = ubique.matrix([
  [1, 2],
  [3, 4],
]);

const B = ubique.matrix([
  [5, 6],
  [7, 8],
]);

const C = ubique.multiply(A, B);
console.log(C);
// Expected Output:
// [
//   [19, 22],
//   [43, 50],
// ]
```

Ubique's API is designed to be intuitive, closely mirroring familiar operations
from MATLAB-like environments.

## Contributing

Contributions are welcome and encouraged! If you have ideas or improvements,
please fork the repository and submit a pull request. For issues or feature
requests, use the [GitHub Issues](https://github.com/nodalstudio/ubique/issues)
page.

## License

Ubique is released under the MIT License. See the [LICENSE](LICENSE) file for
more details.
