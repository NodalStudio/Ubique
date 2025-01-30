import assert from 'assert';
import { rem } from '../../lib/elemop/rem.js';

// Example 1: Remainder of a vector divided by a scalar
assert.deepStrictEqual(rem([13, -11], 2.2), [2, 0]);

// Example 2: Remainder of two vectors
assert.deepStrictEqual(rem([13, -7], [5, 6]), [3, -1]);

// Example 3: Remainder of two matrices
const a = [[5, 6, 5], [7, 8, -1]];
const b = [[-1, 3, -1], [4, 5, 9]];
assert.deepStrictEqual(rem(a, b), [[0, 0, 0], [3, 3, -1]]);
