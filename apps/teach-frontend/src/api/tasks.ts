import { http } from './http'
import type { TaskResponse } from './types'
import type { Task } from '@/store'
import { TaskStatus } from '@/store'

export function fetchAllTasks({ pId, status, sortBy }: { pId?: string; status?: TaskStatus; sortBy?: string }) {
  return http.get<TaskResponse[], TaskResponse[]>('/tasks', {
    params: {
      projectId: pId,
      status,
      sortBy,
    },
  })
}

export function fetchCreateTask(title: string, pId: string) {
  return http.post<TaskResponse, TaskResponse>('/tasks', {
    title,
    projectId: pId,
  })
}

export function fetchUpdateTaskTitle(taskId: Task['id'], title: string) {
  return http.patch<TaskResponse>(`/tasks/${taskId}`, {
    title,
  })
}
export function fetchUpdateTaskContent(taskId: Task['id'], content: string) {
  return http.patch<TaskResponse>(`/tasks/${taskId}`, {
    content,
  })
}

export function fetchCompleteTask(taskId: Task['id']) {
  return http.patch<TaskResponse>(`/tasks/${taskId}`, {
    status: TaskStatus.COMPLETED,
  })
}
export function fetchRestoreTask(taskId: Task['id']) {
  return http.patch<TaskResponse>(`/tasks/${taskId}`, {
    status: TaskStatus.ACTIVE,
  })
}

export function fetchMoveTaskToProject(taskId: Task['id'], projectId: string) {
  return http.patch<TaskResponse>(`/tasks/${taskId}`, {
    projectId,
  })
}

export function fetchRemoveTask(taskId: Task['id']) {
  return http.patch<TaskResponse>(`/tasks/${taskId}`, {
    status: TaskStatus.REMOVED,
  })
}

export function fetchUpdateTaskPosition(taskId: Task['id'], position: number) {
  return http.patch<TaskResponse>(`/tasks/${taskId}`, {
    position,
  })
}
