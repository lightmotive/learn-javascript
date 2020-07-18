import chai from "chai";
import spies from "chai-spies";
import { expect } from "chai";
import "mocha";
import { ProjectData } from "./ProjectManager";
import { ProjectManagerDefault } from "./ProjectManagerDefault";

chai.use(spies);

const projectDataMock: ProjectData = {
  p1: {
    topic: "Topic",
    name: "Project 1",
    load: () => {
      console.log("Project 1 Loaded");
    },
  },
  "topic/p.2": {
    topic: "Topic",
    name: "Project 2",
    load: () => {
      console.log("Project 2 Loaded");
    },
  },
  "topic/sub-topic/p+3": {
    topic: "Topic / Sub-topic",
    name: "Project 3",
    load: () => {
      console.log("Project 3 Loaded");
    },
  },
  "custom-topic": {
    topic: "Custom",
    name: "Project 4",
    load: () => {
      console.log("Project 4 Loaded");
    },
    path: "https://tempuri.org/customPath",
    codeURL: "https://tempuri.org/customCodeURL",
  },
};

describe("ProjectManager", () => {
  const defaultCodeURLRoot = "https://tempuri.org";
  const defaultCodeFileExtension = "ts";

  const projectManager = new ProjectManagerDefault(
    projectDataMock,
    "",
    defaultCodeURLRoot,
    defaultCodeFileExtension
  );

  before(function () {
    chai.spy.on(projectManager, "setWindowLocationHref", (): void => {
      return;
    });
    chai.spy.on(projectDataMock["topic/sub-topic/p+3"], "load", (): void => {
      return;
    });
  });

  const projectEntries = Object.entries(projectManager.getProjects());

  describe("getProjects", () => {
    it("should provide all entries", () => {
      expect(Object.keys(projectEntries).length).to.equal(
        Object.keys(projectDataMock).length
      );
    });
    it("should provide correct values for project without topic path", () => {
      expect(projectEntries[0][1].path).to.equal(`?project=p1`);
      expect(projectEntries[0][1].codeURL).to.equal(
        `${defaultCodeURLRoot}/project-p1.ts`
      );
    });
    it("should provide correct values for project with topic path", () => {
      expect(projectEntries[1][1].path).to.equal(`?project=topic%2Fp.2`);
      expect(projectEntries[1][1].codeURL).to.equal(
        `${defaultCodeURLRoot}/topic/project-p.2.ts`
      );
    });
    it("should provide correct values for project with topic path and sub-path", () => {
      expect(projectEntries[2][1].path).to.equal(
        `?project=topic%2Fsub-topic%2Fp%2B3`
      );
      expect(projectEntries[2][1].codeURL).to.equal(
        `${defaultCodeURLRoot}/topic/sub-topic/project-p%2B3.ts`
      );
    });
    it("should provide correct values for project with custom path and codeURL", () => {
      expect(projectEntries[3][1].path).to.equal(
        `https://tempuri.org/customPath`
      );
      expect(projectEntries[3][1].codeURL).to.equal(
        `https://tempuri.org/customCodeURL`
      );
    });
  });

  describe("findProjectByKey", () => {
    it("should provide default project when key is not found", () => {
      expect(projectManager.findProjectByKey("").name).to.equal("Project 1");
    });
    it("should find project by key", () => {
      expect(projectManager.findProjectByKey("topic/p.2").name).to.equal(
        "Project 2"
      );
    });
  });

  describe("launchProjectByKey", () => {
    it("should have called setWindowLocationHref with project path", () => {
      const launchSpy = projectManager["setWindowLocationHref"];
      expect(launchSpy).to.be.spy;

      projectManager.launchProjectByKey("custom-topic");

      expect(launchSpy).to.have.been.called.with(
        projectManager.findProjectByKey("custom-topic").path
      );
    });
  });

  describe("loadProjectByKey", () => {
    it("should have called Project 3 load()", () => {
      const loadSpy = projectDataMock["topic/sub-topic/p+3"].load;
      expect(loadSpy).to.be.spy;

      projectManager.loadProjectByKey("topic/sub-topic/p+3");

      expect(loadSpy).to.have.been.called();
    });
  });
});
