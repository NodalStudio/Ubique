import assert from 'assert';
import sharpe from '../../lib/quants/sharpe.js';

// Example 1: Sharpe Ratio for a single asset
const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
assert.strictEqual(sharpe(x, 0.02 / 12), 0.698794);

// Example 2: Sharpe Ratio for multiple assets
const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
assert.deepStrictEqual(sharpe([x, y]), [[0.770539], [0.23858]]);

// Example 3: Throws error for invalid input
assert.throws(() => sharpe(123), /Input must be an array or matrix/);
assert.throws(() => sharpe('invalid'), /Input must be an array or matrix/);
