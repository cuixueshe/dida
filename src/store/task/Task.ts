import type { Project } from './Project'
import { TaskState } from './const'
export class Task {
  public title: string
  id: string
  content: string
  project: Project
  state: TaskState = TaskState.ACTIVE
  previousProject?: Project | null
  previousState?: TaskState | null
  constructor(title: string, content: string, project: Project, id: string, state = TaskState.ACTIVE) {
    this.title = title
    this.content = content
    this.project = project
    this.state = state
    this.id = id
  }

  setState(state: TaskState) {
    this.previousState = this.state
    this.state = state
  }

  addToProject(project: Project) {
    this.project.removeTask(this)

    this.previousProject = this.project
    this.project = project

    this.project.addTask(this)
  }

  restore() {
    if (this.previousProject) {
      this.state = this.previousState!
      this.addToProject(this.previousProject)
      this.previousState = null
      this.previousProject = null
    }
  }

  getId() {
    return this.id
  }
}
