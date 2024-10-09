import { SchemaType } from "../engine";

/** Check if value is an Array. */
export function isArray(value: any) {
  return Array.isArray(value);
}

/**
 * Check if an enum contains at least one value of the specified type.
 *
 * This is required for properties that support both string and number values and defines an enum. When rendering the
 * enum values we check if the enum contains any values for that type and if not we render just the type itself,
 * otherwise we enumerate the valid options.
 */
export function enumMatchesType(enumeration: Array<string | number> | null, type: "number" | "string") {
  if (!Array.isArray(enumeration)) return false;
  return enumeration.some((value) => typeof value === type);
}

/** Convert Amalgam type to TypeScript type. */
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
      throw new Error(`Unexpected Amalgam type received ${JSON.stringify(schema)}`);
  }

  return this.env.filters.safe(value);
}
