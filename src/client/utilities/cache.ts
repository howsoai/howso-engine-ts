export class CacheMap<T> {
  private cache: Record<string, T>;

  constructor(initial?: Record<string, T>) {
    this.cache = initial || {};
  }

  public set(key: string, value: T): void {
    this.cache[key] = value;
  }

  public get(key: string): T | undefined {
    return this.cache[key];
  }

  public has(key: string): boolean {
    return key in this.cache;
  }

  public discard(key: string): void {
    if (this.has(key)) {
      delete this.cache[key];
    }
  }

  public keys(): string[] {
    return Object.keys(this.cache);
  }

  public values(): T[] {
    return Object.values(this.cache);
  }

  public clear(): void {
    this.cache = {};
  }
}
