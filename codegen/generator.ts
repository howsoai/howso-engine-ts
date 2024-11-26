import fs from "node:fs";
import path from "node:path";
import nunjucks from "nunjucks";
import {
  AnyOf,
  EngineApi,
  isAnyOf,
  isAnySchema,
  isRef,
  isSchema,
  isSimpleType,
  LabelDefinition,
  Ref,
  Schema,
} from "./engine";
import { registerFilters } from "./filters";
import { toPascalCase } from "./utils";

export class Generator {
  doc: EngineApi;
  env: nunjucks.Environment;
  basePath: string;
  schemaDir: string;
  clientDir: string;
  engineDir: string;
  ignoredLabels: string[];

  /**
   * Construct a new Generator.
   * @param doc The Howso Engine API document.
   */
  public constructor(doc: EngineApi) {
    this.basePath = path.resolve(__dirname, "../../src");
    this.schemaDir = path.resolve(this.basePath, "types/schemas");
    this.clientDir = path.resolve(this.basePath, "client");
    this.engineDir = path.resolve(this.basePath, "engine");
    this.doc = doc;
    this.ignoredLabels = [
      "debug_label",
      "initialize",
      "initialize_for_deployment",
      "version",
      "get_api",
      "single_react",
      "single_react_series",
      ...Object.entries(doc.labels).reduce<string[]>((ignored, [label, def]) => {
        // Ignore all the attribute and protected labels
        if (def.attribute != null || def.protected) ignored.push(label);
        return ignored;
      }, []),
    ];

    // Setup template engine
    const loader = new nunjucks.FileSystemLoader(path.join(__dirname, "templates"));
    this.env = new nunjucks.Environment(loader, { throwOnUndefined: true });
    registerFilters(this.env);
  }

  /**
   * Render all API code to file.
   */
  public render() {
    this.renderSchemas();
    this.renderClient();
  }

  /**
   * Render all client logic from the API to file.
   */
  private renderClient() {
    const targetLabels: Record<string, LabelDefinition> = {};
    for (const [label, definition] of Object.entries(this.doc.labels)) {
      if (!this.ignoredLabels.includes(label)) {
        targetLabels[label] = definition;
      }
    }
    this.renderFile(this.engineDir, "Trainee.ts", "engine/Trainee.njk", {
      labels: targetLabels,
    });
  }

  /**
   * Render all schemas from the API to file.
   */
  private renderSchemas() {
    const allNames = [];

    // Clear existing schema files
    fs.rmSync(this.schemaDir, { recursive: true, force: true });

    // Render the shared schemas
    for (const [name, schema] of Object.entries(this.doc.schemas)) {
      allNames.push(name);
      this.renderFile(this.schemaDir, `${name}.ts`, "schemas/schema.njk", {
        name,
        schema,
        imports: this.detectSchemaImports(schema),
      });
    }

    // Render label schemas
    for (const [label, definition] of Object.entries(this.doc.labels)) {
      if (this.ignoredLabels.includes(label)) continue;
      // Add schemas for label parameters and/or return value if it has any
      // For returns that are just a Ref, ignore them as they can already be referenced directly
      if (definition.parameters != null || (definition.returns && !isSimpleType(definition.returns))) {
        const title = toPascalCase(label);
        allNames.push(title);
        this.renderFile(this.schemaDir, `${title}.ts`, "schemas/label.njk", {
          name: title,
          label: label,
          description: definition.description,
          parameters: definition.parameters,
          returns: definition.returns,
          imports: this.detectLabelImports(definition),
        });
      }
    }

    // Render package index
    this.renderFile(this.schemaDir, "index.ts", "schemas/index.njk", { items: allNames.sort() });
  }

  /**
   * Render a file template.
   * @param parent The path to a directory to write the file in.
   * @param filename The name of the file to write.
   * @param template The template to render into the file.
   * @param context Context to pass to template renderer.
   */
  private renderFile(parent: string, filename: string, template: string, context: object) {
    const output = this.env.render(template, { version: this.doc.version, ...context });
    const filepath = path.join(parent, filename);
    if (!fs.existsSync(path.dirname(filepath))) {
      fs.mkdirSync(path.dirname(filepath), { recursive: true });
    }
    fs.writeFileSync(filepath, output);
  }

  /**
   * Recursively detect referenced schemas by a label definition.
   * @param label The label definition to check.
   * @returns The list of referenced schema names.
   */
  private detectLabelImports(label: LabelDefinition) {
    const imports: string[] = [];
    if (label.parameters != null) {
      for (const schema of Object.values(label.parameters)) {
        imports.push(...this.detectSchemaImports(schema));
      }
    }
    if (isAnySchema(label.returns) && !isSimpleType(label.returns)) {
      imports.push(...this.detectSchemaImports(label.returns));
    }
    return [...new Set(imports)].sort();
  }

  /**
   * Recursively detect referenced schemas in provided schema.
   * @param schema The schema to check.
   * @returns The list of referenced schema names.
   */
  private detectSchemaImports(schema: AnyOf | Ref | Schema): string[] {
    const imports: string[] = [];
    if (isRef(schema)) {
      imports.push(schema.ref);
    } else if (isAnyOf(schema)) {
      // Check all parts of the any of list
      for (const item of schema.any_of) {
        if (isAnySchema(item)) {
          imports.push(...this.detectSchemaImports(item));
        }
      }
    } else if (isSchema(schema)) {
      // Check nested parts of the schema
      if (isAnySchema(schema.values)) {
        imports.push(...this.detectSchemaImports(schema.values));
      }
      if (isAnySchema(schema.additional_indices)) {
        imports.push(...this.detectSchemaImports(schema.additional_indices));
      }
      if (schema.indices != null) {
        for (const value of Object.values(schema.indices)) {
          if (isAnySchema(value)) {
            imports.push(...this.detectSchemaImports(value));
          }
        }
      }
    }
    return [...new Set(imports)].sort();
  }
}
