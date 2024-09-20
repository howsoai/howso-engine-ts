import fs from "node:fs";
import path from "node:path";
import nunjucks from "nunjucks";
import { EngineApi, isRef, isSchemaOrRef, LabelDefinition, Ref, Schema } from "./engine";
import { registerFilters } from "./filters";
import { toPascalCase } from "./utils";

export class Generator {
  doc: EngineApi;
  env: nunjucks.Environment;
  basePath: string;
  schemaDir: string;

  public constructor(doc: EngineApi) {
    this.basePath = path.resolve(__dirname, "../../src");
    this.schemaDir = path.resolve(this.basePath, "types/schemas");
    this.doc = doc;

    // Setup template engine
    const loader = new nunjucks.FileSystemLoader(path.join(__dirname, "templates"));
    this.env = new nunjucks.Environment(loader, { throwOnUndefined: true });
    registerFilters(this.env);
  }

  public render() {
    this.renderSchemas();
    this.renderClient();
  }

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
      // Add schemas for label parameters and/or return value if it has any
      if (definition.parameters != null || definition.returns != null) {
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
    this.renderFile(this.schemaDir, "index.ts", "schemas/index.njk", { items: allNames });
  }

  private renderFile(parent: string, target: string, template: string, context: object) {
    const output = this.env.render(template, context);
    const filepath = path.join(parent, target);
    if (!fs.existsSync(path.dirname(filepath))) {
      fs.mkdirSync(path.dirname(filepath), { recursive: true });
    }
    fs.writeFileSync(filepath, output);
  }

  private renderClient() {
    return true;
  }

  private detectLabelImports(label: LabelDefinition) {
    const imports: string[] = [];
    if (label.parameters != null) {
      for (const schema of Object.values(label.parameters)) {
        imports.push(...this.detectSchemaImports(schema));
      }
    }
    if (isSchemaOrRef(label.returns)) {
      imports.push(...this.detectSchemaImports(label.returns));
    }
    return imports;
  }

  private detectSchemaImports(schema: Ref | Schema): string[] {
    const imports: string[] = [];
    if (isRef(schema)) {
      return [schema.ref];
    }
    if (isSchemaOrRef(schema.values)) {
      imports.push(...this.detectSchemaImports(schema.values));
    }
    if (isSchemaOrRef(schema.additional_indices)) {
      imports.push(...this.detectSchemaImports(schema.additional_indices));
    }
    if (schema.indices != null) {
      for (const value of Object.values(schema.indices)) {
        if (isSchemaOrRef(value)) {
          imports.push(...this.detectSchemaImports(value));
        }
      }
    }
    return imports;
  }
}
