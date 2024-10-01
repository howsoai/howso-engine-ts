import { toCamelCase, toPascalCase } from "../utils";

export function pascalCase(value: any) {
  const str = typeof value === "string" ? value : String(value);
  return toPascalCase(str);
}

export function camelCase(value: any) {
  const str = typeof value === "string" ? value : String(value);
  return toCamelCase(str);
}

export function toJson(value: any) {
  return JSON.stringify(value);
}

export function autoQuote(value: any) {
  // Quote values for safe use as object keys
  const str = typeof value === "string" ? value : String(value);
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(str)) {
    return str;
  }
  return this.env.filters.safe(JSON.stringify(str));
}
