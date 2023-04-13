/**
 * Waiter awaiting for notification.
 */
export declare class NotifyWaiter<T = unknown> {
    private resolveFunc;
    private cancelFunc;
    private timeout?;
    private _resolved;
    constructor(resolveFunc: (value?: T) => void, cancelFunc: () => void, timeout?: number);
    /** Check if waiter resolved. */
    get resolved(): boolean;
    /**
     * Resolve this waiter.
     * @param value The value from notifier.
     */
    resolve(value?: T): void;
    /**
     * Cancel this waiter.
     */
    cancel(): void;
}
/**
 * Wait until notified or timeout.
 */
export declare class NotifySubject<T = unknown> {
    waiters: NotifyWaiter<T>[];
    protected _seq: number;
    protected _closed: boolean;
    /**
     * Get if subject has been closed.
     */
    get closed(): boolean;
    /**
     * The number of times the subject has been notified.
     */
    get seq(): number;
    /**
     * Close the subject, preventing any future notifications.
     * Existing waiters will be cancelled.
     */
    close(): void;
    /**
     * Wait for notify.
     * @param timeout Maximum time to wait for notification, if not provided does not timeout.
     */
    wait(): Promise<T>;
    wait(timeout: number): Promise<T | undefined>;
    /**
     * Remove a waiter.
     * @param waiter The waiter to remove.
     */
    private remove;
    /**
     * Notify all waiters.
     * @param value The value to send to waiters.
     */
    notify(value: T): void;
    /**
     * Cancel all waiters.
     */
    cancel(): void;
}
