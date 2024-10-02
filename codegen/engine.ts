import { initRuntime } from "@howso/amalgam-lang";
import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

export type SchemaTypeOption = "any" | "assoc" | "boolean" | "list" | "number" | "string" | "null";
export type SchemaType = SchemaTypeOption | SchemaTypeOption[];

export interface BaseSchema {
  description?: string;
  required?: boolean;
  default?: any;
}

export interface Ref extends BaseSchema {
  ref: string;
}

export interface Schema extends BaseSchema {
  type: SchemaType;
  enum?: (number | string)[];
  min?: number;
  max?: number;
  min_size?: number;
  max_size?: number;
  values?: SchemaType | Schema | Ref;
  indices?: Record<string, SchemaType | Schema | Ref>;
  dynamic_indices?: Record<string, SchemaType | Schema | Ref>;
  additional_indices?: SchemaType | Schema | Ref | false;
}

export interface LabelDefinition {
  parameters: Record<string, Schema | Ref> | null;
  returns?: SchemaType | Schema | Ref | null;
  description?: string | null;
  attribute?: boolean;
  long_running?: boolean;
  read_only?: boolean;
  idempotent?: boolean;
  statistically_idempotent?: boolean;
}

export interface EngineApi {
  readonly labels: Record<string, LabelDefinition>;
  readonly schemas: Record<string, Schema>;
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
    amalgam.runtime.FS.writeFile("howso.caml", fs.readFileSync(enginePath));
    amalgam.loadEntity(handle, "howso.caml");
    console.log(`Amalgam Version: ${amalgam.getVersion()}`);

    // Get the api documentation from the Engine
    const response = amalgam.executeEntityJson(handle, "get_api", "");
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

export function isRef(value: SchemaType | Schema | Ref | null | undefined): value is Ref {
  if (value == null || Array.isArray(value) || typeof value === "string") {
    return false;
  }
  return "ref" in value && value.ref != null;
}

export function isSchema(value: SchemaType | Schema | Ref | null | undefined): value is Schema {
  if (value == null || Array.isArray(value) || typeof value === "string") {
    return false;
  }
  return !isRef(value) && "type" in value && typeof value.type === "string";
}

export function isSchemaOrRef(value: SchemaType | Schema | Ref | boolean | null | undefined): value is Schema | Ref {
  if (typeof value === "boolean") return false;
  return isRef(value) || isSchema(value);
}
