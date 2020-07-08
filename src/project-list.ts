import { projectDemoSelector_load } from "./project-demo-selector";
import { promise_waitIndicator_load } from "./promise/project-wait-indicator";
import { promise_waitIndicatorAsyncAwait_load } from "./promise/project-wait-indicator-async-await";

interface ProjectItemLocal {
  topic: string;
  name: string;
  path: string | null;
  load: () => void;
  codeURL: string;
}

interface ProjectListLocal {
  [key: string]: ProjectItemLocal;
}

export interface ProjectItem {
  topic: string;
  name: string;
  path: string;
  load: () => void;
  codeURL: string;
}

export interface ProjectList {
  [key: string]: ProjectItem;
}

export function getPathPrefix() {
  return "";
}

export function getProjectPath(project: ProjectItem) {
  return `${getPathPrefix()}${project.path}`;
}

export function findProjectByKey(key: string | null): ProjectItem {
  if (!key) {
    return findProjectByKey(projectDemoSelectorKey);
  }
  let project = getProjectList()[key.toLowerCase()];
  if (!project) {
    return findProjectByKey(projectDemoSelectorKey);
  }
  return project;
}

export function launchProjectByKey(key: string | null): void {
  let project = findProjectByKey(key);
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
var projectListLocal: ProjectListLocal = {
  "project-demo-selector": {
    topic: "Array",
    name: "Project Demo Selector",
    path: null,
    load: () => {
      projectDemoSelector_load();
    },
    codeURL:
      "https://github.com/lightmotive/learn-javascript/blob/master/src/project-demo-selector.ts",
  },
  "promise/wait-indicator": {
    topic: "Promise",
    name: "Wait Indicator (single promise)",
    path: null,
    load: () => {
      promise_waitIndicator_load();
    },
    codeURL:
      "https://github.com/lightmotive/learn-javascript/blob/master/src/promise/project-wait-indicator.ts",
  },
  "promise/wait-indicator-async-await": {
    topic: "Promise",
    name: "Wait Indicator (async/await)",
    path: null,
    load: () => {
      promise_waitIndicatorAsyncAwait_load();
    },
    codeURL:
      "https://github.com/lightmotive/learn-javascript/blob/master/src/promise/project-wait-indicator-async-await.ts",
  },
};

var projectDemoSelectorKey = Object.keys(projectListLocal)[0];

export function getProjectList(): ProjectList {
  //Process list
  return Object.fromEntries(
    Object.entries(projectListLocal).map(([key, val]) => {
      let projectItem = val as ProjectItem;
      projectItem.path = projectItem.path
        ? projectItem.path
        : `?project=${encodeURIComponent(key)}`;
      return [key, projectItem];
    })
  );
}
