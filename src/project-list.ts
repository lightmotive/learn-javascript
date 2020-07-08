import { promise_waitIndicator_load } from "./promise/project-wait-indicator";
import {
  ProjectDemoSelector,
  projectDemoSelector_load,
} from "./project-demo-selector";

export interface ProjectItem {
  key: string;
  topic: string;
  name: string;
  path: string;
  load: () => void;
}

var projectDemoSelectorKey = "project-demo-selector";

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
  let project = projectList.find((proj) => {
    return proj.key.toLowerCase() === key.toLowerCase();
  });
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
export var projectList: ProjectItem[] = [
  {
    key: projectDemoSelectorKey,
    topic: "Array",
    name: "Project Demo Selector",
    path: "?project=project-demo-selector",
    load: () => {
      projectDemoSelector_load();
    },
  },
  {
    key: "promise/wait-indicator",
    topic: "Promise",
    name: "Wait Indicator (Single Promise)",
    path: "?project=promise%2Fwait-indicator",
    load: () => {
      promise_waitIndicator_load();
    },
  },
];
