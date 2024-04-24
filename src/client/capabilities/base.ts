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

export abstract class BaseClient {
  public static readonly capabilities: Readonly<Capabilities> = {};
  public abstract setup(): Promise<void>;
}
