/**
 * Waiter awaiting for notification.
 */
export class NotifyWaiter<T = unknown> {
  private timeout?: ReturnType<typeof setTimeout>;
  private _resolved = false;

  public constructor(
    private resolveFunc: (value?: T) => void,
    private cancelFunc: () => void,
    timeout?: number,
  ) {
    if (timeout != null) {
      this.timeout = setTimeout(() => this.resolve(undefined), timeout);
    }
  }

  /** Check if waiter resolved. */
  public get resolved() {
    return this._resolved;
  }

  /**
   * Resolve this waiter.
   * @param value The value from notifier.
   */
  public resolve(value?: T) {
    if (!this.resolved) {
      clearTimeout(this.timeout);
      this.resolveFunc(value);
      this._resolved = true;
    }
  }

  /**
   * Cancel this waiter.
   */
  public cancel() {
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
export class NotifySubject<T = unknown> {
  public waiters: NotifyWaiter<T>[] = [];
  protected _seq = 0;
  protected _closed = false;

  /**
   * Get if subject has been closed.
   */
  public get closed() {
    return this._closed;
  }

  /**
   * The number of times the subject has been notified.
   */
  public get seq() {
    return this._seq;
  }

  /**
   * Close the subject, preventing any future notifications.
   * Existing waiters will be cancelled.
   */
  public close(): void {
    this.cancel();
    this._closed = true;
  }

  /**
   * Wait for notify.
   * @param timeout Maximum time to wait for notification, if not provided does not timeout.
   */
  public wait(): Promise<T>;
  public wait(timeout: number): Promise<T | undefined>;
  public wait(timeout?: number): Promise<T | undefined> {
    if (this.closed) {
      return new Promise<T | undefined>((_, reject) => reject("closed"));
    }
    return new Promise<T | undefined>((resolve, reject) => {
      const waiter = new NotifyWaiter<T>(
        (value?: T) => {
          this.remove(waiter);
          resolve(value);
        },
        () => {
          this.remove(waiter);
          reject("cancelled");
        },
        timeout,
      );
      this.waiters.push(waiter);
    });
  }

  /**
   * Remove a waiter.
   * @param waiter The waiter to remove.
   */
  private remove(waiter: NotifyWaiter<T>): void {
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
  public notify(value: T) {
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
  public cancel() {
    if (!this.closed) {
      for (const waiter of this.waiters) {
        waiter.cancel();
      }
    }
  }
}
