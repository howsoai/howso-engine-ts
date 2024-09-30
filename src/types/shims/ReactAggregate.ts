export type ReactAggregateResponse = {
  [key: string]: {
    accuracy?: number | null;
    confusion_matrix?: {
      matrix?: { [key: string]: { [key: string]: number } };
      leftover_correct?: number;
      leftover_incorrect?: number;
      other_counts?: number;
    };
    feature_contributions_full?: number | null;
    feature_contributions_robust?: number | null;
    mae?: number | null;
    feature_residuals_full?: number | null;
    feature_residuals_robust?: number | null;
    feature_mda_full?: number | null;
    feature_mda_robust?: number | null;
    feature_mda_permutation_full?: number | null;
    feature_mda_permutation_robust?: number | null;
    precision?: number | null;
    r2?: number | null;
    recall?: number | null;
    missing_value_accuracy?: number | null;
    rmse?: number | null;
    spearman_coeff?: number | null;
    mcc?: number | null;
  };
};
