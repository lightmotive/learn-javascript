import { Project } from "./project";
import { ProjectManager, ProjectItem } from "./ProjectManager";
import { projectDemoData } from "./project-demo-data";
import { ProjectManagerDefault } from "./ProjectManagerDefault";

export class ProjectDemoSelector implements Project {
  constructor(private projectManager: ProjectManager) {}

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

    Object.values(this.projectManager.getProjects()).forEach((proj) => {
      ({ currentTopicContent, currentListElement } = this.getListElement(
        proj,
        currentTopicContent,
        currentListElement
      ));
      const listItem = document.createElement("li");
      listItem.appendChild(this.getProjectDemoLinkElement(proj));
      const codeSeparatorSpan = document.createElement("span");
      codeSeparatorSpan.innerText = " - ";
      listItem.appendChild(codeSeparatorSpan);
      listItem.appendChild(this.getProjectCodeLinkElement(proj));
      currentListElement.appendChild(listItem);
    });
  }

  private getProjectDemoLinkElement(proj: ProjectItem) {
    const link = document.createElement("a");
    link.href = proj.path;
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
  new ProjectDemoSelector(new ProjectManagerDefault(projectDemoData)).render();
}

export { LoadProject as projectDemoSelector_load };
