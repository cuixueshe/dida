import { nanoid } from 'nanoid'
import type { Project } from './project'
import { addTaskToProject, removeTaskFromProject } from './project'

export enum TaskState {
  ACTIVE = 1,
  COMPLETED = 2,
  GIVE_UP = 3,
  REMOVED = 4,
}

export interface Task {
  id: string
  title: string
  content: string
  state: TaskState
  project?: Project
  previousProject?: Project
}

export function createTask(title: string, id: string = nanoid()): Task {
  return {
    id,
    title,
    content: '',
    state: TaskState.ACTIVE,
  }
}

export function restoreTask(task: Task) {
  const previousProject = task.previousProject!
  removeTaskFromProject(task, task.project!)
  addTaskToProject(task, previousProject)
}
