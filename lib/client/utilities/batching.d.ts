export type BatchProcessor = (startSize: number) => AsyncGenerator<void, void, number>;
export interface BatchOptions {
    /** The starting batch size. */
    startSize?: number;
    limits?: [min: number, max?: number];
    /**
     * The rate at which batches are scaled up and down (respectively)
     * Defaults to the golden ratio.
     * See: https://en.wikipedia.org/wiki/Golden_ratio
     */
    multiplier?: [additive: number, subtractive: number];
    /**
     * The threshold, in seconds, for a single operation to complete to determine
     * if the batch size should increase or decrease.
     * Defaults to 30 - 60 seconds.
     */
    threshold?: [lower: number, upper: number];
}
/**
 * Batch scale a process based on runtime of individual batches.
 * @param process The generator function to process each batch.
 * @param options Configuration options for batching.
 */
export declare function batcher(process: BatchProcessor, options?: BatchOptions): Promise<void>;
/**
 * Accumulate an object record.
 * @param accumulator The object to accumulate all results to.
 * @param item An individual item to accumulate.
 * @param onceKeys Keys of the object which should only be accumulated once.
 */
export declare function accumulateRecords<T = unknown>(accumulator: Record<string, T[]>, item: Record<string, T[]>, onceKeys?: string[]): void;
