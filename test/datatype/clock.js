import assert from 'assert';
import clock from '../../lib/datatype/clock.js';

// Example: Get the current date and time as a array
const currentTime = clock();

// The result should be an array
assert(Array.isArray(currentTime));

// The array should have 7 elements
assert(currentTime.length === 7);
