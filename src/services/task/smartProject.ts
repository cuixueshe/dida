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
  name: SmartProjectNames.Complete
}

interface TrashProject extends Project {
  name: SmartProjectNames.Trash
}

interface FailedProject extends Project {
  name: SmartProjectNames.Failed
}

interface AbstractProject extends Project {
  name: SmartProjectNames.Abstract
}

export const trashProject = createSmartProject(SmartProjectNames.Trash) as TrashProject
export const completedSmartProject = createSmartProject(SmartProjectNames.Complete) as CompletedSmartProject
export const failedProject = createSmartProject(SmartProjectNames.Failed) as FailedProject
export const abstractProject = createSmartProject(SmartProjectNames.Abstract) as AbstractProject

export const smartProjects = {
  [SmartProjectNames.Complete]: completedSmartProject,
  [SmartProjectNames.Trash]: trashProject,
  [SmartProjectNames.Failed]: failedProject,
  [SmartProjectNames.Abstract]: abstractProject,

}

export function createSmartProject(smartProjectName: string) {
  return {
    name: smartProjectName,
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
