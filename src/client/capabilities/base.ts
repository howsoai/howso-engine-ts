import { Trainee } from "../../types";
import type { CacheMap } from "../utilities/cache";

export interface Capabilities {
  supportsTrainees?: boolean;
  supportsProjects?: boolean;
  supportsAccounts?: boolean;
  supportsSessions?: boolean;
  supportsSessionManagement?: boolean;
  supportsAuthentication?: boolean;
  supportsFileSystem?: boolean;
  supportsTrace?: boolean;
}

export interface TraineeBaseCache {
  trainee: Trainee;
}

export abstract class BaseClient {
  protected abstract readonly traineeCache: CacheMap<TraineeBaseCache>;
  public static readonly capabilities: Readonly<Capabilities> = {};
  public abstract setup(): Promise<void>;
}
