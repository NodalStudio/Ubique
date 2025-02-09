import assert from 'assert';
import ceil from '../../lib/elemop/ceil.js';

// Example 1: Round a number (Math.PI) to 12 decimal places
assert.strictEqual(ceil(Math.PI, 12), 3.141592653590);

// Example 2: Round a number (3.78) toward positive infinity
assert.strictEqual(ceil(3.78), 4);

// Example 3: Round an array of numbers
assert.deepStrictEqual(ceil([4.51, -1.4]), [5, -1]);

// Example 4: Round a matrix of numbers to 2 decimal places
assert.deepStrictEqual(ceil([[4.5134, -1.4345], [3.7809, 0.0134]], 2), [[4.52, -1.43], [3.79, 0.02]]);
