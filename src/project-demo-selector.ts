import { Project } from "./project";

import {
  ProjectItem,
  getPathPrefix,
  getProjectPath,
  getProjectList,
  ProjectList,
} from "./project-list";

export class ProjectDemoSelector implements Project {
  constructor(private projectList: ProjectList) {}

  render(): void {
    this.initializeBody();
    this.initializeProjects();
  }

  private initializeBody() {
    const title = document.createElement("h1");
    title.innerText = "Project Demos";
    document.body.appendChild(title);
  }

  private initializeProjects() {
    let currentTopicContent = "";
    let currentListElement: HTMLUListElement;

    Object.values(this.projectList).forEach((proj) => {
      ({ currentTopicContent, currentListElement } = this.getListElement(
        proj,
        currentTopicContent,
        currentListElement
      ));
      const listItem = document.createElement("li");
      listItem.appendChild(
        this.getProjectDemoLinkElement(getPathPrefix(), proj)
      );
      const codeSeparatorSpan = document.createElement("span");
      codeSeparatorSpan.innerText = " - ";
      listItem.appendChild(codeSeparatorSpan);
      listItem.appendChild(this.getProjectCodeLinkElement(proj));
      currentListElement.appendChild(listItem);
    });
  }

  private getProjectDemoLinkElement(pathPrefix: string, proj: ProjectItem) {
    const link = document.createElement("a");
    link.href = getProjectPath(proj);
    link.target = "_top";
    link.innerHTML = proj.name;
    return link;
  }

  private getProjectCodeLinkElement(proj: ProjectItem) {
    const link = document.createElement("a");
    link.href = proj.codeURL;
    link.target = "_blank";
    link.innerHTML = "Code";
    return link;
  }

  private getListElement(
    proj: ProjectItem,
    currentTopicContent: string,
    currentListElement: HTMLUListElement
  ) {
    if (proj.topic !== currentTopicContent) {
      currentTopicContent = proj.topic;
      const topicHeader = document.createElement("h2");
      topicHeader.innerHTML = proj.topic;
      document.body.appendChild(topicHeader);
      currentListElement = document.createElement("ul");
      document.body.appendChild(currentListElement);
    }
    return { currentTopicContent, currentListElement };
  }
}

function LoadProject(): void {
  new ProjectDemoSelector(getProjectList()).render();
}

export { LoadProject as projectDemoSelector_load };
