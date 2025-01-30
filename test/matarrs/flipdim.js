import assert from 'assert';
import { flipdim } from '../../lib/matarrs/flipdim.js';

// Example 1: Flip a 1D array (dim = 1)
assert.deepStrictEqual(flipdim([5, 6, 3], 1), [3, 6, 5]);

// Example 2: Flip a 1D array with no dimension specified (no change)
assert.deepStrictEqual(flipdim([5, 6, 3], 0), [5, 6, 3]);

// Example 3: Flip a 2D matrix along columns (dim = 1)
assert.deepStrictEqual(flipdim([[5, 6, 5], [7, 8, -1]]), [[5, 6, 5], [-1, 8, 7]]);

// Example 4: Flip a 2D matrix along rows (dim = 0)
assert.deepStrictEqual(flipdim([[5, 6, 5], [7, 8, -1]], 0), [[7, 8, -1], [5, 6, 5]]);
