import assert from 'assert';
import mod from '../../lib/elemop/mod.js';

// Example 1: Modulus of a vector with a scalar divisor
assert.deepStrictEqual(mod([13, -7], 2.2), [1.9999999999999991, -0.39999999999999947]);

// Example 2: Modulus of two vectors
assert.deepStrictEqual(mod([13, -7], [5, 6]), [3, -1]);

// Example 3: Modulus of two matrices
const a = [[5, 6, 5], [7, 8, -1]];
const b = [[-1, 3, -1], [4, 5, 9]];
assert.deepStrictEqual(mod(a, b), [[0, 0, 0], [3, 3, -1]]);
