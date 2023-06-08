import { TaskStatus } from '../const'

export class CreateTaskDto {
  title: string
  content: string
  status: TaskStatus
  projectId: string
}
