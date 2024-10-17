import { initRuntime } from "@howso/amalgam-lang";
import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

export const PRIMITIVE_TYPES = ["any", "boolean", "number", "string", "null"];
export type SchemaTypeOption = "any" | "assoc" | "boolean" | "list" | "number" | "string" | "null";
export type SchemaType = SchemaTypeOption | SchemaTypeOption[];
export type TypeDefinition = SchemaType | Schema | Ref | AnyOf;

export interface BaseSchema {
  description?: string | null;
  required?: boolean;
  default?: any;
}

export interface Ref extends BaseSchema {
  ref: string;
}

export interface AnyOf extends BaseSchema {
  any_of: TypeDefinition[];
}

export interface Schema extends BaseSchema {
  type: SchemaType;
  enum?: (number | string)[];
  min?: number;
  max?: number;
  exclusive_min?: number;
  exclusive_max?: number;
  min_size?: number;
  max_size?: number;
  values?: TypeDefinition;
  min_indices?: number;
  max_indices?: number;
  indices?: Record<string, TypeDefinition>;
  dynamic_indices?: Record<string, TypeDefinition>;
  additional_indices?: TypeDefinition | false;
}

export interface LabelDefinition {
  parameters: Record<string, Exclude<TypeDefinition, SchemaType>> | null;
  returns?: TypeDefinition | null;
  description?: string | null;
  use_active_session?: boolean;
  attribute?: SchemaType | null;
  payload?: boolean;
  long_running?: boolean;
  read_only?: boolean;
  idempotent?: boolean;
  statistically_idempotent?: boolean;
}

export interface EngineApi {
  readonly labels: Record<string, LabelDefinition>;
  readonly schemas: Record<string, Exclude<TypeDefinition, SchemaType>>;
  readonly description: string;
  readonly version: string;
}

export async function getEngineApi(): Promise<EngineApi> {
  const handle = "default";
  const enginePath = require.resolve("../../src/assets/howso.caml");
  const dataPath = require.resolve("@howso/amalgam-lang/lib/amalgam-st.data");
  const wasmPath = require.resolve("@howso/amalgam-lang/lib/amalgam-st.wasm");

  const amalgam = await initRuntime(
    {},
    {
      locateFile: (path) => {
        // Override file paths to resolved locations
        if (path.endsWith("amalgam-st.data")) {
          return dataPath;
        } else if (path.endsWith("amalgam-st.wasm")) {
          return wasmPath;
        }
        return path;
      },
    },
  );

  try {
    // Load the Howso Engine into Amalgam
    const filePath = "howso.caml";
    amalgam.runtime.FS.writeFile(filePath, fs.readFileSync(enginePath));
    amalgam.loadEntity({ handle, filePath });
    console.log(`Amalgam Version: ${amalgam.getVersion()}`);

    // Initialize the Engine
    const initialized = amalgam.executeEntityJson(handle, "initialize", { trainee_id: handle });
    if (!initialized) {
      throw new Error("Failed to initialize the Howso Engine.");
    }

    // Get the api documentation from the Engine
    const response = amalgam.executeEntityJson(handle, "get_api", {});
    if (!Array.isArray(response) || response[0] != 1) {
      throw new Error("Failed to retrieve API documentation from the Howso Engine.");
    }
    const doc: EngineApi = response[1].payload;
    console.log(`Howso Engine Version: ${doc.version}`);
    return doc;
  } finally {
    amalgam.destroyEntity(handle);
  }
}

/** Check if a type is a AnyOf object. */
export function isAnyOf(value: TypeDefinition | null | undefined): value is AnyOf {
  if (value == null || Array.isArray(value) || typeof value === "string") {
    return false;
  }
  return "any_of" in value && Array.isArray(value.any_of) && value.any_of.length > 0;
}

/** Check if a type is a Ref object. */
export function isRef(value: TypeDefinition | null | undefined): value is Ref {
  if (value == null || Array.isArray(value) || typeof value === "string") {
    return false;
  }
  return "ref" in value && value.ref != null;
}

/** Check if a type is a Schema object. */
export function isSchema(value: TypeDefinition | null | undefined): value is Schema {
  if (value == null || Array.isArray(value) || typeof value === "string") {
    return false;
  }
  return !isRef(value) && "type" in value && (typeof value.type === "string" || Array.isArray(value.type));
}

/** Check if a type is a Schema, Ref, or AnyOf object. */
export function isAnySchema(value: TypeDefinition | boolean | null | undefined): value is Schema | Ref {
  if (value == null || typeof value === "boolean") return false;
  return isRef(value) || isSchema(value) || isAnyOf(value);
}

/** Check if a type is a primitive or simple array. */
export function isSimpleType(value: any) {
  if (value == null) return false;
  if (typeof value === "string") {
    return PRIMITIVE_TYPES.includes(value);
  } else if (Array.isArray(value)) {
    return value.map((v) => PRIMITIVE_TYPES.includes(v)).every(Boolean);
  } else if (isRef(value)) {
    return true;
  } else if (isSchema(value)) {
    if (value.type === "list") {
      return isSimpleType(value.values);
    }
    return isSimpleType(value.type);
  }
  return false;
}
