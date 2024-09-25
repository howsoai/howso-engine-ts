/**
 * Get the precision of a number.
 * @param x The number.
 * @returns The number's precision.
 */
export function precision(x: number): number {
  if (x == null || !isFinite(x)) return 0;
  let e = 1;
  let p = 0;
  while (Math.round(x * e) / e !== x) {
    e *= 10;
    p++;
  }
  return p;
}

/**
 * Guess loose bounds given a minimum and maximum value.
 *
 * @param minBound The min bound (inclusive).
 * @param minBound The max bound (inclusive).
 * @returns Tuple of loose min and max bounds.
 */
export function guessLooseBounds(minBound: number, maxBound: number): [minBound: number, maxBound: number] {
  if (minBound > maxBound) {
    throw new Error("minBound cannot be larger than maxBound");
  }

  if (minBound < 0) {
    minBound = -Math.exp(Math.ceil(Math.log(-minBound)));
  } else if (minBound > 0) {
    minBound = Math.exp(Math.floor(Math.log(minBound)));
  }

  if (maxBound < 0) {
    maxBound = -Math.exp(Math.floor(Math.log(-maxBound)));
  } else if (maxBound > 0) {
    maxBound = Math.exp(Math.ceil(Math.log(maxBound)));
  }

  return [minBound, maxBound];
}

/**
 * Checks if value is null like.
 * Values treated as null include: undefined | null | NaN | Invalid Date
 * @param value The value to check.
 * @returns True if value is null like.
 */
export function isNull(value: any): boolean {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return true;
  }
  if (value instanceof Date && isNaN(value as unknown as number)) {
    // Not a Time
    return true;
  }
  return false;
}

/**
 * Get the mode(s) of an array.
 * @param values The values to get the mode of.
 * @returns A tuple of all the mode values and the number of their occurrences in the the array.
 */
export function allModes<T = any>(values: T[]): [T[], number] {
  let mode = 0;

  // Count all occurrences of each value in array
  const occurrences = values.reduce<Map<T, number>>((acc, value) => {
    let count = acc.get(value);
    if (count != null) {
      acc.set(value, ++count);
    } else {
      count = 1;
      acc.set(value, 1);
    }
    mode = Math.max(count, mode);
    return acc;
  }, new Map());

  const modeValues: T[] = [];
  occurrences.forEach((count, key) => {
    if (count === mode) {
      modeValues.push(key);
    }
  });

  return [modeValues, mode];
}

/** Attempts to get a Date object from a string or Date */
export const coerceDate = (value: string | Date | null | undefined): Date | undefined => {
  if (!value || isNull(value)) {
    return undefined;
  }

  if (value instanceof Date) {
    return value;
  }

  const dateParsed =
    // "1", "2" etc as strings count as dates to Date.parse, we'll need a minimum standard to avoid that.
    value.match(/^[\d]{4}-[\d]{2}-[\d]{2}/) ? Date.parse(value) : 0;
  if (dateParsed === 0) {
    return undefined;
  }

  return new Date(dateParsed);
};
