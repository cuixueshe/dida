import { http } from './http'
import type { Task } from '@/store'
import { TaskStatus } from '@/store'

export function fetchAllTasks({ pId, status }: { pId?: string; status?: TaskStatus }) {
  return http.get('/tasks', {
    params: {
      projectId: pId,
      status,
    },
  })
}

export function fetchCreateTask(title: string, pId: string) {
  return http.post('/tasks', {
    title,
    projectId: pId,
  })
}

export function fetchUpdateTaskTitle(taskId: Task['id'], title: string) {
  return http.patch(`/tasks/${taskId}`, {
    title,
  })
}
export function fetchUpdateTaskContent(taskId: Task['id'], content: string) {
  return http.patch(`/tasks/${taskId}`, {
    content,
  })
}

export function fetchCompleteTask(taskId: Task['id']) {
  return http.patch(`/tasks/${taskId}`, {
    status: TaskStatus.COMPLETED,
  })
}

export function fetchRestoreTask(taskId: Task['id']) {
  return http.patch(`/tasks/${taskId}`, {
    status: TaskStatus.ACTIVE,
  })
}

export function fetchMoveTaskToProject(taskId: Task['id'], projectId: string) {
  return http.patch(`/tasks/${taskId}`, {
    projectId,
  })
}

export function fetchRemoveTask(taskId: Task['id']) {
  return http.patch(`/tasks/${taskId}`, {
    status: TaskStatus.REMOVED,
  })
}

export function fetchUpdateTaskPosition(taskId: Task['id'], position: number) {
  return http.patch(`/tasks/${taskId}`, {
    position,
  })
}
