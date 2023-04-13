/**
 * Get the precision of a number.
 * @param x The number.
 * @returns The number's precision.
 */
export declare function precision(x: number): number;
/**
 * Guess loose bounds given a minimum and maximum value.
 *
 * @param minBound The min bound (inclusive).
 * @param minBound The max bound (inclusive).
 * @returns Tuple of loose min and max bounds.
 */
export declare function guessLooseBounds(minBound: number, maxBound: number): [minBound: number, maxBound: number];
/**
 * Checks if value is null like.
 * Values treated as null include: undefined | null | NaN | Invalid Date
 * @param value The value to check.
 * @returns True if value is null like.
 */
export declare function isNull(value: any): boolean;
/**
 * Get the mode(s) of an array.
 * @param values The values to get the mode of.
 * @returns A tuple of all the mode values and the number of their occurrences in the the array.
 */
export declare function allModes<T = any>(values: T[]): [T[], number];
