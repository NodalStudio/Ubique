# Rubique

Rubique is a modern reimplementation of the Ubique mathematical and quantitative
library. Built with contemporary JavaScript, TypeScript, and Deno, Rubique
delivers high-performance numerical computations by leveraging Rust’s
[nalgebra](https://nalgebra.org/) library compiled to WebAssembly. The library
provides a comprehensive suite of functions for vectors, matrices, linear
algebra, statistics, time series analysis, and computational finance.

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Performance Highlights](#performance-highlights)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

Rubique is designed for modern web and server-side applications requiring robust
and efficient mathematical operations. By integrating WebAssembly for heavy
linear algebra tasks and using Deno as its runtime, Rubique offers a secure and
developer-friendly environment. The library supports vectors, matrices, linear
algebra, statistics, time series analysis, and computational finance—all while
maintaining exceptional performance compared to traditional JavaScript
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
  traditional JavaScript libraries, making Rubique ideal for
  computation-intensive applications.

## Performance Highlights

Rubique demonstrates exceptional performance gains across multiple operations compared to math.js:

### Matrix Operations
- **Matrix Multiply (500x500):** 20.82x faster
- **Matrix Add (100x100):** 17.90x faster
- **Transpose (100x100):** 12.88x faster

### Statistical Functions
- **Sum (n=10000):** 20.38x faster
- **Standard Deviation (n=1000):** 3.19x faster
- **Mean (n=10000):** 2.42x faster

### Interactive Benchmark

Want to see these performance gains in action?

- **Browser:** Check out our **[interactive benchmark page](https://nodalstudio.github.io/Rubique/benchmark.html)** with live matrix visualizations and real-time performance comparisons!
- **CLI:** Run `deno task benchmark` for a comprehensive terminal-based benchmark suite with colored output and detailed results.

## Installation

### For Deno

Rubique is published on [JSR (JavaScript Registry)](https://jsr.io/@nodalstudio/rubique):

```bash
deno add @nodalstudio/rubique
```

Or import directly:

```ts
import * as rubique from "jsr:@nodalstudio/rubique";
```

### For Node.js / npm

**Option 1: Using JSR auto-generated package**
```bash
npm install @jsr/nodalstudio__rubique
```

```ts
import * as rubique from "@jsr/nodalstudio__rubique";
```

**Option 2: Using JSR specifier (Node.js 20.6+)**
```bash
npm install jsr:@nodalstudio/rubique
```

```ts
import * as rubique from "@nodalstudio/rubique";
```

### For browsers

Use the esm.sh CDN to load Rubique directly in the browser:

```html
<script type="module">
  import * as rubique from 'https://esm.sh/jsr/@nodalstudio/rubique@1.0.0';

  const matrix = rubique.inv([[1, 2], [3, 4]]);
  console.log(matrix);
</script>
```

### For development

Clone the repository to contribute or explore the source code:

```bash
git clone https://github.com/NodalStudio/Rubique.git
cd rubique
```

## Usage

Below is a quick example demonstrating matrix multiplication with Rubique:

```ts
// Deno
import * as rubique from "jsr:@nodalstudio/rubique";

// Node.js
// import * as rubique from "@jsr/nodalstudio__rubique";

const A = rubique.matrix([
  [1, 2],
  [3, 4],
]);

const B = rubique.matrix([
  [5, 6],
  [7, 8],
]);

const C = rubique.multiply(A, B);
console.log(C);
// Expected Output:
// [
//   [19, 22],
//   [43, 50],
// ]
```

Rubique’s API is designed to be intuitive, closely mirroring familiar operations
from Ubique and MATLAB-like environments.

## Contributing

Contributions are welcome and encouraged! If you have ideas or improvements,
please fork the repository and submit a pull request. For issues or feature
requests, use the [GitHub Issues](https://github.com/nodalstudio/rubique/issues)
page.

## License

Rubique is released under the MIT License. See the [LICENSE](LICENSE) file for
more details.
