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
    [10000, 10000, 10000],
  ];

  const results = matrixSizes.map(([rowsA, colsA, colsB]) => {
    console.log(`\nTesting ${rowsA}x${colsA} * ${colsA}x${colsB} ...`);

    // Generate random matrices
    const A = randomMatrix(rowsA, colsA);
    const B = randomMatrix(colsA, colsB);

    // Benchmark custom mtimes
    const customTime = benchmark(() => mtimes(A, B));

    // Benchmark math.js
    const mathTime = benchmark(() => math.multiply(A, B));

    // Compute how much faster (or slower) Custom is compared to math.js
    //   positive value => Custom is faster by X%
    //   negative value => Custom is slower by X%
    const fasterPercent = ((mathTime - customTime) / mathTime) * 100;

    return {
      size: `${rowsA}x${colsA}`,
      "Custom mtimes (ms)": customTime.toFixed(2),
      "math.js (ms)": mathTime.toFixed(2),
      "Faster (%)": fasterPercent.toFixed(2),
    };
  });

  // Display results
  console.log("\nResults:");
  console.table(results);
}

runBenchmark();
