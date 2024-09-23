/**
 * FeatureAttributes
 *
 * NOTE: This file is auto generated, do not modify manually.
 */

export type FeatureAttributes =
  | {
      auto_derive_on_train?: {
        code?: string;
        derive_type?: "custom" | "start" | "end" | "progress";
        ordered_by_features?: string[];
        series_id_features?: string[];
      };
      bounds?: {
        allowed?: any[];
        allow_null?: boolean;
        constraint?: string;
        max?: number | string;
        min?: number | string;
      };
      cycle_length?: number;
      data_type?: string;
      date_time_format?: string;
      decimal_places?: number;
      dependent_features?: string[];
      derived_feature_code?: string;
      id_feature?: boolean;
      locale?: string;
      non_sensitive?: boolean;
      null_is_dependent?: boolean;
      observational_error?: number;
      original_format?: any;
      original_type?: any;
      post_process?: string;
      significant_digits?: number;
      subtype?: string;
      time_series?: {
        delta_max?: number[];
        delta_min?: number[];
        derived_orders?: number;
        lags?: number[];
        num_lags?: number;
        order?: number;
        rate_max?: number[];
        rate_min?: number[];
        series_has_terminators?: boolean;
        stop_on_terminator?: boolean;
        time_feature?: boolean;
        type?: "rate" | "delta";
        universal?: boolean;
      };
      type?: "continuous" | "ordinal" | "nominal";
      unique?: boolean;
    }
  | Record<string, any>;
