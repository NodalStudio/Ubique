import assert from 'assert';
import ones from '../../lib/matarrs/ones.js';

// Example 1: Create a 0x0 matrix
assert.deepStrictEqual(ones(0), []);

// Example 2: Create a 1x1 matrix
assert.deepStrictEqual(ones(1), [[1]]);

// Example 3: Create a 2x2 matrix
assert.deepStrictEqual(ones(2), [[1, 1], [1, 1]]);

// Example 4: Create a 2x1 matrix
assert.deepStrictEqual(ones([2, 1]), [[1], [1]]);

// Example 5: Create a 2x3 matrix
assert.deepStrictEqual(ones(2, 3), [[1, 1, 1], [1, 1, 1]]);
