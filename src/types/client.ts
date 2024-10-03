export type ClientResponse<R = unknown> = {
  payload: R;
  warnings: string[];
};

export type ClientBatchResponse<R = unknown> = {
  payload: R;
  warnings: string[][];
};
