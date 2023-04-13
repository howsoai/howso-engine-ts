export declare class CacheMap<T> {
    private cache;
    constructor(initial?: Record<string, T>);
    set(key: string, value: T): void;
    get(key: string): T | undefined;
    has(key: string): boolean;
    discard(key: string): void;
    keys(): string[];
    values(): T[];
    clear(): void;
}
