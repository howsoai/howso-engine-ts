import { SchemaType } from "../engine";

export function isString(value: any) {
  return typeof value === "string";
}

export function isArray(value: any) {
  return Array.isArray(value);
}

export function convertType(value: SchemaType) {
  switch (value) {
    case "assoc":
      return "object";
    case "list":
      return "any[]";
    case "string":
      return "string";
    case "boolean":
      return "boolean";
    case "number":
      return "number";
    case "any":
      return "any";
    default:
      console.warn(`Unexpected type received: ${value}`);
      return "any";
  }
}
