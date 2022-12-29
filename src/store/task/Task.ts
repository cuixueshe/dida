import { Project } from "./Project";
import { TaskState } from "./const";
export class Task {
  public title: string;
  content: string;
  project: Project;
  state: TaskState = TaskState.ACTIVE;
  previousProject?: Project | null;
  previousState?: TaskState | null;
  constructor(title: string, content: string, project: Project) {
    this.title = title;
    this.content = content;
    this.project = project;
  }

  setState(state: TaskState) {
    this.previousState = this.state;
    this.state = state;
  }

  addToProject(project: Project) {
    this.project.removeTask(this);

    this.previousProject = this.project;
    this.project = project;

    this.project.addTask(this);
  }

  restore() {
    if (this.previousProject) {
      this.state = this.previousState!;
      this.addToProject(this.previousProject);
      this.previousState = null;
      this.previousProject = null;
    }
  }
}
