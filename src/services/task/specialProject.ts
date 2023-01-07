import { TaskState } from './task'
import { createProject } from './project'

export enum SpecialProjectNames {
  Complete = '已完成',
  Trash = '垃圾桶',
  Failed = '已放弃',
  Abstract = '摘要',
}

export const completedProject = createProject(
  SpecialProjectNames.Complete,
  TaskState.COMPLETED,
)

// 初始化垃圾桶 project
export const trashProject = createProject(
  SpecialProjectNames.Trash,
  TaskState.REMOVED,
)

export const failedProject = createProject(
  SpecialProjectNames.Failed,
  TaskState.REMOVED,
)

export const abstractProject = createProject(
  SpecialProjectNames.Abstract,
  TaskState.REMOVED,
)

export function findSpecialProjectByName(projectName: string) {
  switch (projectName) {
    case SpecialProjectNames.Complete:
      return completedProject
    case SpecialProjectNames.Trash:
      return trashProject
    case SpecialProjectNames.Failed:
      return failedProject
    case SpecialProjectNames.Abstract:
      return abstractProject
  }
}
