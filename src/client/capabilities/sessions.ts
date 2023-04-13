import type { Session, SessionIdentity } from "diveplane-openapi-client/models";

export interface ISessionManagementClient {
  updateSession(session: Required<Pick<Session, "id" | "metadata">>): Promise<Session>;
  getSession(id: string): Promise<Session>;
  listSessions(keywords: string | string[]): Promise<SessionIdentity[]>;
}

export interface ISessionClient {
  getActiveSession(): Promise<Readonly<Session>>;
  beginSession(name?: string, metadata?: Record<string, unknown>): Promise<Session>;
}
