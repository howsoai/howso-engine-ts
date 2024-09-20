import { Ref, Schema, isRef, isSchemaOrRef } from "../engine";

/**
 * Detect schema imports filter.
 *
 * This filter will recursively process schemas to detect required imports.
 */
export function schemaImports(schemas: Record<string, Ref | Schema>) {
  const imports: string[] = [];

  function introspect(schema: Ref | Schema) {
    if (isRef(schema)) {
      imports.push(schema.ref);
      return;
    }
    if (isSchemaOrRef(schema.values)) {
      introspect(schema.values);
    }
    if (isSchemaOrRef(schema.additional_indices)) {
      introspect(schema.additional_indices);
    }
    if (schema.indices != null) {
      for (const value of Object.values(schema.indices)) {
        if (isSchemaOrRef(value)) {
          introspect(value);
        }
      }
    }
  }

  for (const [, schema] of Object.entries(schemas)) {
    introspect(schema);
  }
  return imports;
}
