interface ProjectDataItem {
  topic: string;
  name: string;
  load: () => void;
  path?: string;
  codeURL?: string;
}

export interface ProjectItem extends ProjectDataItem {
  path: string;
  codeURL: string;
}

export interface ProjectData {
  [key: string]: ProjectDataItem;
}

export interface Projects {
  [key: string]: ProjectItem;
}

export interface ProjectManager {
  getProjects(): Projects;
  findProjectByKey(key: string | null | undefined): ProjectItem;
  launchProjectByKey(key: string | null | undefined): void;
  loadProjectByKey(key: string | null | undefined): void;
}
