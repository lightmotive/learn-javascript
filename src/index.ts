import loadjs from "loadjs";
import { promise_waitIndicator_load } from "./promise/wait-indicator";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  const params = new URLSearchParams(window.location.search);

  if (params.has("project")) {
    let project = params.get("project") as string;

    switch (project) {
      case "promise_wait-indicator":
        promise_waitIndicator_load();
        break;
      default:
        break;
    }
  }
});
