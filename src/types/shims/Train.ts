export type TrainResponse = {
  ablated_indices?: number[];
  num_trained: number;
  status?: "analyze" | "analyzed" | null;
};

export type BatchTrainResponse = TrainResponse & {
  warnings: string[][];
};
