import { fetchData } from './data'
import { initProjects } from './project'
export { TaskState, createTask, restoreTask } from './task'
export {
  projects,
  SpecialProjectNames,
  addTaskToCompleteProject,
  addTaskToProject,
  findProjectByName,
  removeTaskToTrashProject,
} from './project'
export type { Task } from './task'
export type { Project } from './project'

initProjects(fetchData)
