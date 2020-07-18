import { projectDemoData } from "./project-demo-data";
import { ProjectManagerDefault } from "./ProjectManagerDefault";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  const params = new URLSearchParams(window.location.search);

  new ProjectManagerDefault(projectDemoData).loadProjectByKey(
    params.get("project")
  );
});
