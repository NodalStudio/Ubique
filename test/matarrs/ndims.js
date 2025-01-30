import assert from 'assert';
import { ndims } from '../../lib/matarrs/ndims.js';

// Example 1: 1D array
assert.strictEqual(ndims([3, 5, 6]), 2);

// Example 2: 2D array
assert.strictEqual(ndims([[3, 2, 7], [4, 5, 6]]), 2);
