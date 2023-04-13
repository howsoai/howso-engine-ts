/**
 * Waiter awaiting for notification.
 */
export class NotifyWaiter {
    constructor(resolveFunc, cancelFunc, timeout) {
        this.resolveFunc = resolveFunc;
        this.cancelFunc = cancelFunc;
        this._resolved = false;
        if (timeout != null) {
            this.timeout = setTimeout(() => this.resolve(undefined), timeout);
        }
    }
    /** Check if waiter resolved. */
    get resolved() {
        return this._resolved;
    }
    /**
     * Resolve this waiter.
     * @param value The value from notifier.
     */
    resolve(value) {
        if (!this.resolved) {
            clearTimeout(this.timeout);
            this.resolveFunc(value);
            this._resolved = true;
        }
    }
    /**
     * Cancel this waiter.
     */
    cancel() {
        if (!this.resolved) {
            clearTimeout(this.timeout);
            this.cancelFunc();
            this._resolved = true;
        }
    }
}
/**
 * Wait until notified or timeout.
 */
export class NotifySubject {
    constructor() {
        this.waiters = [];
        this._seq = 0;
        this._closed = false;
    }
    /**
     * Get if subject has been closed.
     */
    get closed() {
        return this._closed;
    }
    /**
     * The number of times the subject has been notified.
     */
    get seq() {
        return this._seq;
    }
    /**
     * Close the subject, preventing any future notifications.
     * Existing waiters will be cancelled.
     */
    close() {
        this.cancel();
        this._closed = true;
    }
    wait(timeout) {
        if (this.closed) {
            return new Promise((_, reject) => reject("closed"));
        }
        return new Promise((resolve, reject) => {
            const waiter = new NotifyWaiter((value) => {
                this.remove(waiter);
                resolve(value);
            }, () => {
                this.remove(waiter);
                reject("cancelled");
            }, timeout);
            this.waiters.push(waiter);
        });
    }
    /**
     * Remove a waiter.
     * @param waiter The waiter to remove.
     */
    remove(waiter) {
        if (!this.closed) {
            const pos = this.waiters.indexOf(waiter);
            if (pos >= 0) {
                this.waiters.splice(pos, 1);
            }
        }
    }
    /**
     * Notify all waiters.
     * @param value The value to send to waiters.
     */
    notify(value) {
        if (!this.closed) {
            this._seq += 1;
            for (const waiter of this.waiters) {
                waiter.resolve(value);
            }
        }
    }
    /**
     * Cancel all waiters.
     */
    cancel() {
        if (!this.closed) {
            for (const waiter of this.waiters) {
                waiter.cancel();
            }
        }
    }
}
