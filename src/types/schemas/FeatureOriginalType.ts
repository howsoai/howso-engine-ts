/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 */
import type { FeatureOriginalTypeBoolean } from "./FeatureOriginalTypeBoolean";
import type { FeatureOriginalTypeDate } from "./FeatureOriginalTypeDate";
import type { FeatureOriginalTypeDatetime } from "./FeatureOriginalTypeDatetime";
import type { FeatureOriginalTypeInteger } from "./FeatureOriginalTypeInteger";
import type { FeatureOriginalTypeNumeric } from "./FeatureOriginalTypeNumeric";
import type { FeatureOriginalTypeObject } from "./FeatureOriginalTypeObject";
import type { FeatureOriginalTypeString } from "./FeatureOriginalTypeString";
import type { FeatureOriginalTypeTime } from "./FeatureOriginalTypeTime";
import type { FeatureOriginalTypeTimedelta } from "./FeatureOriginalTypeTimedelta";

/**
 * Original data type details. Used by clients to determine how to serialize and deserialize feature data.
 */
export type FeatureOriginalType =
  | FeatureOriginalTypeBoolean
  | FeatureOriginalTypeDate
  | FeatureOriginalTypeDatetime
  | FeatureOriginalTypeInteger
  | FeatureOriginalTypeNumeric
  | FeatureOriginalTypeString
  | FeatureOriginalTypeTime
  | FeatureOriginalTypeTimedelta
  | FeatureOriginalTypeObject;
