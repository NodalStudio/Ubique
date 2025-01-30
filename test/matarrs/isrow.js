import assert from 'assert';
import { isrow } from '../../lib/matarrs/isrow.js';

// Example 1: Valid row vector
assert.strictEqual(isrow([[2, 2]]), true);

// Example 2: Column vector (not a row vector)
assert.strictEqual(isrow([[2], [2]]), false);

// Example 3: Row vector with multiple columns
assert.strictEqual(isrow([[1, 2, 3]]), true);

// Example 4: Square matrix (not a row vector)
assert.strictEqual(isrow([[1, 2], [3, 4]]), false);

// Example 5: Single-element row vector
assert.strictEqual(isrow([[1]]), true);

// Example 6: Invalid input (not a matrix)
assert.throws(() => isrow(5), /Input must be a non-empty matrix/);

// Example 7: Empty matrix (should throw an error)
assert.throws(() => isrow([]), /Input must be a non-empty matrix/);
