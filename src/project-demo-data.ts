import { projectDemoSelector_load } from "./project-demo-selector";
import { promise_waitIndicator_load } from "./promise/project-wait-indicator";
import { promise_waitIndicatorAsyncAwait_load } from "./promise/project-wait-indicator-async-await";
import { iterator_basicIterator_load } from "./iterator/project-character-range";
import { ProjectData } from "./ProjectManager";

export const projectDemoData: ProjectData = {
  "demo-selector": {
    topic: "Associative array (map, dictionary)",
    name: "Project Demo Selector",
    load: (): void => {
      projectDemoSelector_load();
    },
  },
  "iterator/character-range": {
    topic: "Iterator",
    name: "Print character range",
    load: (): void => {
      iterator_basicIterator_load();
    },
  },
  "promise/wait-indicator": {
    topic: "Promise",
    name: "Wait indicator (single promise)",
    load: (): void => {
      promise_waitIndicator_load();
    },
  },
  "promise/wait-indicator-async-await": {
    topic: "Promise",
    name: "Wait indicator (async/await)",
    load: (): void => {
      promise_waitIndicatorAsyncAwait_load();
    },
  },
};
