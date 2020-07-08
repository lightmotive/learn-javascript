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

function LoadProject(): void {
  new ProjectDemoSelector(projectList).render();
}

export { LoadProject as projectDemoSelector_load };
