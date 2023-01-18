import type { PromiseExtended } from 'dexie'
import { TaskState } from './task'
import { getDB } from '@/db'

export interface Task {
  id?: number
  title: string
  content: string
  projectId: number
  state: number
}

export interface Project {
  id?: number
  name: string
}

export interface Repository {
  loadProjects: () => Promise<Project[]>
  getTasks: (projectId: number) => Promise<Task[]>
  getAllTasks: () => Promise<Task[]>
  findTasksByState: (state: TaskState) => Promise<Task[]>
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
