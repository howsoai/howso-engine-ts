import { Environment } from "nunjucks";
import * as comments from "./comments";
import * as schemas from "./schemas";

/**
 * Add all filters to an Environment.
 * @param env The environment to register filters in.
 */
export function registerFilters(env: Environment) {
  env.addFilter(comments.blockComment.name, comments.blockComment);
  env.addFilter(schemas.schemaImports.name, schemas.schemaImports);
}
