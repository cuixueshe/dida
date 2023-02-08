import type { ListProject } from './listProject'
import type { Tag } from './listTag'
import { initListTag } from './listTag'
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
  moveTask,
  completeTask,
  createTask,
  changeTaskTitle,
  changeTaskContent,
  loadTasks,
  findAllTasksNotRemoved,
  findTaskById,
  updateTaskIndex,
} from './task'
export type { Task } from './task'
export type { Project } from './listProject'
export type { SmartProject } from './smartProject'
export { initListProject, loadProjects } from './listProject'
export { addListTag, createListTag, updateListTag, loadTags, deleteListTag } from './listTag'

export function init(
  listProjectsReactive: ListProject[],
  tasksReactive: Task[],
  listTagReactive: Tag[],
) {
  initListProject(listProjectsReactive, dbRepository)
  initListTag(listTagReactive, dbRepository)
  initSmartProject(dbRepository)
  initTask(tasksReactive, dbRepository)
}
