import assert from 'assert';
import { now } from '../../lib/datatype/now.js';

// Example: Get the current Unix timestamp
const currentTimestamp = now();
assert.strictEqual(typeof currentTimestamp, 'number');
assert.ok(currentTimestamp > 0); // Ensure it's a positive number
