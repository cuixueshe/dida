import { nanoid } from 'nanoid'
import type { Project } from './project'

export interface Task {
  id: string
  title: string
  content: string
  project?: Project
}

export function createTask(title: string, id: string = nanoid()): Task {
  return {
    id,
    title,
    content: '',
  }
}
