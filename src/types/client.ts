export type ClientResponse<R = unknown> = {
  payload: R;
  warnings: string[];
};
