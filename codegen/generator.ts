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
  clientDir: string;
  ignoredLabels: string[];
  responseShims: Record<string, string>;

  /**
   * Construct a new Generator.
   * @param doc The Howso Engine API document.
   */
  public constructor(doc: EngineApi) {
    this.basePath = path.resolve(__dirname, "../../src");
    this.schemaDir = path.resolve(this.basePath, "types/schemas");
    this.clientDir = path.resolve(this.basePath, "client");
    this.doc = doc;
    this.ignoredLabels = [
      "root_filepath",
      "filename",
      "filepath",
      "debug_label",
      "initialize",
      "initialize_for_deployment",
      "set_contained_trainee_maps",
      "major_version",
      "minor_version",
      "point_version",
      "version",
      "get_api",
    ];

    // Temporary shims until return values are defined
    this.responseShims = {
      analyze: "null",
      get_cases: "shims.GetCasesResponse",
      get_feature_attributes: "schemas.FeatureAttributesIndex",
      set_feature_attributes: "schemas.FeatureAttributesIndex",
      get_marginal_stats: "shims.GetMarginalStatsResponse",
      get_params: "shims.GetParamsResponse",
      react: "shims.ReactResponse",
      react_aggregate: "shims.ReactAggregateResponse",
      react_into_features: "null",
      train: "shims.TrainResponse",
    };

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
      if (!this.ignoredLabels.includes(label) || definition.attribute) {
        targetLabels[label] = definition;
      }
    }
    this.renderFile(this.clientDir, "AbstractTraineeClient.ts", "client/AbstractTraineeClient.njk", {
      labels: targetLabels,
      shims: this.responseShims,
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
      if (this.ignoredLabels.includes(label) || definition.attribute) continue;
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
    if (isSchemaOrRef(label.returns)) {
      imports.push(...this.detectSchemaImports(label.returns));
    }
    return [...new Set(imports)].sort();
  }

  /**
   * Recursively detect referenced schemas in provided schema.
   * @param schema The schema to check.
   * @returns The list of referenced schema names.
   */
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
    return [...new Set(imports)].sort();
  }
}
