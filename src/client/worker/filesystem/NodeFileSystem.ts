import type { Worker } from "node:worker_threads";
import { isNode } from "../../utilities";
import { AbstractFileSystem } from "./AbstractFileSystem";

export class NodeFileSystem extends AbstractFileSystem<Worker> {
  protected readonly baseDir: string;
  protected readonly worker: Worker;

  constructor(worker: Worker, baseDir?: string) {
    super();
    if (!isNode) {
      throw new Error("NodeFileSystem is only valid in Node contexts.");
    }
    this.worker = worker;
    this.baseDir = baseDir ?? "/app/";
  }

  public async prepareFile(parent: string, name: string, url: string): Promise<void> {
    const { readFile } = await import("node:fs/promises");
    const data = await readFile(url);
    await this.writeFile(this.join(parent, name), data);
  }
}
