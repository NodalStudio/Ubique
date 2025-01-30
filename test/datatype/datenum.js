import assert from 'assert';
import { datenum } from '../../lib/datatype/datenum.js';

// Example 1: Convert a date string to a Unix timestamp
assert.strictEqual(datenum('31-12-2014', 'DD-MM-YYYY'), 1419984000);

// Example 2: Convert a vector of date strings to a vector of Unix timestamps
assert.deepStrictEqual(datenum(['31-12-2014', '31-01-2015'], 'DD-MM-YYYY'), [1419984000, 1422662400]);

// Example 3: Convert a vector of date components to a Unix timestamp
assert.strictEqual(datenum([2015, 4, 5, 12, 20, 30, 0]), 1428236430);

// Example 4: Convert a vector of vectors of date strings to a vector of Unix timestamps
assert.deepStrictEqual(datenum(['31-12-2014', '31-01-2015'], 'DD-MM-YYYY'), [1419984000, 1422662400]);

// Example 4: Convert an array of arrays of date components to an array of Unix timestamps
assert.deepStrictEqual(datenum([[2013, 1, 31, 0, 0, 0, 0], [2014, 2, 28, 0, 0, 0, 0], [2015, 4, 30, 0, 0, 0, 0]]), [1359590400, 1393545600, 1430352000]);
