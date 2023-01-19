import type { PromiseExtended } from 'dexie'
import { TaskState } from './task'
import { getDB } from '@/db'
import type { ProjectTable, TaskTable } from '@/db/types'

export interface Repository {
  loadProjects: () => Promise<ProjectTable[]>
  getTasks: (projectId: number) => Promise<TaskTable[]>
  getAllTasks: () => Promise<TaskTable[]>
  findTasksByState: (state: TaskState) => Promise<TaskTable[]>
  addTask: (
    title: string,
    content: string,
    state: TaskState,
    projectId: number
  ) => void
  updateTask: (id: number, changes: any) => void

  addProject: (name: string) => PromiseExtended<number>
}

export const dbRepository: Repository = {
  addProject(name: string) {
    return getDB().projects.add({ name })
  },

  async loadProjects() {
    return getDB().projects.toArray()
  },

  async getTasks(projectId: number) {
    return getDB().tasks
      .filter((task) => {
        return task.projectId === projectId && task.state === TaskState.ACTIVE
      })
      .toArray()
  },

  async getAllTasks() {
    return getDB().tasks.toArray()
  },

  async findTasksByState(state: TaskState) {
    return getDB().tasks
      .filter((task) => {
        return task.state === state
      })
      .toArray()
  },

  addTask(
    title: string,
    content: string,
    state = TaskState.ACTIVE,
    projectId: number,
  ) {
    return getDB().tasks.add({
      title,
      content,
      projectId,
      state,
    })
  },

  async updateTask(id: number, changes = {}) {
    return getDB().tasks.update(id, changes)
  },
}
