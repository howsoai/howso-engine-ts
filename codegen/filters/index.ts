import { Environment } from "nunjucks";
import * as engine from "../engine";
import * as comments from "./comments";
import * as strings from "./strings";
import * as types from "./types";

/**
 * Add all filters to an Environment.
 * @param env The environment to register filters in.
 */
export function registerFilters(env: Environment) {
  env.addFilter(comments.blockComment.name, comments.blockComment);
  env.addFilter(strings.pascalCase.name, strings.pascalCase);
  env.addFilter(strings.camelCase.name, strings.camelCase);
  env.addFilter(strings.toJson.name, strings.toJson);
  env.addFilter(strings.autoQuote.name, strings.autoQuote);
  env.addFilter(types.isArray.name, types.isArray);
  env.addFilter(types.enumMatchesType.name, types.enumMatchesType);
  env.addFilter(types.convertType.name, types.convertType);
  env.addFilter(engine.isRef.name, engine.isRef);
  env.addFilter(engine.isSchema.name, engine.isSchema);
  env.addFilter(engine.isSchemaOrRef.name, engine.isSchemaOrRef);
  env.addFilter(engine.isSimpleType.name, engine.isSimpleType);
}
