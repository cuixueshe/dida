import type { Task } from './Task'
import { TaskState } from '.'
export class Project {
  public name: string
  public tasks: Task[]
  public state: TaskState
  constructor(name: string, state: TaskState = TaskState.ACTIVE) {
    this.tasks = []
    this.name = name
    this.state = state
  }

  addTask(task: Task) {
    this.tasks.unshift(task)
    task.project = this
    task.state = this.state
  }

  removeTask(task: Task) {
    const index = this.tasks.indexOf(task)
    if (index !== -1) {
      this.tasks.splice(index, 1)
      task.previousProject = task.project
      task.project = undefined
    }
  }
}
