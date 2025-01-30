import assert from 'assert';
import { strfind } from '../../lib/datatype/strfind.js';

// Example 1: Basic usage with multiple occurrences
assert.deepStrictEqual(strfind('find indices in the string', 'in'), [1, 5, 13, 23]);

// Example 2: Pattern appears only once
assert.deepStrictEqual(strfind('hello world', 'world'), [6]);

// Example 3: Pattern does not appear
assert.deepStrictEqual(strfind('hello world', 'notfound'), []);

// Example 4: Pattern is longer than the string
assert.strictEqual(strfind('short', 'longpattern'), null);

// Example 5: Invalid input (non-string arguments)
try {
  strfind(123, '12');
} catch (e) {
  assert.strictEqual(e.message, 'Both arguments must be strings');
}
