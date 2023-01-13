import { fetchData } from './data'
import { initListProjects } from './listProject'
import {
  initCompletedSmartProject,
  initTrashSmartProject,
} from './smartProject'

export { SmartProjectNames, isSmartProject } from './smartProject'
export {
  listProjects,
  findListProjectByName as findProjectByName,
} from './listProject'
export { findSmartProjectByName } from './smartProject'
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

initListProjects(fetchData.listProjects)
initCompletedSmartProject(fetchData.completed)
initTrashSmartProject(fetchData.trash)
