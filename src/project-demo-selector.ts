import {
  ProjectItem,
  getPathPrefix,
  getProjectPath,
  projectList,
} from "./project-list";

export class ProjectDemoSelector implements Project {
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
      listItem.appendChild(this.getProjectDemoLinkElement(pathPrefix, proj));
      let codeSeparatorSpan = document.createElement("span");
      codeSeparatorSpan.innerText = " - ";
      listItem.appendChild(codeSeparatorSpan);
      listItem.appendChild(this.getProjectCodeLinkElement(proj));
      currentListElement.appendChild(listItem);
    });
  }

  private getProjectDemoLinkElement(pathPrefix: string, proj: ProjectItem) {
    let link = document.createElement("a");
    link.href = getProjectPath(proj);
    link.target = "_top";
    link.innerHTML = proj.name;
    return link;
  }

  private getProjectCodeLinkElement(proj: ProjectItem) {
    let link = document.createElement("a");
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
      let topicHeader = document.createElement("h2");
      topicHeader.innerHTML = proj.topic;
      document.body.appendChild(topicHeader);
      currentListElement = document.createElement("ul");
      document.body.appendChild(currentListElement);
    }
    return { currentTopicContent: currentTopicContent, currentListElement };
  }
}

function LoadProject(): void {
  new ProjectDemoSelector(projectList).render();
}

export { LoadProject as projectDemoSelector_load };
