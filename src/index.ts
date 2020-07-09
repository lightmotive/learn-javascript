import { loadProjectByKey } from "./project-list";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  const params = new URLSearchParams(window.location.search);

  loadProjectByKey(params.get("project"));
});
