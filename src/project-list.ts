import { projectDemoSelector_load } from "./project-demo-selector";
import { promise_waitIndicator_load } from "./promise/project-wait-indicator";
import { promise_waitIndicatorAsyncAwait_load } from "./promise/project-wait-indicator-async-await";
import { iterator_basicIterator_load } from "./iterator/project-character-range";

interface ProjectItemLocal {
  topic: string;
  name: string;
  load: () => void;
  codeURL: string;
}

interface ProjectListLocal {
  [key: string]: ProjectItemLocal;
}

export interface ProjectItem extends ProjectItemLocal {
  path: string;
}

export interface ProjectList {
  [key: string]: ProjectItem;
}

export function getPathPrefix(): string {
  return "";
}

export function getProjectPath(project: ProjectItem): string {
  return `${getPathPrefix()}${project.path}`;
}

export function findProjectByKey(key: string | null): ProjectItem {
  if (!key) {
    return findProjectByKey(projectDemoSelectorKey);
  }
  const project = getProjectList()[key.toLowerCase()];
  if (!project) {
    return findProjectByKey(projectDemoSelectorKey);
  }
  return project;
}

export function launchProjectByKey(key: string | null): void {
  const project = findProjectByKey(key);
  if (project) {
    window.location.href = getProjectPath(project);
    return;
  }
  launchProjectByKey(projectDemoSelectorKey);
}

export function loadProjectByKey(key: string | null): void {
  findProjectByKey(key).load();
}

/**
 * All values must be specified.
 */
const projectListLocal: ProjectListLocal = {
  "project-demo-selector": {
    topic: "Associative array (map, dictionary)",
    name: "Project Demo Selector",
    load: () => {
      projectDemoSelector_load();
    },
    codeURL:
      "https://github.com/lightmotive/learn-javascript/blob/master/src/project-demo-selector.ts",
  },
  "iterator/character-range": {
    topic: "Iterator",
    name: "Print character range",
    load: () => {
      iterator_basicIterator_load();
    },
    codeURL:
      "https://github.com/lightmotive/learn-javascript/blob/master/src/iterator/project-character-range.ts",
  },
  "promise/wait-indicator": {
    topic: "Promise",
    name: "Wait indicator (single promise)",
    load: () => {
      promise_waitIndicator_load();
    },
    codeURL:
      "https://github.com/lightmotive/learn-javascript/blob/master/src/promise/project-wait-indicator.ts",
  },
  "promise/wait-indicator-async-await": {
    topic: "Promise",
    name: "Wait indicator (async/await)",
    load: () => {
      promise_waitIndicatorAsyncAwait_load();
    },
    codeURL:
      "https://github.com/lightmotive/learn-javascript/blob/master/src/promise/project-wait-indicator-async-await.ts",
  },
};

const projectDemoSelectorKey = Object.keys(projectListLocal)[0];

export function getProjectList(): ProjectList {
  //Process list
  return Object.fromEntries(
    Object.entries(projectListLocal).map(([key, val]) => {
      const projectItem = val as ProjectItem;
      projectItem.path = projectItem.path
        ? projectItem.path
        : `?project=${encodeURIComponent(key)}`;
      projectItem.codeURL = `https://github.com/lightmotive/learn-javascript/blob/master/src/${key.replace(
        "/",
        "/project-"
      )}.ts`;
      return [key, projectItem];
    })
  );
}
