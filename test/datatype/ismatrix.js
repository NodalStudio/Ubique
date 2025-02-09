import assert from 'assert';
import ismatrix from '../../lib/datatype/ismatrix.js';

// Example 1: Valid matrix of numbers with one row
assert.strictEqual(ismatrix([[1, 3, 4]]), true);

// Example 2: Valid matrix of numbers with multiple rows
assert.strictEqual(ismatrix([[1], [3], [4]]), true);

// Example 3: Invalid matrix due to varying row lengths
assert.strictEqual(ismatrix([[1, 2], [3, 4, 5]]), false);

// Example 4: Invalid matrix with non-number elements
assert.strictEqual(ismatrix([[1, 2], [3, '4']]), true);

// Example 5: Empty array (not a matrix)
assert.strictEqual(ismatrix([]), false);

// Example 6: Not an array (invalid input)
assert.strictEqual(ismatrix(123), false);

// Example 7: Array of non-arrays (not a matrix)
assert.strictEqual(ismatrix([1, 2, 3]), false);

// Example 8: Valid matrix of numbers with NaN values
assert.strictEqual(ismatrix([[NaN, 2, 3], [4, 5, NaN]]), true);

// Example 9: Invalid matrix with mixed types (not all numbers)
assert.strictEqual(ismatrix([[1, "b", true], [4, "e", false]]), true);

// Example 10: Nested arrays but not uniform length
assert.strictEqual(ismatrix([[1, [2]], [[3]], [4]]), false);

// Example 11: Empty matrix
assert.strictEqual(ismatrix([[]]), true);
