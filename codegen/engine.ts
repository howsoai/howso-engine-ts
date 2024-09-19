import { initRuntime } from "@howso/amalgam-lang";
import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

export type SchemaTypeOption = "any" | "assoc" | "boolean" | "list" | "number" | "string";
export type SchemaType = SchemaTypeOption | SchemaTypeOption[];

export interface BaseSchema {
  description?: string;
  optional?: boolean;
  default?: any;
}

export interface RefSchema extends BaseSchema {
  ref: string;
}

export interface Schema extends BaseSchema {
  type: SchemaType;
  enum?: (number | string)[];
  min?: number;
  max?: number;
  min_length?: number;
  max_length?: number;
  values?: SchemaType | Schema | RefSchema;
  indices?: SchemaType | Record<string, SchemaType | Schema | RefSchema>;
  additional_indices?: SchemaType | Schema | RefSchema;
}

export interface LabelDefinition {
  parameters: Record<string, Schema | RefSchema> | null;
  returns?: Schema | RefSchema | null;
  description?: string | null;
  long_running?: boolean;
  read_only?: boolean;
  idempotent?: boolean;
  statistically_idempotent?: boolean;
}

export interface EngineApi {
  readonly labels: Record<string, LabelDefinition>;
  readonly schemas: Record<string, Schema>;
  readonly description: string;
}

export async function getEngineApi(): Promise<EngineApi> {
  const handle = "default";
  const enginePath = require.resolve("../../src/engine/howso.caml");
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
    return response[1].payload;
  } finally {
    amalgam.destroyEntity(handle);
  }
}
