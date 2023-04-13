export type BatchProcessor = (startSize: number) => AsyncGenerator<void, void, number>;

export interface BatchOptions {
  /** The starting batch size. */
  startSize?: number;
  /* The minimum and maximum batch size. Defaults to no limit. */
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
export async function batcher(process: BatchProcessor, options: BatchOptions = {}) {
  const { startSize = 1, multiplier = [1.618, 0.809], limits = [1, null], threshold = [30, 60] } = options;

  // Validate options
  if (multiplier[0] == null || multiplier[0] <= 1) {
    throw new RangeError("The additive multiplier must be a number greater than 1.");
  }
  if (limits[0] == null || limits[0] < 1) {
    throw new RangeError("The minimum limit must be a number greater than or equal to 1.");
  }
  if (startSize == null || startSize < 1) {
    throw new RangeError("The start size must be a number greater than or equal to 1.");
  } else if (startSize < limits[0]) {
    throw new RangeError("The start size must not be less than the lower limit.");
  }

  // Scale batch size based on multiplier, thresholds and limits
  function scale(size: number, duration: number): number {
    // Scale up or down (if necessary)
    if (duration <= threshold[0]) {
      size = Math.ceil(size * multiplier[0]);
    } else if (duration > threshold[1]) {
      if (multiplier[1] < 1) {
        size = Math.floor(size * multiplier[1]);
      } else {
        size = Math.floor(size / multiplier[1]);
      }
    }
    // Clamp based on limits
    size = Math.max(size, limits[0]);
    if (limits[1] != null) {
      size = Math.min(size, limits[1]);
    }
    return size;
  }

  const iter = process(startSize);
  let size = startSize;
  let startTime = new Date();
  let endTime: Date;
  let done: boolean | undefined;
  do {
    ({ done } = await iter.next(size));
    // Prepare next iteration
    endTime = new Date();
    size = scale(size, (+endTime - +startTime) / 1000);
    startTime = new Date();
  } while (!done);
}

/**
 * Accumulate an object record.
 * @param accumulator The object to accumulate all results to.
 * @param item An individual item to accumulate.
 * @param onceKeys Keys of the object which should only be accumulated once.
 */
export function accumulateRecords<T = unknown>(
  accumulator: Record<string, T[]>,
  item: Record<string, T[]>,
  onceKeys: string[] = []
) {
  for (const [key, value] of Object.entries(item)) {
    if (onceKeys.indexOf(key) !== -1) {
      if (!(key in accumulator)) {
        accumulator[key] = value;
      }
      continue;
    }
    if (accumulator[key] == null && value != null) {
      accumulator[key] = [];
    }
    if (Array.isArray(value)) {
      accumulator[key].push(...value);
    }
  }
}
