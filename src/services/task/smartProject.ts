import type { FetchListProjectData, ListProject } from './listProject'
import { findListProjectByName } from './listProject'
import { TaskState, addTask, createTask } from './task'

export enum SmartProjectNames {
  Complete = '已完成',
  Trash = '垃圾桶',
  Failed = '已放弃',
  Abstract = '摘要',
}

// 智能列表
interface CompletedSmartProject extends ListProject {
  name: '已完成'
}

interface TrashProject extends ListProject {
  name: '垃圾桶'
}

interface FailedProject extends ListProject {
  name: '已放弃'
}

interface AbstractProject extends ListProject {
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

export function initCompletedSmartProject({ tasks }: FetchListProjectData) {
  completedSmartProject.tasks = []

  tasks.reverse().forEach(({ id, title, content, previousProjectName }) => {
    const task = createTask(title, id, content)
    task.previousProject = findListProjectByName(previousProjectName)
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
