import { fetchData } from './data'
import { initProjects } from './project'
export { useTaskStore } from './useTaskStore'
export { TaskState } from './task'
export { SpecialProjectNames } from './project'
export type { Task } from './task'
export type { Project } from './project'

initProjects(fetchData)
