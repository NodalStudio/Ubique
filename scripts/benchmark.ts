/**
 * Unified Rubique Benchmark Suite.
 * Comprehensive performance comparison against math.js
 *
 * Run with: deno task benchmark
 */

// deno-lint-ignore no-unversioned-import
import * as mathjs from "npm:mathjs";
import {
  corrcoef,
  det,
  // Linear Algebra
  inv,
  max,
  // Statistics
  mean,
  median,
  min,
  mtimes,
  plus,
  std,
  // Matrix Operations
  transpose,
  varc,
} from "../index.ts";
import process from "node:process";

// Terminal colors
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
  bgBlue: "\x1b[44m",
  bgGreen: "\x1b[42m",
  bgRed: "\x1b[41m",
};

const COMPARISON_DECIMALS = 6;

// Benchmark result interface
interface BenchmarkResult {
  name: string;
  category: string;
  rubiqueTime: number;
  mathjsTime: number;
  speedup: number;
  correct: boolean;
  size?: string;
}

interface MatrixPair {
  a: number[][];
  b: number[][];
}

interface ArrayPair {
  a: number[];
  b: number[];
}

type InputType = "array" | "arrayPair" | "matrix" | "matrixPair";

interface BaseBenchmarkTest<TInput, TType extends InputType> {
  category: string;
  name: string;
  inputType: TType;
  setup: () => TInput;
  rubique: (data: TInput) => unknown;
  mathjs: (data: TInput) => unknown;
  iterations: number;
  size?: string;
}

type BenchmarkTest =
  | BaseBenchmarkTest<number[], "array">
  | BaseBenchmarkTest<ArrayPair, "arrayPair">
  | BaseBenchmarkTest<number[][], "matrix">
  | BaseBenchmarkTest<MatrixPair, "matrixPair">;

// Test data generators
function generateArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.random() * 100);
}

function generateMatrix(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }, () => generateArray(cols));
}

function generateNonSingularMatrix(n: number): number[][] {
  const mat = generateMatrix(n, n);
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 0; j < n; j++) {
      if (i !== j) sum += Math.abs(mat[i][j]);
    }
    mat[i][i] = sum + 10;
  }
  return mat;
}

// Benchmark utilities
function benchmarkFunction<T>(fn: () => T, iterations: number): number {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const time = performance.now() - start;
  return time / iterations; // Return average time per iteration
}

function roundToDecimals(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

function arraysEqual(a: unknown, b: unknown, tolerance = 1e-9): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => arraysEqual(val, b[i], tolerance));
  }
  if (typeof a === "number" && typeof b === "number") {
    const roundedA = roundToDecimals(a, COMPARISON_DECIMALS);
    const roundedB = roundToDecimals(b, COMPARISON_DECIMALS);

    // Use adaptive relative tolerance after rounding for large numbers
    const maxVal = Math.max(Math.abs(roundedA), Math.abs(roundedB));
    const adaptiveTolerance = Math.max(tolerance, maxVal * 1e-6);
    return Math.abs(roundedA - roundedB) < adaptiveTolerance;
  }
  return a === b;
}

// Print utilities
function printHeader(title: string) {
  console.log(
    "\n" + colors.bright + colors.cyan + "=".repeat(90) + colors.reset,
  );
  console.log(
    colors.bright +
      colors.cyan +
      title.padStart((90 + title.length) / 2) +
      colors.reset,
  );
  console.log(
    colors.bright + colors.cyan + "=".repeat(90) + colors.reset + "\n",
  );
}

function printSectionHeader(title: string, emoji: string) {
  console.log(
    colors.bright + colors.magenta + `\n${emoji} ${title}` + colors.reset,
  );
  console.log(colors.dim + "─".repeat(90) + colors.reset);
}

function printTableHeader() {
  const headers = [
    "Test".padEnd(30),
    "Rubique".padEnd(12),
    "math.js".padEnd(12),
    "Speedup".padEnd(15),
    "Status".padEnd(8),
  ];
  console.log(colors.bright + headers.join("") + colors.reset);
  console.log(colors.dim + "─".repeat(90) + colors.reset);
}

