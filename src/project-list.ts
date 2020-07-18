import { projectDemoSelector_load } from "./project-demo-selector";
import { promise_waitIndicator_load } from "./promise/project-wait-indicator";
import { promise_waitIndicatorAsyncAwait_load } from "./promise/project-wait-indicator-async-await";
import { iterator_basicIterator_load } from "./iterator/project-character-range";

interface ProjectItemLocal {
  topic: string;
  name: string;
  load: () => void;
  path?: string;
  codeURL?: string;
}

export interface ProjectListLocal {
  [key: string]: ProjectItemLocal;
}

export interface ProjectItem extends ProjectItemLocal {
  path: string;
  codeURL: string;
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
  "demo-selector": {
    topic: "Associative array (map, dictionary)",
    name: "Project Demo Selector",
    load: () => {
      projectDemoSelector_load();
    },
  },
  "iterator/character-range": {
    topic: "Iterator",
    name: "Print character range",
    load: () => {
      iterator_basicIterator_load();
    },
  },
  "promise/wait-indicator": {
    topic: "Promise",
    name: "Wait indicator (single promise)",
    load: () => {
      promise_waitIndicator_load();
    },
  },
  "promise/wait-indicator-async-await": {
    topic: "Promise",
    name: "Wait indicator (async/await)",
    load: () => {
      promise_waitIndicatorAsyncAwait_load();
    },
  },
};

const projectDemoSelectorKey = Object.keys(projectListLocal)[0];

function getProjectItemPathOrDefault(
  key: string,
  currentPath?: string
): string {
  return currentPath ? currentPath : `?project=${encodeURIComponent(key)}`;
}

function getProjectKeyURIComponent(key: string) {
  const projectKeyMatch = key.match(/(\/)?([^/]*)$/);

  if (!projectKeyMatch) {
    throw new Error(
      "The project key may contain invalid characters, or this is a bug!"
    );
  }
  const projectKeyLastSlash = projectKeyMatch[1];
  const projectKeyName = projectKeyMatch[2];
  const projectKeyURIComponent = key.replace(
    projectKeyMatch[0],
    `${projectKeyLastSlash ? "/" : ""}project-${encodeURIComponent(
      projectKeyName
    )}`
  );
  return projectKeyURIComponent;
}

function getCodeURLPathOrDefault(
  codeURLRoot: string,
  key: string,
  codeFileExtension: string,
  codeURL?: string
): string {
  if (codeURL && codeURL.length > 0) {
    return codeURL;
  }

  return `${codeURLRoot}/${getProjectKeyURIComponent(
    key
  )}.${codeFileExtension}`;
}

export function getProjectList(
  data: ProjectListLocal = projectListLocal,
  codeURLRoot = "https://github.com/lightmotive/learn-javascript/blob/master/src",
  codeFileExtension = "ts"
): ProjectList {
  /*
    Object.fromEntries is not supported in older browsers. If there's an older browser support
      requirement, consider adding the NPM package object.fromentries.

    Other packages, like https://www.npmjs.com/package/fromentries, drop older browser
      support, enabling a much smaller package size.
  */

  const entries = Object.entries(data).map(([key, val]) => {
    const projectItem = val as ProjectItem;

    projectItem.path = getProjectItemPathOrDefault(key, val.path);

    projectItem.codeURL = getCodeURLPathOrDefault(
      codeURLRoot,
      key,
      codeFileExtension,
      val.codeURL
    );

    return [key, projectItem];
  });

  return Object.fromEntries(entries);
}
