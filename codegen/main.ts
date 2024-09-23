import { getEngineApi } from "./engine";
import { Generator } from "./generator";

export default async function main() {
  // Entrypoint for running the code generator
  const doc = await getEngineApi();
  const gen = new Generator(doc);
  gen.render();
}

main();
