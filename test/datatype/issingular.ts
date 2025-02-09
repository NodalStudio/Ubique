import assert from 'assert';
import issingular from '../../lib/datatype/issingular.js';

// Example 1: Non-singular square matrix
assert.strictEqual(issingular([[2, 6], [1, 3]]), false);

// Example 2: Singular square matrix (diagonal element is zero)
assert.strictEqual(issingular([[0, 6], [1, 3]]), true);

// Example 3: Not a matrix (single number input)
assert.throws(() => { issingular(5); }, Error, 'input must be a matrix');

// Example 4: Non-square matrix
assert.throws(() => { issingular([[1, 2, 3], [4, 5, 6]]); }, Error, 'input must be a square matrix');
