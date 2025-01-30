import assert from 'assert';
import { uminus } from '../../lib/elemop/uminus.js';

// Example 1: Unary minus on a single number
assert.strictEqual(uminus(-5), 5);

// Example 2: Unary minus on an array of numbers
assert.deepStrictEqual(uminus([5, 6]), [-5, -6]);

// Example 3: Unary minus on a matrix of numbers
assert.deepStrictEqual(uminus([[5, 6], [-1, -3]]), [[-5, -6], [1, 3]]);
