import type {
  FileSystemOperation,
  FileSystemRequest,
  FileSystemResponse,
  FileSystemResponseBody,
  IFileSystem,
} from "@howso/amalgam-lang";
import { isNode } from "../utilities";

export class FileSystemClient implements IFileSystem {
  protected readonly baseDir: string;
  public readonly entityExt = "caml";

  constructor(
    private readonly worker: Worker,
    baseDir?: string,
  ) {
    this.baseDir = baseDir ?? "/app/";
  }

  public get libDir(): string {
    return this.baseDir;
  }

  public get traineeDir(): string {
    return this.join(this.libDir, "trainee", "/");
  }

  public get migrationsDir(): string {
    return this.join(this.libDir, "migrations", "/");
  }

  public join(...parts: string[]): string {
    const segments = [];
    if (parts?.[0]?.startsWith("/")) {
      // Is absolute
      segments.push("");
    }
    for (const p of parts) {
      if (p === "/") {
        // Explicit slash
        segments.push("");
      } else {
        segments.push(...p.split("/").filter((p) => !!p));
      }
    }
    return segments.join("/");
  }

  protected dispatch<T extends FileSystemOperation = FileSystemOperation>(
    request: FileSystemRequest<T>,
  ): Promise<FileSystemResponseBody<T>> {
    return new Promise((resolve, reject) => {
      const channel = new MessageChannel();
      channel.port1.onmessage = (ev: MessageEvent<FileSystemResponse<T>>) => {
        if (ev.data?.success) {
          resolve(ev.data.body);
        } else {
          reject(ev.data?.error);
        }
      };
      this.worker.postMessage(request, [channel.port2]);
    });
  }

  public async prepareFile(parent: string, name: string, url: string): Promise<void> {
    if (isNode) {
      const { readFile } = await import("node:fs/promises");
      const data = await readFile(url);
      this.writeFile(this.join(parent, name), data);
    } else {
      this.createLazyFile(parent, name, url);
    }
  }

  public async analyzePath(path: string, dontResolveLastLink?: boolean): Promise<FS.Analyze> {
    return await this.dispatch({
      type: "request",
      command: "analyzePath",
      parameters: [path, dontResolveLastLink],
    });
  }

  public async createLazyFile(
    parent: string,
    name: string,
    url: string,
    canRead = true,
    canWrite = true,
  ): Promise<void> {
    await this.dispatch({
      type: "request",
      command: "createLazyFile",
      parameters: [parent, name, url, canRead, canWrite],
    });
  }

  public async writeFile(
    path: string,
    data: string | ArrayBufferView,
    opts?: { flags?: string | undefined },
  ): Promise<void> {
    await this.dispatch({
      type: "request",
      command: "writeFile",
      parameters: [path, data, opts],
    });
  }

  public async readFile(path: string, opts: { encoding: "binary" }): Promise<Uint8Array>;
  public async readFile(path: string, opts: { encoding: "utf8" }): Promise<string>;
  public async readFile(path: string): Promise<Uint8Array>;
  public async readFile(path: string, opts?: { encoding: "binary" | "utf8" }): Promise<Uint8Array | string> {
    return await this.dispatch({
      type: "request",
      command: "readFile",
      parameters: opts != null ? [path, opts] : [path],
    });
  }

  public async unlink(path: string): Promise<void> {
    await this.dispatch({
      type: "request",
      command: "unlink",
      parameters: [path],
    });
  }

  public async mkdir(path: string, mode?: number | undefined): Promise<void> {
    await this.dispatch({
      type: "request",
      command: "mkdir",
      parameters: mode != null ? [path, mode] : [path],
    });
  }

  public async rmdir(path: string): Promise<void> {
    await this.dispatch({
      type: "request",
      command: "rmdir",
      parameters: [path],
    });
  }

  public async readdir(path: string): Promise<string[]> {
    return await this.dispatch({
      type: "request",
      command: "readdir",
      parameters: [path],
    });
  }

  private isSafeChar(code: number) {
    // Space and dash are ok
    if (code == 32 || code == 45) return true;
    // Other UTF-8 chars below zero (U+0030) are unsafe
    if (code < 48) return false;
    // Chars between 0 and 9 are ok
    if (code <= 57) return true;
    // Chars above 9 (U+0039) and below A (U+0041) are unsafe
    if (code < 65) return false;
    // Chars between A and Z are ok
    if (code <= 90) return true;
    // Chars between Z and a (exclusive) are unsafe
    if (code < 97) return false;
    // Chars between a and z are ok
    if (code <= 122) return true;
    // Any other char is unsafe
    return false;
  }

  public sanitizeFilename(filename: string): string {
    let escaped = "";
    for (let i = 0; i < filename.length; i++) {
      const char = filename.charCodeAt(i);
      if (this.isSafeChar(char)) {
        escaped += filename[i];
      } else {
        // TODO - implement core escape mechanism
        escaped += "_";
      }
    }
    return escaped;
  }

  public traineeFilename(traineeId: string): string {
    const sanitized = this.sanitizeFilename(traineeId);
    return `${sanitized}.${this.entityExt}`;
  }
}
