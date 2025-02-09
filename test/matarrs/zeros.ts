import assert from 'assert';
import zeros from '../../lib/matarrs/zeros.js';

// Example 1: Create a 1x1 matrix of zeros (default behavior)
assert.deepStrictEqual(zeros(), [[0]]);

// Example 2: Create a 2x2 square matrix of zeros
assert.deepStrictEqual(zeros(2), [[0, 0], [0, 0]]);

// Example 3: Create a 2x3 matrix of zeros
assert.deepStrictEqual(zeros(2, 3), [[0, 0, 0], [0, 0, 0]]);

// Example 4: Create a 2x1 matrix of zeros using array input
assert.deepStrictEqual(zeros([2, 1]), [[0], [0]]);
