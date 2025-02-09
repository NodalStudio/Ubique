import assert from 'assert';
import isempty from '../../lib/datatype/isempty.js';

// Example 1: An empty array
assert.strictEqual(isempty([]), true);

// Example 2: A 2D array with an empty first row (considered empty matrix)
assert.strictEqual(isempty([[]]), true);

// Example 3: A non-empty 1D array
assert.strictEqual(isempty([1, 2, 3]), false);

// Example 4: A non-empty 2D array
assert.strictEqual(isempty([[1, 2], [3, 4]]), false);

// Example 5: A non-array input
assert.strictEqual(isempty(123), false);
