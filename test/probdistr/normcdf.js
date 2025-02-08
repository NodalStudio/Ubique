import assert from 'assert';
import { normcdf } from '../../lib/probdistr/normcdf.js';

// Example 1: Compute standard normal CDF at x = 2
assert.strictEqual(normcdf(2), 0.9772498701098755);

// Example 2: Compute normal CDF with custom mean and standard deviation
assert.strictEqual(normcdf(0, 1, 2), 0.30853751691860176);

// Example 3: Compute normal CDF at the mean
assert.strictEqual(normcdf(10, 10, 3), 0.5);

// Example 4: Compute normal CDF for negative values (should be close to 0.5)
assert.strictEqual(normcdf(-1.5, 0, 1), 0.06680720195906442);

// Example 5: Compute normal CDF for a very large value (should be close to 1)
assert.strictEqual(normcdf(100, 50, 10), 0.9999997133484314);

// Example 6: Compute normal CDF for a very small value (should be close to 0)
assert.strictEqual(normcdf(-100, 50, 10), 0);

// Example 7: Compute normal CDF for zero mean and unit variance at zero (should be 0.5)
assert.strictEqual(normcdf(0, 0, 1), 0.5);

// Example 8: Edge case: sigma is negative (should throw an error)
assert.throws(() => normcdf(2, 0, -1), /Standard deviation must be a positive number/);
