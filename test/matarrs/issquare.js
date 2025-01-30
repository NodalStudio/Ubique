import assert from 'assert';
import { issquare } from '../../lib/matarrs/issquare.js';


// Example 1: Valid square matrix
assert.strictEqual(issquare([[9, 5], [6, 1]]), true); // true

// Example 2: Non-square matrix (more rows than columns)
assert.strictEqual(issquare([[9, 5], [6, 1], [7, 8]]), false); // false

// Example 3: Non-square matrix (more columns than rows)
assert.strictEqual(issquare([[9, 5, 3], [6, 1, 7]]), false); // false

// Example 4: Single element (1x1 matrix)
assert.strictEqual(issquare([[9]]), true); // true

// Example 5: Empty matrix (should throw an error)
assert.throws(() => { issquare([]) }, Error);

// Example 6: Invalid input (not a matrix)
assert.throws(() => { issquare(123) }, Error);
