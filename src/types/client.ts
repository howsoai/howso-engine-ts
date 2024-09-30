export interface ClientResponse<R = unknown> {
  payload: R;
  warnings: string[];
}
