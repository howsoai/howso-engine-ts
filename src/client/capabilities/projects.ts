import type { Project, ProjectIdentity } from "@howso/openapi-client/models";

export interface IProjectClient {
  createProject(project: Required<Pick<Project, "name">>): Promise<Project>;
  updateProject(project: Required<Pick<Project, "name" | "id">>): Promise<Project>;
  getProject(id: string): Promise<Project>;
  deleteProject(id: string): Promise<void>;
  listProjects(keywords: string | string[]): Promise<ProjectIdentity[]>;
}
