#!/usr/bin/env node

/**
 * Quick smoke test for the npm package
 * Tests basic functionality to ensure the package works correctly
 */

const ubique = require("../npm/script/index.js");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (error) {
    console.error(`✗ ${name}`);
    console.error(`  ${error.message}`);
    failed++;
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || "Assertion failed");
  }
}

function assertArrayEquals(actual, expected, tolerance = 1e-10) {
  if (actual.length !== expected.length) {
    throw new Error(`Length mismatch: ${actual.length} !== ${expected.length}`);
  }
  for (let i = 0; i < actual.length; i++) {
    if (Array.isArray(actual[i])) {
      assertArrayEquals(actual[i], expected[i], tolerance);
    } else {
      if (Math.abs(actual[i] - expected[i]) > tolerance) {
        throw new Error(
          `Value mismatch at index ${i}: ${actual[i]} !== ${expected[i]}`
        );
      }
    }
  }
}

console.log("\n🧪 Running npm package tests...\n");

// Test 1: Basic matrix creation
test("Matrix creation - zeros", () => {
  const Z = ubique.zeros(2, 3);
  assert(Z.length === 2, "Should have 2 rows");
  assert(Z[0].length === 3, "Should have 3 columns");
  assert(Z[0][0] === 0, "Should contain zeros");
});

test("Matrix creation - ones", () => {
  const O = ubique.ones(3, 2);
  assert(O.length === 3, "Should have 3 rows");
  assert(O[0].length === 2, "Should have 2 columns");
  assert(O[0][0] === 1, "Should contain ones");
});

test("Matrix creation - eye", () => {
  const I = ubique.eye(3);
  assert(I.length === 3, "Should be 3x3");
  assert(I[0][0] === 1, "Diagonal should be 1");
  assert(I[0][1] === 0, "Off-diagonal should be 0");
  assert(I[1][1] === 1, "Diagonal should be 1");
});

// Test 2: Element operations
test("Matrix addition", () => {
  const A = [[1, 2], [3, 4]];
  const B = [[5, 6], [7, 8]];
  const C = ubique.plus(A, B);
  assertArrayEquals(C, [[6, 8], [10, 12]]);
});

test("Matrix multiplication", () => {
  const A = [[1, 2], [3, 4]];
  const B = [[5, 6], [7, 8]];
  const C = ubique.mtimes(A, B);
  assertArrayEquals(C, [[19, 22], [43, 50]]);
});

test("Matrix transpose", () => {
  const A = [[1, 2, 3], [4, 5, 6]];
  const At = ubique.transpose(A);
  assertArrayEquals(At, [[1, 4], [2, 5], [3, 6]]);
});

// Test 3: Linear algebra (WASM)
test("Matrix inverse (WASM)", () => {
  const A = [[4, 7], [2, 6]];
  const Ainv = ubique.inv(A);
  // Verify A * Ainv ≈ I
  const I = ubique.mtimes(A, Ainv);
  assertArrayEquals(I, [[1, 0], [0, 1]], 1e-10);
});

test("Matrix determinant (WASM)", () => {
  const A = [[1, 2], [3, 4]];
  const det = ubique.det(A);
  assert(Math.abs(det - (-2)) < 1e-10, "det([[1,2],[3,4]]) should be -2");
});

// Test 4: Statistics
test("Mean calculation", () => {
  const data = [1, 2, 3, 4, 5];
  const avg = ubique.mean(data);
  assert(Math.abs(avg - 3) < 1e-10, "Mean should be 3");
});

test("Standard deviation", () => {
  const data = [1, 2, 3, 4, 5];
  const std = ubique.std(data);
  assert(Math.abs(std - 1.5811388300841898) < 1e-10, "Std dev mismatch");
});

test("Sum", () => {
  const data = [1, 2, 3, 4, 5];
  const s = ubique.sum(data);
  assert(s === 15, "Sum should be 15");
});

test("Max and Min", () => {
  const data = [3, 1, 4, 1, 5, 9, 2, 6];
  const maxVal = ubique.max(data);
  const minVal = ubique.min(data);
  assert(maxVal === 9, "Max should be 9");
  assert(minVal === 1, "Min should be 1");
});

// Test 5: Element-wise operations
test("Element-wise power", () => {
  const A = [2, 3, 4];
  const B = ubique.power(A, 2);
  assertArrayEquals(B, [4, 9, 16]);
});

test("Cumulative sum", () => {
  const A = [1, 2, 3, 4];
  const B = ubique.cumsum(A);
  assertArrayEquals(B, [1, 3, 6, 10]);
});

// Test 6: Type checking
test("Type checking - ismatrix", () => {
  assert(ubique.ismatrix([[1, 2], [3, 4]]) === true, "Should be a matrix");
  assert(ubique.ismatrix([1, 2, 3]) === false, "Should not be a matrix");
});

test("Type checking - isvector", () => {
  assert(ubique.isvector([[1, 2, 3]]) === true, "Row vector should be a vector");
  assert(ubique.isvector([[1], [2], [3]]) === true, "Column vector should be a vector");
  assert(ubique.isvector([[1, 2], [3, 4]]) === false, "Matrix should not be a vector");
});

test("Type checking - isscalar", () => {
  assert(ubique.isscalar(5) === true, "Should be a scalar");
  assert(ubique.isscalar([5]) === true, "Single element array is scalar");
  assert(ubique.isscalar([1, 2]) === false, "Multiple elements should not be scalar");
});

// Test 7: Matrix utilities
test("Matrix size", () => {
  const A = [[1, 2, 3], [4, 5, 6]];
  const s = ubique.size(A);
  assertArrayEquals(s, [2, 3]);
});

test("Matrix reshape", () => {
  const A = [[1, 2, 3], [4, 5, 6]];
  const B = ubique.reshape(A, 3, 2);
  assert(B.length === 3, "Should have 3 rows");
  assert(B[0].length === 2, "Should have 2 columns");
  assertArrayEquals(B, [[1, 2], [3, 4], [5, 6]]);
});

// Test 8: Quantitative finance
test("Simple returns calculation", () => {
  const prices = [100, 110, 105, 115];
  const returns = ubique.tick2ret(prices);
  assert(returns.length === 3, "Should have n-1 returns");
  assert(Math.abs(returns[0] - 0.1) < 1e-10, "First return should be 0.1");
});

// Summary
console.log("\n" + "=".repeat(50));
console.log(`Tests passed: ${passed}`);
console.log(`Tests failed: ${failed}`);
console.log("=".repeat(50));

if (failed > 0) {
  console.log("\n❌ Some tests failed!");
  process.exit(1);
} else {
  console.log("\n✅ All tests passed!");
  process.exit(0);
}
