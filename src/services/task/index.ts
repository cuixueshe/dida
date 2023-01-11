import { fetchData } from './data'
import { initProjects } from './project'
import { initCompletedSmartProject } from './smartProject'
export { SmartProjectNames } from './smartProject'
export { projects, findProjectByName } from './project'
export {
  TaskState,
  addTask,
  removeTask,
  restoreTask,
  completeTask,
  createTask,
} from './task'
export type { Task } from './task'
export type { Project } from './project'

initProjects(fetchData.projects)
initCompletedSmartProject(fetchData.completed)