function printTestResult(result: BenchmarkResult) {
  const speedupColor = result.speedup >= 1 ? colors.green : colors.red;
  const speedupText = result.speedup >= 1
    ? `${result.speedup.toFixed(2)}x faster`
    : `${(1 / result.speedup).toFixed(2)}x slower`;

  const statusIcon = result.correct ? "✅" : "❌";

  const row = [
    result.name.padEnd(30),
    colors.cyan +
    `${result.rubiqueTime.toFixed(2)}ms`.padEnd(12) +
    colors.reset,
    colors.dim + `${result.mathjsTime.toFixed(2)}ms`.padEnd(12) + colors.reset,
    speedupColor + speedupText.padEnd(15) + colors.reset,
    statusIcon,
  ];

  console.log(row.join(""));
}

function printProgress(current: number, total: number, testName: string) {
  const percent = Math.round((current / total) * 100);
  const barLength = 40;
  const filledLength = Math.round((barLength * current) / total);
  const bar = "█".repeat(filledLength) + "░".repeat(barLength - filledLength);

  process.stdout.write("\r" + " ".repeat(100) + "\r");
  process.stdout.write(
    colors.cyan +
      `[${bar}] ${percent}%` +
      colors.reset +
      colors.dim +
      ` - ${testName}` +
      colors.reset,
  );
}

function printSummary(results: BenchmarkResult[]) {
  console.log("\n");
  printHeader("📊 BENCHMARK SUMMARY");

  const avgSpeedup = results.reduce((sum, r) => sum + r.speedup, 0) /
    results.length;
  const wonTests = results.filter((r) => r.speedup > 1).length;
  const lostTests = results.filter((r) => r.speedup < 1).length;
  const allCorrect = results.every((r) => r.correct);
  const bestTest = results.reduce((best, r) =>
    r.speedup > best.speedup ? r : best
  );
  const worstTest = results.reduce((worst, r) =>
    r.speedup < worst.speedup ? r : worst
  );

  // Summary stats
  console.log(colors.bright + "Overall Performance:" + colors.reset);
  console.log(
    `  ${colors.green}Average Speedup:${colors.reset} ${colors.bright}${
      avgSpeedup.toFixed(2)
    }x${colors.reset}`,
  );
  console.log(
    `  ${colors.green}Tests Won:${colors.reset} ${wonTests}/${results.length} ${colors.dim}(${
      ((wonTests / results.length) * 100).toFixed(1)
    }%)${colors.reset}`,
  );
  console.log(
    `  ${colors.red}Tests Lost:${colors.reset} ${lostTests}/${results.length}`,
  );
  console.log(
    `  ${colors.cyan}Correctness:${colors.reset} ${
      allCorrect
        ? colors.green + "✅ All tests passed"
        : colors.red + "❌ Some tests failed"
    }${colors.reset}`,
  );

  console.log(colors.bright + "\nHighlights:" + colors.reset);
  console.log(
    `  ${colors.green}🏆 Best:${colors.reset} ${bestTest.name} ${colors.bright}(${
      bestTest.speedup.toFixed(2)
    }x)${colors.reset}`,
  );
  if (worstTest.speedup < 1) {
    console.log(
      `  ${colors.red}⚠️  Slowest:${colors.reset} ${worstTest.name} ${colors.dim}(${
        (1 / worstTest.speedup).toFixed(2)
      }x slower)${colors.reset}`,
    );
  }

  // Category breakdown
  console.log(colors.bright + "\nBy Category:" + colors.reset);
  const categories = [...new Set(results.map((r) => r.category))];
  for (const category of categories) {
    const categoryResults = results.filter((r) => r.category === category);
    const categoryAvg = categoryResults.reduce((sum, r) => sum + r.speedup, 0) /
      categoryResults.length;
    const categoryWon = categoryResults.filter((r) => r.speedup > 1).length;

    console.log(
      `  ${category.padEnd(20)} ${colors.cyan}${
        categoryAvg.toFixed(2)
      }x${colors.reset} ${colors.dim}(${categoryWon}/${categoryResults.length} won)${colors.reset}`,
    );
  }

  console.log("\n" + colors.cyan + "=".repeat(90) + colors.reset);
}

