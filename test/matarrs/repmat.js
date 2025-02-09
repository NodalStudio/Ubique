import assert from 'assert';
import repmat from '../../lib/matarrs/repmat.js';

// Example 1: Replicate a scalar value into a 3x3 matrix
assert.deepStrictEqual(repmat(10, 3), [
  [10, 10, 10],
  [10, 10, 10],
  [10, 10, 10]
]);

// Example 2: Replicate a scalar into a 3x2 matrix
assert.deepStrictEqual(repmat(0.5, 3, 2), [
  [0.5, 0.5],
  [0.5, 0.5],
  [0.5, 0.5]
]);

// Example 3: Replicate a row vector
assert.deepStrictEqual(repmat([5, 6, 3], 1, 2), [
  [5, 6, 3, 5, 6, 3]
]);

// Example 4: Replicate a 2x2 matrix
assert.deepStrictEqual(repmat([[9, 5], [6, 1]], 2), [
  [9, 5, 9, 5],
  [6, 1, 6, 1],
  [9, 5, 9, 5],
  [6, 1, 6, 1]
]);

// Example 5: Replicate a column vector
assert.deepStrictEqual(repmat([[2], [3]], 2, 3), [
  [2, 2, 2],
  [3, 3, 3],
  [2, 2, 2],
  [3, 3, 3]
]);

// Example 6: Single-element matrix repeated
assert.deepStrictEqual(repmat([[7]], 2, 2), [
  [7, 7],
  [7, 7]
]);

// Example 7: Boolean replication
assert.deepStrictEqual(repmat(true, 2, 2), [
  [true, true],
  [true, true]
]);

// Example 8: Replicating a single-element array
assert.deepStrictEqual(repmat([4], 3, 2), [
  [4, 4],
  [4, 4],
  [4, 4]
]);
