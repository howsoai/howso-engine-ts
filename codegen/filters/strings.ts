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
