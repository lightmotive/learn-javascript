import { promise_waitIndicator_load } from "./promise/project-wait-indicator";

interface ProjectItem {
  key: string;
  topic: string;
  name: string;
  path: string;
  load: () => void;
}

var projectList: ProjectItem[] = [
  {
    key: "promise/wait-indicator",
    topic: "Promise",
    name: "Wait Indicator",
    path: "?project=promise%2Fwait-indicator",
    load: () => {
      promise_waitIndicator_load();
    },
  },
];

class ProjectDocument implements Project {
  constructor(private projectList: ProjectItem[]) {}

  render() {
    this.initializeBody();
    this.initializeProjects();
  }

  private initializeBody() {
    let title = document.createElement("h1");
    title.innerText = "Project Demos";
    document.body.appendChild(title);
  }

  private initializeProjects() {
    let currentTopicContent = "";
    let currentListElement: HTMLUListElement;
    let pathPrefix = getPathPrefix();

    this.projectList.forEach((proj) => {
      ({ currentTopicContent, currentListElement } = this.getListElement(
        proj,
        currentTopicContent,
        currentListElement
      ));
      let listItem = document.createElement("li");
      listItem.appendChild(this.getProjectLinkElement(pathPrefix, proj));
      currentListElement.appendChild(listItem);
    });
  }

  private getProjectLinkElement(pathPrefix: string, proj: ProjectItem) {
    let projectLink = document.createElement("a");
    projectLink.href = getProjectPath(proj);
    projectLink.target = "_top";
    projectLink.innerHTML = proj.name;
    return projectLink;
  }

  private getListElement(
    proj: ProjectItem,
    currentTopicContent: string,
    currentListElement: HTMLUListElement
  ) {
    if (proj.topic !== currentTopicContent) {
      currentTopicContent = proj.topic;
      let topicHeader = document.createElement("h2");
      topicHeader.innerHTML = proj.topic;
      document.body.appendChild(topicHeader);
      currentListElement = document.createElement("ul");
      document.body.appendChild(currentListElement);
    }
    return { currentTopicContent: currentTopicContent, currentListElement };
  }
}

function getPathPrefix() {
  // if (window.location.hostname.indexOf("github.io") !== -1) {
  //   return "dist";
  // }
  return "";
}

function getProjectPath(project: ProjectItem) {
  return `${getPathPrefix()}${project.path}`;
}

function LoadProjectSelector(): void {
  new ProjectDocument(projectList).render();
}

function LoadProjectByKey(key: string): void {
  let project = projectList.find((proj) => {
    return proj.key.toLowerCase() === key.toLowerCase();
  });
  if (project) {
    window.location.href = getProjectPath(project);
    return;
  }
  LoadProjectSelector();
}

export {
  LoadProjectSelector as projectSelector_load,
  LoadProjectByKey,
  projectList as ProjectList,
};
