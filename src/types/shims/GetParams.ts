import { FullHyperparameterMap, HyperparameterMap } from "../schemas";

export type GetParamsResponse = {
  default_hyperparameter_map?: FullHyperparameterMap;
  hyperparameter_map?: HyperparameterMap;
  auto_analyze_enabled?: boolean;
  auto_analyze_limit_size?: number;
  analyze_growth_factor?: number;
  analyze_threshold?: number;
};
