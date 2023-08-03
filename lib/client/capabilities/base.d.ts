import { Trainee } from "../../trainees/index.js";
import type { CacheMap } from "../utilities/cache.js";
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
export declare abstract class BaseClient {
    protected abstract readonly traineeCache: CacheMap<TraineeBaseCache>;
    static readonly capabilities: Readonly<Capabilities>;
    abstract setup(): Promise<void>;
}
