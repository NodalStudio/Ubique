/**
 * @function today
 * @summary Gets the current date as a Unix timestamp.
 * @description Returns the Unix timestamp for the start of the current day (00:00:00).
 *
 * @returns The Unix timestamp for the current date.
 *
 * @example
 * // Example 1: Get the Unix timestamp for today's date
 * const todayTimestamp = today();
 * assert.strictEqual(typeof todayTimestamp, 'number');
 * assert.strictEqual(todayTimestamp, dayjs().startOf('day').unix());
 */
export function today(): number;
