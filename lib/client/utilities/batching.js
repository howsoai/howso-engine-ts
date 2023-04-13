var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Batch scale a process based on runtime of individual batches.
 * @param process The generator function to process each batch.
 * @param options Configuration options for batching.
 */
export function batcher(process, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
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
        }
        else if (startSize < limits[0]) {
            throw new RangeError("The start size must not be less than the lower limit.");
        }
        // Scale batch size based on multiplier, thresholds and limits
        function scale(size, duration) {
            // Scale up or down (if necessary)
            if (duration <= threshold[0]) {
                size = Math.ceil(size * multiplier[0]);
            }
            else if (duration > threshold[1]) {
                if (multiplier[1] < 1) {
                    size = Math.floor(size * multiplier[1]);
                }
                else {
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
        let endTime;
        let done;
        do {
            ({ done } = yield iter.next(size));
            // Prepare next iteration
            endTime = new Date();
            size = scale(size, (+endTime - +startTime) / 1000);
            startTime = new Date();
        } while (!done);
    });
}
/**
 * Accumulate an object record.
 * @param accumulator The object to accumulate all results to.
 * @param item An individual item to accumulate.
 * @param onceKeys Keys of the object which should only be accumulated once.
 */
export function accumulateRecords(accumulator, item, onceKeys = []) {
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
