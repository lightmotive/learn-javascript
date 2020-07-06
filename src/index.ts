import loadjs from "loadjs";
import { promise_waitIndicator_load } from "./promise/wait-indicator";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  const params = new URLSearchParams(window.location.search);

  let project = "";
  if (params.has("project")) {
    project = params.get("project") as string;

    switch (project) {
      case "promise_wait-indicator":
        promise_waitIndicator_load();
        break;
      default:
        break;
    }
  }
});
