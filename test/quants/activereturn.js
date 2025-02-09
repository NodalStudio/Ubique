import assert from 'assert';
import activereturn from '../../lib/quants/activereturn.js';

// Example 1: Compute active return for a single portfolio and benchmark
const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
assert.strictEqual(activereturn(x, y, 12), 0.0887245684020539);

// Example 2: Compute active return for multiple portfolios against a benchmark
const z = [0.04, -0.022, 0.043, 0.028, -0.078, -0.011, 0.033, -0.049, 0.09, 0.087];
assert.deepStrictEqual(activereturn([x, y], z, 12), [[0.041978811047168385], [-0.04674575735488551]]);

// Example 3: Default parameters (annual frequency of 252)
assert.strictEqual(activereturn(x, y), activereturn(x, y, 252, 'geometric', 0));

// Example 4: Simple mode active return calculation
assert.strictEqual(activereturn(x, y, 12, 'simple'), activereturn(x, y, 12, 'simple'));

// Example 5: Active return with different frequency
assert.strictEqual(activereturn(x, y, 52), activereturn(x, y, 52, 'geometric', 0));

// Example 6: Throws error for invalid input
assert.throws(() => activereturn(123, y, 12), /Input must be an array or matrix/);
assert.throws(() => activereturn(x, 'invalid', 12), /Input must be an array or matrix/);
