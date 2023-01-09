import { fetchData } from './data'
import { initProjects } from './project'
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
// TODO
// 初始化 smartProjects  现在是直接初始化了
