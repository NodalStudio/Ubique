import * as math from "https://esm.sh/mathjs";
import { mtimes } from "../index.ts";

/**
 * Generates a random matrix of given dimensions
 */
function randomMatrix(rows: number, cols: number): number[][] {
  return Array.from(
    { length: rows },
    () => Array.from({ length: cols }, () => Math.random() * 10),
  );
}

/**
 * Measures execution time for a function (in ms),
 * returning the average of (iterations - 1) after dropping the worst (longest) run.
 */
function benchmark(func: () => void, iterations = 3): number {
  const times: number[] = [];
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    func();
    times.push(performance.now() - start);
  }
  // Return average time (ms), excluding the highest value
  const sortedTimes = [...times].sort((a, b) => a - b);
  return sortedTimes.slice(0, -1).reduce((acc, val) => acc + val, 0) /
    (iterations - 1);
}

function runBenchmark() {
  console.log("Starting benchmark...");

  const matrixSizes = [
    [10, 10, 10],
    [100, 100, 100],
    [1000, 1000, 1000],
  ];

  const results = matrixSizes.map(([rowsA, colsA, colsB]) => {
    console.log(`\nTesting ${rowsA}x${colsA} * ${colsA}x${colsB} ...`);

    // Generate random matrices
    const A = randomMatrix(rowsA, colsA);
    const B = randomMatrix(colsA, colsB);

    // Benchmark rubique mtimes
    const rubiqueTime = benchmark(() => mtimes(A, B));

    // Benchmark math.js
    const mathTime = benchmark(() => math.multiply(A, B));

    // Compute how much faster (or slower) rubique is compared to math.js
    const timesFaster = mathTime / rubiqueTime;

    return {
      size: `${rowsA}x${colsA}`,
      "Custom mtimes (ms)": rubiqueTime.toFixed(2),
      "math.js (ms)": mathTime.toFixed(2),
      "Faster": timesFaster.toFixed(2),
    };
  });

  // Display results
  console.log("\nResults:");
  console.table(results);
}

runBenchmark();
