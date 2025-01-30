import assert from 'assert';
import { clone } from '../../lib/matarrs/clone.js';

// Example 1: Clone a matrix
assert.deepStrictEqual(clone([[-1, 3, -1], [4, 5, 9]]), [[-1, 3, -1], [4, 5, 9]]);

// Example 2: Clone an array
assert.deepStrictEqual(clone([5, 6, 3]), [5, 6, 3]);

// Example 3: Clone a single number
assert.strictEqual(clone(5), 5);
