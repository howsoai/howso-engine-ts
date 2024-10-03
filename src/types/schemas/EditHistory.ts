/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * EditHistory
 */
import type { EditHistoryRecord } from "./EditHistoryRecord";

/**
 * The edit history of a given case. Keyed by the session id and in order of occurrence.
 */
export type EditHistory = Record<string, EditHistoryRecord[]>;
