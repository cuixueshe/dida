import { fetchData } from './data'
import { initProjects } from './project'
export { TaskState, createTask, restoreTask } from './task'
export {
  projects,
  addTaskToCompleteProject,
  addTaskToProject,
  findProjectByName,
  removeTaskToTrashProject,
} from './project'

export { SpecialProjectNames } from './specialProject'
export type { Task } from './task'
export type { Project } from './project'

initProjects(fetchData)
