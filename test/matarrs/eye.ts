import assert from 'assert';
import eye from '../../lib/matarrs/eye.js';

// Example 1: Create a 0x0 matrix (empty matrix)
assert.deepStrictEqual(eye(0), []);

// Example 2: Create a 1x1 identity matrix
assert.deepStrictEqual(eye(1), [[1]]);

// Example 3: Create a 2x2 identity matrix
assert.deepStrictEqual(eye(2), [[1, 0], [0, 1]]);

// Example 4: Create a 2x1 identity matrix
assert.deepStrictEqual(eye([2, 1]), [[1], [0]]);

// Example 5: Create a 2x3 identity matrix
assert.deepStrictEqual(eye(2, 3), [[1, 0, 0], [0, 1, 0]]);

