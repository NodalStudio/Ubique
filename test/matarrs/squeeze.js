import assert from 'assert';
import { squeeze } from '../../lib/matarrs/squeeze.js';

// Example 1: Squeeze deeply nested arrays
assert.deepStrictEqual(squeeze([[[[[8]]]]]), [[8]]);

// Example 2: Squeeze nested arrays with multiple elements
assert.deepStrictEqual(squeeze([[[[3, 4, 5]]]]), [[3, 4, 5]]);

// Example 3: Squeeze nested arrays with 2D content
assert.deepStrictEqual(squeeze([[[[[['31-12-2014', '31-01-2015'], ['15-02-2015', '01-03-2015']]]]]]), [
  ['31-12-2014', '31-01-2015'],
  ['15-02-2015', '01-03-2015']
]);

// Example 4: Input is a number (no squeezing needed)
assert.strictEqual(squeeze(42), 42);

// Example 5: Input is a string (no squeezing needed)
assert.strictEqual(squeeze("hello"), "hello");

// Example 6: Throw an error for no input arguments
assert.throws(() => { squeeze(); }, Error, 'Not enough input arguments');

