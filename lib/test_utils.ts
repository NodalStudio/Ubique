/**
 * Custom formatter for arrays and matrices to ensure consistent spacing in test output
 */
export function formatArray(arr: any[]): string {
  if (!Array.isArray(arr)) return String(arr);

  // Handle nested arrays (matrices)
  if (Array.isArray(arr[0])) {
    return `[${arr.map(row => formatArray(row)).join(', ')}]`;
  }

  // Handle flat arrays
  return `[${arr.map(String).join(', ')}]`;
}

/**
 * Custom assertion function that uses the formatter
 */
export function assertArrayEqual(actual: any[], expected: any[]) {
  const actualStr = formatArray(actual);
  const expectedStr = formatArray(expected);

  if (actualStr !== expectedStr) {
    throw new Error(`Expected ${expectedStr} but got ${actualStr}`);
  }
}
