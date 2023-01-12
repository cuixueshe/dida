import type { FetchProjectData, Project } from './project'
import { findProjectByName } from './project'
import { TaskState, addTask, createTask } from './task'

export enum SmartProjectNames {
  Complete = '已完成',
  Trash = '垃圾桶',
  Failed = '已放弃',
  Abstract = '摘要',
}

// 智能列表
interface CompletedSmartProject extends Project {
  name: '已完成'
}

interface TrashProject extends Project {
  name: '垃圾桶'
}

interface FailedProject extends Project {
  name: '已放弃'
}

interface AbstractProject extends Project {
  name: '摘要'
}

export const trashProject = createTrashProject()
export const completedSmartProject = createCompletedSmartProject()
export const failedSmartProject = createFailedSmartProject()
export const abstractProject = createAbstractProject()

export function createCompletedSmartProject(): CompletedSmartProject {
  return {
    name: '已完成',
    tasks: [],
  }
}

export function createTrashProject(): TrashProject {
  return {
    name: '垃圾桶',
    tasks: [],
  }
}

export function createFailedSmartProject(): FailedProject {
  return {
    name: '已放弃',
    tasks: [],
  }
}

export function createAbstractProject(): AbstractProject {
  return {
    name: '摘要',
    tasks: [],
  }
}

export function initCompletedSmartProject({ tasks }: FetchProjectData) {
  completedSmartProject.tasks = []

  tasks.reverse().forEach(({ id, title, content, previousProjectName }) => {
    const task = createTask(title, id, content)
    task.previousProject = findProjectByName(previousProjectName)
    addTask(task, completedSmartProject)
    task.state = TaskState.COMPLETED
  })
}

const smartProjects = {
  [SmartProjectNames.Complete]: completedSmartProject,
  [SmartProjectNames.Trash]: trashProject,
  [SmartProjectNames.Failed]: failedSmartProject,
  [SmartProjectNames.Abstract]: abstractProject,
}

export function findSmartProjectByName(name: string) {
  return smartProjects[name as keyof typeof smartProjects]
}