// Main benchmark suite
function runBenchmarks() {
  const results: BenchmarkResult[] = [];

  printHeader("🚀 RUBIQUE vs math.js BENCHMARK SUITE");
  console.log(
    colors.dim + "Running comprehensive performance tests...\n" + colors.reset,
  );

  // Define all tests
  const tests = [
    // ========== STATISTICS TESTS ==========
    {
      category: "Statistics",
      name: "Mean (n=10,000)",
      inputType: "array",
      setup: () => generateArray(10000),
      rubique: (data: number[]) => mean(data),
      mathjs: (data: number[]) => mathjs.mean(data),
      iterations: 100,
    },
    {
      category: "Statistics",
      name: "Std Dev (n=1,000)",
      inputType: "array",
      setup: () => generateArray(1000),
      rubique: (data: number[]) => std(data),
      mathjs: (data: number[]) => mathjs.std(data),
      iterations: 100,
    },
    {
      category: "Statistics",
      name: "Variance (n=1,000)",
      inputType: "array",
      setup: () => generateArray(1000),
      rubique: (data: number[]) => varc(data),
      mathjs: (data: number[]) => mathjs.variance(data),
      iterations: 100,
    },
    {
      category: "Statistics",
      name: "Max (n=1,000)",
      inputType: "array",
      setup: () => generateArray(1000),
      rubique: (data: number[]) => max(data),
      mathjs: (data: number[]) => mathjs.max(data),
      iterations: 200,
    },
    {
      category: "Statistics",
      name: "Min (n=1,000)",
      inputType: "array",
      setup: () => generateArray(1000),
      rubique: (data: number[]) => min(data),
      mathjs: (data: number[]) => mathjs.min(data),
      iterations: 200,
    },
    {
      category: "Statistics",
      name: "Median (n=1,000)",
      inputType: "array",
      setup: () => generateArray(1000),
      rubique: (data: number[]) => median(data),
      mathjs: (data: number[]) => mathjs.median(data),
      iterations: 100,
    },
    {
      category: "Statistics",
      name: "Correlation (n=10,000)",
      inputType: "arrayPair",
      setup: (): ArrayPair => ({
        a: generateArray(10000),
        b: generateArray(10000),
      }),
      rubique: (data: ArrayPair) => {
        const matrix = corrcoef(data.a, data.b);
        return matrix[0][1];
      },
      mathjs: (data: ArrayPair) => mathjs.corr(data.a, data.b),
      iterations: 50,
    },

    // ========== MATRIX OPERATIONS ==========
    {
      category: "Matrix Operations",
      name: "Transpose (100×100)",
      inputType: "matrix",
      setup: () => generateMatrix(100, 100),
      rubique: (matrix: number[][]) => transpose(matrix),
      mathjs: (matrix: number[][]) => mathjs.transpose(matrix),
      iterations: 100,
      size: "100×100",
    },
    {
      category: "Matrix Operations",
      name: "Matrix Add (100×100)",
      inputType: "matrixPair",
      setup: (): MatrixPair => ({
        a: generateMatrix(100, 100),
        b: generateMatrix(100, 100),
      }),
      rubique: (data: MatrixPair) => plus(data.a, data.b),
      mathjs: (data: MatrixPair) => mathjs.add(data.a, data.b),
      iterations: 100,
      size: "100×100",
    },
    {
      category: "Matrix Operations",
      name: "Matrix Multiply (10×10)",
      inputType: "matrixPair",
      setup: (): MatrixPair => ({
        a: generateMatrix(10, 10),
        b: generateMatrix(10, 10),
      }),
      rubique: (data: MatrixPair) => mtimes(data.a, data.b),
      mathjs: (data: MatrixPair) => mathjs.multiply(data.a, data.b),
      iterations: 500,
      size: "10×10",
    },
    {
      category: "Matrix Operations",
      name: "Matrix Multiply (50×50)",
      inputType: "matrixPair",
      setup: (): MatrixPair => ({
        a: generateMatrix(50, 50),
        b: generateMatrix(50, 50),
      }),
      rubique: (data: MatrixPair) => mtimes(data.a, data.b),
      mathjs: (data: MatrixPair) => mathjs.multiply(data.a, data.b),
      iterations: 100,
      size: "50×50",
    },
    {
      category: "Matrix Operations",
      name: "Matrix Multiply (100×100)",
      inputType: "matrixPair",
      setup: (): MatrixPair => ({
        a: generateMatrix(100, 100),
        b: generateMatrix(100, 100),
      }),
      rubique: (data: MatrixPair) => mtimes(data.a, data.b),
      mathjs: (data: MatrixPair) => mathjs.multiply(data.a, data.b),
      iterations: 50,
      size: "100×100",
    },
    {
      category: "Matrix Operations",
      name: "Matrix Multiply (500×500)",
      inputType: "matrixPair",
      setup: (): MatrixPair => ({
        a: generateMatrix(500, 500),
        b: generateMatrix(500, 500),
      }),
      rubique: (data: MatrixPair) => mtimes(data.a, data.b),
      mathjs: (data: MatrixPair) => mathjs.multiply(data.a, data.b),
      iterations: 5,
      size: "500×500",
    },

    // ========== LINEAR ALGEBRA ==========
    {
      category: "Linear Algebra",
      name: "Determinant (20×20)",
      inputType: "matrix",
      setup: () => generateMatrix(20, 20),
      rubique: (matrix: number[][]) => det(matrix),
      mathjs: (matrix: number[][]) => mathjs.det(matrix),
      iterations: 100,
      size: "20×20",
    },
    {
      category: "Linear Algebra",
      name: "Determinant (50×50)",
      inputType: "matrix",
      setup: () => generateMatrix(50, 50),
      rubique: (matrix: number[][]) => det(matrix),
      mathjs: (matrix: number[][]) => mathjs.det(matrix),
      iterations: 50,
      size: "50×50",
    },
    {
      category: "Linear Algebra",
      name: "Matrix Inverse (10×10)",
      inputType: "matrix",
      setup: () => generateNonSingularMatrix(10),
      rubique: (matrix: number[][]) => inv(matrix),
      mathjs: (matrix: number[][]) => mathjs.inv(matrix),
      iterations: 200,
      size: "10×10",
    },
    {
      category: "Linear Algebra",
      name: "Matrix Inverse (20×20)",
      inputType: "matrix",
      setup: () => generateNonSingularMatrix(20),
      rubique: (matrix: number[][]) => inv(matrix),
      mathjs: (matrix: number[][]) => mathjs.inv(matrix),
      iterations: 100,
      size: "20×20",
    },
  ] satisfies BenchmarkTest[];

  const totalTests = tests.length;
  let currentCategory = "";

  const categoryEmojis: Record<string, string> = {
    Statistics: "📊",
    "Matrix Operations": "🔢",
    "Linear Algebra": "🔬",
  };

  const runTypedTest = <TInput, TType extends InputType>(
    test: BaseBenchmarkTest<TInput, TType>,
    index: number,
  ) => {
    if (test.category !== currentCategory) {
      if (index > 0) printTableHeader();
      printSectionHeader(test.category, categoryEmojis[test.category] || "📈");
      printTableHeader();
      currentCategory = test.category;
    }

    printProgress(index + 1, totalTests, test.name);

    const testData = test.setup();
    const rubiqueTime = benchmarkFunction(
      () => test.rubique(testData),
      test.iterations,
    );
    const mathjsTime = benchmarkFunction(
      () => test.mathjs(testData),
      test.iterations,
    );

    const rubiqueResult = test.rubique(testData);
    const mathjsResult = test.mathjs(testData);
    const correct = arraysEqual(rubiqueResult, mathjsResult);
    const speedup = mathjsTime / rubiqueTime;

    const result: BenchmarkResult = {
      name: test.name,
      category: test.category,
      rubiqueTime,
      mathjsTime,
      speedup,
      correct,
      size: test.size,
    };

    results.push(result);
    process.stdout.write("\r" + " ".repeat(100) + "\r");
    printTestResult(result);
  };

  const runTest = (test: BenchmarkTest, index: number) => {
    switch (test.inputType) {
      case "array":
        return runTypedTest(
          test as BaseBenchmarkTest<number[], "array">,
          index,
        );
      case "arrayPair":
        return runTypedTest(
          test as BaseBenchmarkTest<ArrayPair, "arrayPair">,
          index,
        );
      case "matrix":
        return runTypedTest(
          test as BaseBenchmarkTest<number[][], "matrix">,
          index,
        );
      case "matrixPair":
        return runTypedTest(
          test as BaseBenchmarkTest<MatrixPair, "matrixPair">,
          index,
        );
      default: {
        const exhaustiveCheck: never = test;
        throw new Error(`Unsupported input type: ${String(exhaustiveCheck)}`);
      }
    }
  };

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    runTest(test, i);
  }

  // Print summary
  printSummary(results);

  // Save results to file
  console.log(
    colors.dim +
      "\n💾 Saving results to benchmark-unified-results.json..." +
      colors.reset,
  );
  Deno.writeTextFileSync(
    "benchmark-unified-results.json",
    JSON.stringify(results, null, 2),
  );
  console.log(
    colors.green + "✅ Results saved successfully!" + colors.reset + "\n",
  );

  return results;
}

// Run benchmarks
if (import.meta.main) {
  console.clear();
  await runBenchmarks();
}
