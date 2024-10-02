export type BaseTrainee = {
  /**
   * The unique identifier of the Trainee.
   */
  id: string;

  /**
   * The name of the Trainee.
   */
  name?: string | null;

  /**
   * The type of persistence schedule to use.
   * If allow, the trainee may be manually persisted and will be persisted automatically only when unloaded.
   * If always, the trainee will be automatically persisted whenever it is updated.
   * If never, the trainee will never be persisted and any requests to explicitly persist it will fail.
   * @default "allow"
   */
  persistence?: "allow" | "always" | "never";

  /**
   * Any key-value pair to be stored with the Trainee.
   */
  metadata?: { [key: string]: any };
};
