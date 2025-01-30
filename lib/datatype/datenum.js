import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import arraySupport from 'dayjs/plugin/arraySupport.js';

dayjs.extend(utc);
dayjs.extend(arraySupport)

/** @import { array, matrix } from '../types.ts' */

/**
 * @function datenum
 * @summary Convert date and time to a serial date number (Unix)
 * @description Converts a given date and time to a Unix timestamp (serial date number). The function supports both date strings with a format and numeric arrays representing components of date and time.
 *
 * @param {string | array<string | number> | matrix} d The date input, which can be a single value or an array of date components.
 * @param {string} [fmt] The format string to parse the date if the input is a date string.
 * @returns {number | array} The Unix timestamp or an array of Unix timestamps.
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
export function datenum(d, fmt) {
  if (!d) {
    throw new Error('Not enough input arguments');
  }

  const parseDateToUnix = (input, format) => {
    if (typeof input === 'string') {
      if (!format) {
        throw new Error('Insert format for date string');
      }
      return dayjs.utc(input, format).unix();
    } else if (Array.isArray(input) && input.every(el => typeof el === 'number')) {
      // Treat the input as date components: [year, month, day, hour, minute, second, millisecond]
      const [year, month = 1, day = 1, hour = 0, minute = 0, second = 0, millisecond = 0] = input;
      return dayjs.utc([year, month - 1, day, hour, minute, second, millisecond]).unix();
    } else if (Array.isArray(input) && input.every(el => Array.isArray(el))) {
      // Handle array of arrays (each array being date components)
      return input.map(comp => parseDateToUnix(comp));
    }
    throw new Error('Invalid input type');
  };

  if (Array.isArray(d) && d.every(el => typeof el === 'string')) {
    return d.map(item => parseDateToUnix(item, fmt));
  }

  return parseDateToUnix(d, fmt);
}
