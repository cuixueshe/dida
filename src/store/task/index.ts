import { fetchData } from './data'
import { initProjects } from './project'
export { useTaskStore } from './useTaskStore'
export { useStatusStore } from './status'
export { TaskState } from './task'
export { SpecialProjectNames } from './project'
export type { Task } from './task'
export type { Project } from './project'

initProjects(fetchData)
