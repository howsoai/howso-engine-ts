export class CacheMap {
    constructor(initial) {
        this.cache = initial || {};
    }
    set(key, value) {
        this.cache[key] = value;
    }
    get(key) {
        return this.cache[key];
    }
    has(key) {
        return key in this.cache;
    }
    discard(key) {
        if (this.has(key)) {
            delete this.cache[key];
        }
    }
    keys() {
        return Object.keys(this.cache);
    }
    values() {
        return Object.values(this.cache);
    }
    clear() {
        this.cache = {};
    }
}
