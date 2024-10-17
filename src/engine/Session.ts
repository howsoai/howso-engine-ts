import { AbstractBaseClient } from "../client/AbstractBaseClient";
import type { BaseSession } from "../types";

/**
 * The interface for interacting with a Session. Should not be instantiated directly. Instead begin or request a
 * Session using the client.
 */
export class Session implements BaseSession {
  public readonly id: string;
  protected readonly client: AbstractBaseClient;
  protected _name: BaseSession["name"];
  protected _metadata: BaseSession["metadata"];
  protected _created_date: BaseSession["created_date"];
  protected _modified_date: BaseSession["modified_date"];

  constructor(client: AbstractBaseClient, obj: BaseSession) {
    this.client = client;
    this.id = obj.id;
    this._name = obj.name;
    this._metadata = obj.metadata;
    this._created_date = obj.created_date;
    this._modified_date = obj.modified_date;
  }

  public get name() {
    return this._name ?? null;
  }

  public get metadata(): Readonly<{ [key: string]: any }> {
    return this._metadata || {};
  }

  public get modified_date() {
    return this._modified_date;
  }

  public get created_date() {
    return this._created_date;
  }
}
