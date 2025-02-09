import { matrix, array } from '../types';

/**
 * @function datenum
 * @summary Convert date and time to a serial date number (Unix)
 * @description Converts a given date and time to a Unix timestamp (serial date number). The function supports both date strings with a format and numeric arrays representing components of date and time.
 *
 * @param d The date input, which can be a single value or a array of date components.
 * @param fmt The format string to parse the date if the input is a date string.
 * @returns The Unix timestamp or a array of Unix timestamps.
 *
 * @example
 * // Example 1: Convert a date string to a Unix timestamp
 * assert.strictEqual(datenum('31-12-2014', 'DD-MM-YYYY'), 1419984000);
 *
 * // Example 2: Convert an array of date strings to an array of Unix timestamps
 * assert.deepStrictEqual(datenum(['31-12-2014', '31-01-2015'], 'DD-MM-YYYY'), [1419984000, 1422662400]);
 *
 * // Example 3: Convert an array of date components to a Unix timestamp
 * assert.strictEqual(datenum([2015, 4, 5, 12, 20, 30, 0]), 1428236430);
 *
 * // Example 4: Convert an array of arrays of date components to an array of Unix timestamps
 * assert.deepStrictEqual(datenum([[2013, 1, 31, 0, 0, 0, 0], [2014, 2, 28, 0, 0, 0, 0], [2015, 4, 30, 0, 0, 0, 0]]), [1359590400, 1393545600, 1430352000]);
 */
export function datenum(d: string | array<number | string> | matrix, fmt?: string): number | array;
