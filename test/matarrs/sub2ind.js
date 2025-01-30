import assert from 'assert';
import { sub2ind } from '../../lib/matarrs/sub2ind.js';

// Example 1: Convert single 2D coordinate to linear index
assert.strictEqual(sub2ind([2, 3], [1, 2]), 5);

// Example 2: Convert multiple 2D coordinates to linear indices
assert.deepStrictEqual(sub2ind([2, 3], [[0, 0], [1, 0], [0, 1]]), [0, 1, 2]);

// Example 3: Convert index for a row vector
assert.strictEqual(sub2ind([1, 3], [2, 0]), 2);

// Example 4: Convert multiple indices for a row vector
assert.deepStrictEqual(sub2ind([1, 3], [[0, 0], [1, 0], [2, 0]]), [0, 1, 2]);

// Example 5: Convert multiple indices for a column vector
assert.deepStrictEqual(sub2ind([3, 2], [[0, 0], [1, 0], [2, 1]]), [0, 1, 5]);

// Example 6: Missing input arguments
assert.throws(() => sub2ind(), /Not enough input arguments./);

// Example 7: Invalid input (null index)
assert.throws(() => sub2ind([2, 3], null), /Not enough input arguments./);

// Example 8: Invalid input (empty index)
assert.throws(() => sub2ind([2, 3], []), /Column index must be an integer between 0 and N - 1 columns/);
