import assert from 'assert';
import { fix } from '../../lib/matarrs/fix.js';

// Example 1: Round a single number toward zero
assert.strictEqual(fix(3.78), 3);
assert.strictEqual(fix(-3.78), -3);

// Example 2: Round an array of numbers toward zero
assert.deepStrictEqual(fix([4.51, -1.4]), [4, -1]);
assert.deepStrictEqual(fix([-2.99, 2.99, 0]), [-2, 2, 0]);

// Example 3: Round a matrix of numbers toward zero
const matrixInput = [[4.51, -1.4], [3.78, 0.01]];
const expectedMatrixOutput = [[4, -1], [3, 0]];
assert.deepStrictEqual(fix(matrixInput), expectedMatrixOutput);

// Example 4: Handle a matrix with negative numbers
const negativeMatrixInput = [[-4.51, -1.99], [-3.78, -0.01]];
const expectedNegativeMatrixOutput = [[-4, -1], [-3, 0]];
assert.deepStrictEqual(fix(negativeMatrixInput), expectedNegativeMatrixOutput);

// Example 5: Handle edge cases (zero and very small numbers)
assert.strictEqual(fix(0), 0);
assert.strictEqual(fix(-0.001), 0);
assert.deepStrictEqual(fix([0.00001, -0.00001]), [0, 0]);

