import {
  ProjectManager,
  ProjectData,
  Projects,
  ProjectItem,
} from "./ProjectManager";

export class ProjectManagerDefault implements ProjectManager {
  constructor(
    private data: ProjectData,
    private defaultProjectKey: string = "",
    private defaultCodeURLRoot = "https://github.com/lightmotive/learn-javascript/blob/master/src",
    private defaultCodeFileExtension = "ts"
  ) {
    if (defaultProjectKey === "") {
      this.defaultProjectKey = Object.keys(this.data)[0];
    }
  }

  private getProjectItemPathOrDefault(
    key: string,
    currentPath?: string
  ): string {
    return currentPath ? currentPath : `?project=${encodeURIComponent(key)}`;
  }

  private getProjectKeyURIComponent(key: string) {
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

  private getCodeURLPathOrDefault(
    codeURLRoot: string,
    key: string,
    codeFileExtension: string,
    codeURL?: string
  ): string {
    if (codeURL && codeURL.length > 0) {
      return codeURL;
    }

    return `${codeURLRoot}/${this.getProjectKeyURIComponent(
      key
    )}.${codeFileExtension}`;
  }

  getProjects(): Projects {
    /*
        Object.fromEntries is not supported in older browsers. If there's an older browser support
          requirement, consider adding the NPM package object.fromentries.
    
        Other packages, like https://www.npmjs.com/package/fromentries, drop older browser
          support, enabling a much smaller package size.
      */

    const entries = Object.entries(this.data).map(([key, val]) => {
      const projectItem = val as ProjectItem;

      projectItem.path = this.getProjectItemPathOrDefault(key, val.path);

      projectItem.codeURL = this.getCodeURLPathOrDefault(
        this.defaultCodeURLRoot,
        key,
        this.defaultCodeFileExtension,
        val.codeURL
      );

      return [key, projectItem];
    });

    return Object.fromEntries(entries);
  }

  findProjectByKey(key: string | null | undefined): ProjectItem {
    if (!key) {
      return this.findProjectByKey(this.defaultProjectKey);
    }
    const project = this.getProjects()[key.toLowerCase()];
    if (!project) {
      return this.findProjectByKey(this.defaultProjectKey);
    }
    return project;
  }

  loadProjectByKey(key: string | null | undefined): void {
    this.findProjectByKey(key).load();
  }

  launchProjectByKey(key: string | null | undefined): void {
    const project = this.findProjectByKey(key);
    if (!project) {
      return this.launchProjectByKey(this.defaultProjectKey);
    }
    this.setWindowLocationHref(project.path);
  }

  private setWindowLocationHref(path: string): void {
    window.location.href = path;
  }
}
