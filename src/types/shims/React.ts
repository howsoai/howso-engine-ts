export type ReactResponse = {
  boundary_cases?: any[][];
  categorical_action_probabilities?: Array<{ [key: string]: any }>;
  derivation_parameters?: Array<{
    k?: number;
    p?: number;
    distance_transform?: number;
    feature_weights?: { [key: string]: number };
    feature_deviations?: { [key: string]: number };
    nominal_class_counts?: { [key: string]: number };
    use_irw?: boolean;
  }>;
  feature_residuals_full?: Array<{ [key: string]: any }>;
  feature_residuals_robust?: Array<{ [key: string]: any }>;
  prediction_stats?: Array<{ [key: string]: any }>;
  outlying_feature_values?: Array<{
    [key: string]: {
      input_case_value?: number;
      local_max?: number;
    };
  }>;
  influential_cases?: any[][];
  most_similar_cases?: any[][];
  observational_errors?: Array<{ [key: string]: number }>;
  feature_mda_full?: Array<{ [key: string]: number }>;
  feature_mda_robust?: Array<{ [key: string]: number }>;
  feature_mda_ex_post_full?: Array<{ [key: string]: number }>;
  feature_mda_ex_post_robust?: Array<{ [key: string]: number }>;
  directional_feature_contributions_full?: Array<{ [key: string]: number }>;
  directional_feature_contributions_robust?: Array<{ [key: string]: number }>;
  feature_contributions_full?: Array<{ [key: string]: number }>;
  feature_contributions_robust?: Array<{ [key: string]: number }>;
  case_directional_feature_contributions_full?: Array<{ [key: string]: number }>;
  case_directional_feature_contributions_robust?: Array<{ [key: string]: number }>;
  case_feature_contributions_full?: Array<{ [key: string]: number }>;
  case_feature_contributions_robust?: Array<{ [key: string]: number }>;
  case_mda_full?: Array<Array<{ [key: string]: any }>>;
  case_mda_robust?: Array<Array<{ [key: string]: any }>>;
  case_contributions_full?: Array<Array<{ [key: string]: any }>>;
  case_contributions_robust?: Array<Array<{ [key: string]: any }>>;
  case_feature_residuals_full?: Array<{ [key: string]: number }>;
  case_feature_residuals_robust?: Array<{ [key: string]: number }>;
  case_feature_residual_convictions_full?: Array<{ [key: string]: number }>;
  case_feature_residual_convictions_robust?: Array<{ [key: string]: number }>;
  hypothetical_values?: Array<{ [key: string]: any }>;
  distance_ratio?: Array<number>;
  distance_ratio_parts?: Array<{
    local_distance_contribution?: number | null;
    nearest_distance?: number | null;
  }>;
  distance_contribution?: Array<number>;
  similarity_conviction?: Array<number>;
  most_similar_case_indices?: Array<Array<{ [key: string]: any }>>;
  generate_attempts?: Array<number>;
  series_generate_attempts?: Array<Array<number>>;
  action_features?: Array<string> | null;
  action_values?: Array<Array<any>> | null;
};
