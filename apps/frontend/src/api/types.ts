import type { TaskStatus } from '@/store/tasks'

export interface TaskResponse {
  title: string
  content: string
  status: TaskStatus
  projectId: string
  position: number
  _id: string
  createdAt: string
  updatedAt: string
}

export interface ProjectResponse {
  createdAt: string
  name: string
  updatedAt: string
  _id: string
}

export interface UserResponse {
  username: string
  token: string
}
