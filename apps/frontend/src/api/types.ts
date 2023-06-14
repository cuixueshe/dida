import type { TaskStatus } from '@/store/tasks'

export interface TaskResponse {
  title: string
  content: string
  status: TaskStatus
  projectId: string
  position: number
  _id: string
  created_at: string
  updated_at: string
}

export interface ProjectResponse {
  created_at: string
  name: string
  updated_at: string
  _id: string
}
