import { expect } from "chai";
import "mocha";
import { getProjectList, ProjectListLocal } from "./project-list";

const projectListLocalMock: ProjectListLocal = {
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

describe("project-list", () => {
  describe("getProjectList", () => {
    const codeURLRoot = "https://tempuri.org";
    const codeFileExtension = "ts";

    const projectList = getProjectList(
      projectListLocalMock,
      codeURLRoot,
      codeFileExtension
    );

    const projectEntries = Object.entries(projectList);

    it("should provide all items", () => {
      expect(Object.keys(projectList).length).to.equal(
        Object.keys(projectListLocalMock).length
      );
    });
    it("should provide correct values for project without topic path", () => {
      expect(projectEntries[0][1].path).to.equal(`?project=p1`);
      expect(projectEntries[0][1].codeURL).to.equal(
        `${codeURLRoot}/project-p1.ts`
      );
    });
    it("should provide correct values for project with topic path", () => {
      expect(projectEntries[1][1].path).to.equal(`?project=topic%2Fp.2`);
      expect(projectEntries[1][1].codeURL).to.equal(
        `${codeURLRoot}/topic/project-p.2.ts`
      );
    });
    it("should provide correct values for project with topic path and sub-path", () => {
      expect(projectEntries[2][1].path).to.equal(
        `?project=topic%2Fsub-topic%2Fp%2B3`
      );
      expect(projectEntries[2][1].codeURL).to.equal(
        `${codeURLRoot}/topic/sub-topic/project-p%2B3.ts`
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
});
