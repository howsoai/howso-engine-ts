export interface BooleanType {
  /**
   * The name of the data type.
   */
  data_type: "boolean";
}

export interface DatetimeType {
  /**
   * The name of the data type.
   */
  data_type: "datetime";
  /**
   * The standardized timezone name.
   */
  timezone?: string | null;
}

export interface DateType {
  /**
   * The name of the data type.
   */
  data_type: "date";
}

export interface IntegerType {
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

export interface NumericType {
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

export interface ObjectType {
  /**
   * The name of the data type.
   */
  data_type: "object";
}

export interface StringType {
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

export interface TimeType {
  /**
   * The name of the data type.
   */
  data_type: "time";
  /**
   * The standardized timezone name.
   */
  timezone?: string | null;
}

export interface TimedeltaType {
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
  | BooleanType
  | DateType
  | DatetimeType
  | IntegerType
  | NumericType
  | ObjectType
  | StringType
  | TimeType
  | TimedeltaType;
