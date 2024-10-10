/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * TypeSchema
 */

/**
 * A description of a type that the values of the described value should conform to.
 */
export type TypeSchema =
  | {
      /**
       * The expected type of values pointed to by any unnamed indices when the structure is an (assoc).
       */
      additional_indices?: TypeSchema | boolean;
      anyOf?: TypeSchema[];
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
        | "FeatureOriginalTypeNumeric"
        | "FeatureOriginalTypeString"
        | "Condition"
        | "FeatureOriginalTypeDate"
        | "OutlyingFeatureValuesIndex"
        | "TypeSchema"
        | "DerivationParameters"
        | "FeatureOriginalTypeTime"
        | "HyperparameterMapTree"
        | "SimilarCaseIndex"
        | "SeriesReaction"
        | "FeatureDataType"
        | "EditHistory"
        | "BuiltInFeatures"
        | "FeatureMetricIndex"
        | "FullCaseContribution"
        | "GenerateNewCases"
        | "PredictionStat"
        | "Cases"
        | "Reaction"
        | "ReactionPredictionStats"
        | "NewCaseThreshold"
        | "FeatureOriginalTypeObject"
        | "AblationThresholdMap"
        | "CaseIndices"
        | "FeatureOriginalType"
        | "Case"
        | "CaseMDA"
        | "ReactDetails"
        | "Precision"
        | "FeatureOriginalTypeBoolean"
        | "CategoricalActionProbabilities"
        | "EditHistoryRecord"
        | "RobustCaseContribution"
        | "ReactAggregateDetails"
        | "FeatureAttributes"
        | "FeatureOriginalTypeInteger"
        | "DesiredConviction"
        | "UseCaseWeights"
        | "FeatureOriginalTypeDatetime"
        | "ConfusionMatrix"
        | "FeatureAttributesIndex"
        | "FeatureOriginalTypeTimedelta"
        | "FeatureType"
        | "HyperparameterMap"
        | "DistanceRatioParts"
        | "FeatureBounds";
      /**
       * Flag indicating if the value is required to be specified as not (null).
       */
      required?: boolean;
      /**
       * The type of data. The string name of the type or a list of possible types.
       */
      type?:
        | "string"
        | "list"
        | "assoc"
        | "number"
        | "null"
        | "boolean"
        | "any"
        | ("string" | "list" | "assoc" | "number" | "null" | "boolean" | "any")[];
      /**
       * The expected type of the structure's values when the structure is a (list).
       */
      values?: TypeSchema;
    }
  | "string"
  | "list"
  | "assoc"
  | "number"
  | "null"
  | "boolean"
  | "any"
  | ("string" | "list" | "assoc" | "number" | "null" | "boolean" | "any")[];
