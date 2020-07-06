import { ProjectList, projectSelector_load } from "./project-selector";
import { promise_waitIndicator_load } from "./promise/project-wait-indicator";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  const params = new URLSearchParams(window.location.search);

  switch (params.get("project")) {
    case "promise/wait-indicator":
      promise_waitIndicator_load();
      break;
    default:
      projectSelector_load();
      break;
  }
});
