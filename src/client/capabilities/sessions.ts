import type { Session, SessionIdentity } from "@/types";

export interface ISessionClient {
  getActiveSession(): Promise<Readonly<Session>>;
  querySessions(traineeId: string): Promise<SessionIdentity[]>;
  beginSession(name?: string, metadata?: Record<string, unknown>): Promise<Session>;
}
