import { AbstractBaseClient } from "../client/AbstractBaseClient";
import type { BaseTrainee } from "../types";

export class Trainee implements BaseTrainee {
  public readonly id: string;
  protected readonly client: AbstractBaseClient;
  protected _name: BaseTrainee["name"];
  protected _persistence: BaseTrainee["persistence"];
  protected _metadata: BaseTrainee["metadata"];

  constructor(client: AbstractBaseClient, obj: BaseTrainee) {
    this.client = client;
    this.id = obj.id;
    this._name = obj.name;
    this._metadata = obj.metadata;
    this._persistence = obj.persistence;
  }

  public get name() {
    return this._name ?? null;
  }

  public get persistence() {
    return this._persistence || "allow";
  }

  public get metadata(): Readonly<{ [key: string]: any }> {
    return this._metadata || {};
  }
}
