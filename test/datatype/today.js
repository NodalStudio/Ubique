import assert from 'assert';
import today from '../../lib/datatype/today.js';
import dayjs from 'dayjs';

// Example 1: Get the Unix timestamp for today's date
const todayTimestamp = today();
assert.strictEqual(typeof todayTimestamp, 'number');
assert.strictEqual(todayTimestamp, dayjs().startOf('day').unix());
