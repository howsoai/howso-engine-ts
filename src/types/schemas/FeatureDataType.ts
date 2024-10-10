/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * FeatureDataType
 */

/**
 * Specify the data type for features with a type of nominal or continuous. Default is `string` for nominals and `number` for continuous.
 *
 * Valid values include:
 * - `string`, `number`, `formatted_date_time`, `json`, `amalgam`, `yaml`: Valid for both nominal and continuous.
 * - `string_mixable`: Valid only when type is continuous (predicted values may result in interpolated strings   containing a combination of characters from multiple original values).
 * - `boolean`: Valid only for nominals.
 */
export type FeatureDataType =
  | "string"
  | "number"
  | "boolean"
  | "formatted_date_time"
  | "string_mixable"
  | "json"
  | "yaml"
  | "amalgam";
