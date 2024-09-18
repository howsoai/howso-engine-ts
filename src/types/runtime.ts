export function exists(json: any, key: string) {
  const value = json[key];
  return value !== null && value !== undefined;
}

export class RequiredError extends Error {
  override name = "RequiredError";
  constructor(
    public field: string,
    msg?: string,
  ) {
    super(msg);
  }
}

export function mapValues(data: any, fn: (item: any) => any) {
  return Object.keys(data).reduce((acc, key) => ({ ...acc, [key]: fn(data[key]) }), {});
}
