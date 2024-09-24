import type { Session, SessionIdentity } from "@/types";

export interface ISessionClient {
  getActiveSession(): Promise<Readonly<Session>>;
  getSession(sessionId?: string): Promise<Session>;
  querySessions(search?: string): Promise<SessionIdentity[]>;
  beginSession(name?: string, metadata?: Record<string, any>): Promise<Session>;
}
