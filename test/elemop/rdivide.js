import assert from 'assert';
import { rdivide } from '../../lib/elemop/rdivide.js';

// Example 1: Divide two numbers
assert.strictEqual(rdivide(3, 6), 0.5);

// Example 2: Divide a matrix by a scalar
const a = [[5, 6, 5], [7, 8, -1]];
assert.deepStrictEqual(rdivide(a, 3), [[1.6666666666666667, 2, 1.6666666666666667],
  [2.3333333333333335, 2.6666666666666665, -0.3333333333333333]]);

// Example 3: Divide a scalar by a vector
assert.deepStrictEqual(rdivide(3, [-1, -2, -3]), [-3, -1.5, -1]);

// Example 4: Element-wise division of two vectors
assert.deepStrictEqual(rdivide([5, 6, 7], [-1, -2, -3]), [-5, -3, -2.3333333333333335]);

// Example 5: Element-wise division of two matrices
const e = [[9, 5], [6, 1]];
const f = [[3, 2], [5, 2]];
assert.deepStrictEqual(rdivide(e, f), [[3, 2.5], [1.2, 0.5]]);

// Example 6: Divide a matrix by a scalar
assert.deepStrictEqual(rdivide(e, 3), [[3, 1.6666666666666667], [2, 0.3333333333333333]]);
