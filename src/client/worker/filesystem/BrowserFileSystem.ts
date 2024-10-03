import { AbstractFileSystem } from "./AbstractFileSystem";

export class BrowserFileSystem extends AbstractFileSystem<Worker> {
  protected readonly baseDir: string;
  protected readonly worker: Worker;

  constructor(worker: Worker, baseDir?: string) {
    super();
    this.worker = worker;
    this.baseDir = baseDir ?? "/app/";
  }

  public async prepareFile(parent: string, name: string, url: string): Promise<void> {
    await this.createLazyFile(parent, name, url);
  }
}
