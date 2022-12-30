import { nanoid } from 'nanoid'
import type { Project } from './Project'
import { TaskState } from './const'

export class Task {
  public id = ''
  public title: string
  public content = ''
  public state: TaskState = TaskState.ACTIVE
  public project: Project | undefined
  public previousProject?: Project | null

  constructor(title: string, id: string = nanoid()) {
    this.title = title
    this.id = id
  }

  moveToProject(project: Project) {
    this.project?.removeTask(this)
    project.addTask(this)
  }

  restore() {
    if (this.previousProject)
      this.moveToProject(this.previousProject)
  }
}
