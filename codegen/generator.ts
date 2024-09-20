import fs from "node:fs";
import path from "node:path";
import nunjucks from "nunjucks";
import { EngineApi, isSchemaOrRef } from "./engine";
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

  public getLabelParametersName(label: string) {
    return `${toPascalCase(label)}_Request`;
  }

  public getLabelReturnsName(label: string) {
    return `${toPascalCase(label)}_Response`;
  }

  private renderSchemas() {
    const allNames = [];

    // Clear existing schema files
    fs.rmSync(this.schemaDir, { recursive: true, force: true });

    // Render the shared schemas
    for (const [name, schema] of Object.entries(this.doc.schemas)) {
      allNames.push(name);
      this.renderFile(this.schemaDir, `${name}.ts`, "schemas/schema.njk", { name, schemas: { name: schema } });
    }

    // Render label schemas
    for (const [label, definition] of Object.entries(this.doc.labels)) {
      // Render parameters
      if (definition.parameters != null) {
        const name = this.getLabelParametersName(label);
        allNames.push(name);
        this.renderFile(this.schemaDir, `${name}.ts`, "schemas/schema.njk", {
          name,
          description: definition.description,
          schemas: definition.parameters,
        });
      }
      // Render returns
      if (isSchemaOrRef(definition.returns)) {
        const name = this.getLabelReturnsName(label);
        allNames.push(name);
        this.renderFile(this.schemaDir, `${name}.ts`, "schemas/schema.njk", {
          name,
          description: definition.description,
          schemas: definition.returns,
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
}
