import assert from 'assert';
import { vertcat } from '../../lib/matarrs/vertcat.js';

// Example 1: Concatenate two matrices
assert.deepStrictEqual(vertcat([[5,6,5],[7,8,-1]],[[-1,3,-1],[4,5,9]]),
  [[5, 6, 5], [7, 8, -1], [-1, 3, -1], [4, 5, 9]]);

// Example 2: Concatenate single numbers
assert.deepStrictEqual(vertcat(5,7,9,8), [[5], [7], [9], [8]]);

// Example 3: Concatenate row vectors
assert.deepStrictEqual(vertcat([1,2,3],[4,5,6]), [[1,2,3], [4,5,6]]);

// Example 4: Concatenate column vectors
assert.deepStrictEqual(vertcat([[1],[2],[3]], [[4],[5],[6]]), [[1], [2], [3], [4], [5], [6]]);

// Example 5: Invalid input (no arguments)
assert.throws(() => vertcat(), /Not enough input arguments./);
