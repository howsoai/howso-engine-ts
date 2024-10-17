/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * TypeDefinition
 */
import type { TypeSchema } from "./TypeSchema";
import type { TypeString } from "./TypeString";

/**
 * A description of a type that the values of the described value should conform to.
 */
export type TypeDefinition = {
  /**
   * The expected type of values pointed to by any unnamed indices when the structure is an (assoc).
   */
  additional_indices?: TypeSchema | boolean;
  any_of?: TypeSchema[];
  /**
   * The default value. Only used when describing a parameter.
   */
  default?: any;
  /**
   * A description of the type and the meaning of the value.
   */
  description?: string;
  /**
   * A map of patterned keys to their expected types.
   */
  dynamic_indices?: Record<string, any>;
  /**
   * A list of possible values when the type is a string.
   */
  enum?: string[];
  /**
   * The exclusive maximum value when the type is a number.
   */
  exclusive_max?: number;
  /**
   * The exclusive minimum value when the type is a number.
   */
  exclusive_min?: number;
  /**
   * A map of named indices to the types expected of their values when the structure is an (assoc).
   */
  indices?: Record<string, TypeSchema>;
  /**
   * The inclusive maximum value when the type is a number.
   */
  max?: number;
  /**
   * The inclusive maximum number of indices when the type is a (assoc).
   */
  max_indices?: number;
  /**
   * The exclusive maximum value when the type is a (list).
   */
  max_size?: number;
  /**
   * The inclusive minimum value when the type is a number.
   */
  min?: number;
  /**
   * The inclusive minimum number of indices when the type is a (assoc).
   */
  min_indices?: number;
  /**
   * The inclusive minimum size when the type is a (list).
   */
  min_size?: number;
  /**
   * A reference to a named schema to use the type definition there.
   */
  ref?:
    | "AblationThresholdMap"
    | "BuiltInFeatures"
    | "Case"
    | "CaseIndices"
    | "CaseMDA"
    | "Cases"
    | "CategoricalActionProbabilities"
    | "Condition"
    | "ConfusionMatrix"
    | "DerivationParameters"
    | "DesiredConviction"
    | "DistanceRatioParts"
    | "EditHistory"
    | "EditHistoryRecord"
    | "FeatureAttributes"
    | "FeatureAttributesIndex"
    | "FeatureBounds"
    | "FeatureDataType"
    | "FeatureMetricIndex"
    | "FeatureOriginalType"
    | "FeatureOriginalTypeBoolean"
    | "FeatureOriginalTypeDate"
    | "FeatureOriginalTypeDatetime"
    | "FeatureOriginalTypeInteger"
    | "FeatureOriginalTypeNumeric"
    | "FeatureOriginalTypeObject"
    | "FeatureOriginalTypeString"
    | "FeatureOriginalTypeTime"
    | "FeatureOriginalTypeTimedelta"
    | "FeatureType"
    | "FullCaseContribution"
    | "GenerateNewCases"
    | "HyperparameterMap"
    | "HyperparameterMapTree"
    | "NewCaseThreshold"
    | "OutlyingFeatureValuesIndex"
    | "Precision"
    | "PredictionStat"
    | "ReactAggregateDetails"
    | "ReactDetails"
    | "ReactionPredictionStats"
    | "RobustCaseContribution"
    | "SimilarCaseIndex"
    | "TypeDefinition"
    | "TypeSchema"
    | "TypeString"
    | "UseCaseWeights";
  /**
   * Flag indicating if the value is required to be specified as not (null).
   */
  required?: boolean;
  /**
   * The type of data. The string name of the type or a list of possible types.
   */
  type?: TypeString | TypeString[];
  /**
   * The expected type of the structure's values when the structure is a (list).
   */
  values?: TypeSchema;
};
