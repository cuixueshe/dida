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
