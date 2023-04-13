import type { IFileSystem, FileSystemOperation, FileSystemRequest, FileSystemResponseBody } from "diveplane-amalgam-api/worker";
export declare class FileSystemClient implements IFileSystem {
    private readonly worker;
    protected readonly baseDir: string;
    readonly entityExt = "caml";
    constructor(worker: Worker, baseDir?: string);
    get libDir(): string;
    get traineeDir(): string;
    get migrationsDir(): string;
    join(...parts: string[]): string;
    protected dispatch<T extends FileSystemOperation = FileSystemOperation>(request: FileSystemRequest<T>): Promise<FileSystemResponseBody<T>>;
    createLazyFile(parent: string, name: string, url: string, canRead?: boolean, canWrite?: boolean): Promise<void>;
    writeFile(path: string, data: string | DataView): Promise<void>;
    readFile(path: string, opts: {
        encoding: "binary";
    }): Promise<Uint8Array>;
    readFile(path: string, opts: {
        encoding: "utf8";
    }): Promise<string>;
    readFile(path: string): Promise<Uint8Array>;
    unlink(path: string): Promise<void>;
    mkdir(path: string, mode?: number | undefined): Promise<void>;
    rmdir(path: string): Promise<void>;
    readdir(path: string): Promise<string[]>;
    private isSafeChar;
    sanitizeFilename(filename: string): string;
}
