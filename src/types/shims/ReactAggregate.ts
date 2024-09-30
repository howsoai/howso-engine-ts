import type { SelectedPredictionStats } from "../schemas";

export type ReactAggregateResponseDetails = Record<keyof SelectedPredictionStats, number | null> & {};
export type ReactAggregateResponse = {
  [key: string]: ReactAggregateResponseDetails;
};
