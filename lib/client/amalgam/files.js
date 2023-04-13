var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isNode } from "../utilities/detectors.js";
export class FileSystemClient {
    constructor(worker, baseDir) {
        this.worker = worker;
        this.entityExt = "caml";
        this.baseDir = baseDir || "/app/";
    }
    get libDir() {
        return this.baseDir;
    }
    get traineeDir() {
        return this.join(this.libDir, "trainee", "/");
    }
    get migrationsDir() {
        return this.join(this.libDir, "migrations", "/");
    }
    join(...parts) {
        var _a;
        const segments = [];
        if ((_a = parts === null || parts === void 0 ? void 0 : parts[0]) === null || _a === void 0 ? void 0 : _a.startsWith("/")) {
            // Is absolute
            segments.push("");
        }
        for (const p of parts) {
            if (p === "/") {
                // Explicit slash
                segments.push("");
            }
            else {
                segments.push(...p.split("/").filter((p) => !!p));
            }
        }
        return segments.join("/");
    }
    dispatch(request) {
        return new Promise((resolve, reject) => {
            const channel = new MessageChannel();
            channel.port1.onmessage = (ev) => {
                var _a, _b;
                if ((_a = ev.data) === null || _a === void 0 ? void 0 : _a.success) {
                    resolve(ev.data.body);
                }
                else {
                    reject((_b = ev.data) === null || _b === void 0 ? void 0 : _b.error);
                }
            };
            if (isNode) {
                this.worker.postMessage({ data: request, ports: [channel.port2] }, [channel.port2]);
            }
            else {
                this.worker.postMessage(request, [channel.port2]);
            }
        });
    }
    createLazyFile(parent, name, url, canRead = true, canWrite = true) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dispatch({
                type: "request",
                command: "createLazyFile",
                parameters: [parent, name, url, canRead, canWrite],
            });
        });
    }
    writeFile(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dispatch({
                type: "request",
                command: "writeFile",
                parameters: [path, data],
            });
        });
    }
    readFile(path, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dispatch({
                type: "request",
                command: "readFile",
                parameters: opts != null ? [path, opts] : [path],
            });
        });
    }
    unlink(path) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dispatch({
                type: "request",
                command: "unlink",
                parameters: [path],
            });
        });
    }
    mkdir(path, mode) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dispatch({
                type: "request",
                command: "mkdir",
                parameters: mode != null ? [path, mode] : [path],
            });
        });
    }
    rmdir(path) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dispatch({
                type: "request",
                command: "rmdir",
                parameters: [path],
            });
        });
    }
    readdir(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.dispatch({
                type: "request",
                command: "readdir",
                parameters: [path],
            });
        });
    }
    isSafeChar(code) {
        // UTF-8 chars below zero (U+0030) are unsafe
        if (code < 48)
            return false;
        // Chars between 0 and 9 are ok
        if (code <= 57)
            return true;
        // Chars above 9 (U+0039) and below A (U+0041) are unsafe
        if (code < 65)
            return false;
        // Chars between A and Z are ok
        if (code <= 90)
            return true;
        // Chars between Z and a (exclusive) are unsafe
        if (code < 97)
            return false;
        // Chars between a and z are ok
        if (code <= 122)
            return true;
        // Any other char is unsafe
        return false;
    }
    sanitizeFilename(filename) {
        let escaped = "";
        for (let i = 0; i < filename.length; i++) {
            const char = filename.charCodeAt(i);
            if (this.isSafeChar(char)) {
                escaped += filename[i];
            }
            else {
                // TODO - implement core escape mechanism
                escaped += "_";
            }
        }
        return escaped;
    }
}
