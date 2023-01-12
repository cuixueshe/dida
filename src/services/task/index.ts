import { fetchData } from './data'
import { initProjects } from './project'
import { initSmartProject } from './smartProject'
export type{ Status } from './smartProject'
export { isSmartProject, findSmartProjectByName } from './smartProject'
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
export type { ListProject as Project } from './listProject'

initProjects(fetchData.listProjects)
initSmartProject()
