import type { ListProject } from './listProject'
import { initListProject } from './listProject'
import type { Task } from './task'
import { initTask } from './task'
import { dbRepository } from './dbRepository'
import { initSmartProject } from './smartProject'

export { SmartProjectNames, isSmartProject, initSmartProject } from './smartProject'
export { createListProject, addListProject, findListProjectByName } from './listProject'
export { findSmartProjectByName } from './smartProject'
export {
  TaskState,
  addTask,
  removeTask,
  restoreTask,
  completeTask,
  createTask,
  changeTaskTitle,
  changeTaskContent,
  loadTasks,
  loadAllTasksNotRemoved,
  findTaskById,
} from './task'
export type { Task } from './task'
export type { Project } from './listProject'
export type { SmartProject } from './smartProject'
export { initListProject, loadProjects } from './listProject'

export function init(
  listProjectsReactive: ListProject[],
  tasksReactive: Task[],
) {
  initListProject(listProjectsReactive, dbRepository)
  initSmartProject(dbRepository)
  initTask(tasksReactive, dbRepository)
}
