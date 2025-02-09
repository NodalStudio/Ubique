import assert from 'assert';
import kurtosis from '../../lib/stats/kurtosis.js';

// Example dataset
const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];

// Example 1: Compute kurtosis of an array
assert.strictEqual(kurtosis(x), 3.037581);

// Example 2: Compute kurtosis with bias correction
assert.strictEqual(kurtosis(x, 0), 2.9453);

// Example 3: Compute kurtosis for a matrix along rows
assert.deepStrictEqual(kurtosis([[...x], [...y]]), [[3.037581], [1.397642]]);

// Example 4: Compute kurtosis for a matrix along columns
assert.deepStrictEqual(kurtosis([[0.003, 0.026], [0.015, -0.009]], 1, 1), [[2.78], [1.85]]);

// Example 5: Compute kurtosis for a dataset with equal elements (should be NaN)
assert.strictEqual(kurtosis([1, 1, 1, 1, 1]), NaN);
