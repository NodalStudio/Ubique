import assert from 'assert';
import month from '../../lib/datatype/month.js';

// Example 1: Single timestamp
assert.strictEqual(month(1424708525), 1);

// Example 2: Array of timestamps
assert.deepStrictEqual(month([1414886399, 1414972799]), [10, 10]);

// Example 3: Matrix of timestamps
assert.deepStrictEqual(month([[1414886399, 1414972799], [1415059199, 1415145599]]), [[10, 10], [10, 10]]);
