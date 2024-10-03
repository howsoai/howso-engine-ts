export interface OriginalTypeBoolean {
  /**
   * The name of the data type.
   */
  data_type: "boolean";
}

export interface OriginalTypeDatetime {
  /**
   * The name of the data type.
   */
  data_type: "datetime";
  /**
   * The standardized timezone name.
   */
  timezone?: string | null;
}

export interface OriginalTypeDate {
  /**
   * The name of the data type.
   */
  data_type: "date";
}

export interface OriginalTypeInteger {
  /**
   * The name of the data type.
   */
  data_type: "integer";
  /**
   * The size of the integer (in bytes).
   */
  size?: number;
  /**
   * If the integer is unsigned.
   */
  unsigned?: boolean;
}

export interface OriginalTypeNumeric {
  /**
   * The name of the data type.
   */
  data_type: "numeric";
  /**
   * The format of the number.
   */
  format?: "decimal";
  /**
   * The size of the number (in bytes).
   */
  size?: number;
}

export interface OriginalTypeObject {
  /**
   * The name of the data type.
   */
  data_type: "object";
}

export interface OriginalTypeString {
  /**
   * The name of the data type.
   */
  data_type: "string";
  /**
   * The maximum allowed length of the string.
   */
  length?: number | null;
  /**
   * The string encoding type.
   */
  encoding?: string | null;
}

export interface OriginalTypeTime {
  /**
   * The name of the data type.
   */
  data_type: "time";
  /**
   * The standardized timezone name.
   */
  timezone?: string | null;
}

export interface OriginalTypeTimedelta {
  /**
   * The name of the data type.
   */
  data_type: "timedelta";
  /**
   * The unit of the time delta.
   */
  unit?: "days" | "seconds" | "nanoseconds";
}

/**
 * Original data type details. Used by clients to determine how to serialize and deserialize feature data.
 */
export type FeatureOriginalType =
  | OriginalTypeBoolean
  | OriginalTypeDate
  | OriginalTypeDatetime
  | OriginalTypeInteger
  | OriginalTypeNumeric
  | OriginalTypeObject
  | OriginalTypeString
  | OriginalTypeTime
  | OriginalTypeTimedelta;
