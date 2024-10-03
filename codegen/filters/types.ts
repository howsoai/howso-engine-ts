import { SchemaType } from "../engine";

export function isString(value: any) {
  return typeof value === "string";
}

export function isArray(value: any) {
  return Array.isArray(value);
}

export function convertType(schema: SchemaType) {
  let value: string;
  switch (schema) {
    case "assoc":
      value = "Record<string, any>";
      break;
    case "list":
      value = "any[]";
      break;
    case "string":
      value = "string";
      break;
    case "boolean":
      value = "boolean";
      break;
    case "number":
      value = "number";
      break;
    case "null":
      value = "null";
      break;
    case "any":
      value = "any";
      break;
    default:
      console.warn(`Unexpected type received: ${schema}`);
      value = "any";
  }

  return this.env.filters.safe(value);
}
