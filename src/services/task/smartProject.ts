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

interface FailedSmartProject extends Project {
  name: SmartProjectNames.Failed
}

interface AbstractSmartProject extends Project {
  name: SmartProjectNames.Abstract
}

export function createSmartProject(smartProjectName: string) {
  return {
    name: smartProjectName,
    tasks: [],
  }
}

export const trashProject = createSmartProject(SmartProjectNames.Trash) as TrashProject
export const failedSmartProject = createSmartProject(SmartProjectNames.Failed) as FailedSmartProject
export const abstractSmartProject = createSmartProject(SmartProjectNames.Abstract) as AbstractSmartProject
export const completedSmartProject = createSmartProject(SmartProjectNames.Complete) as CompletedSmartProject

export const smartProjects = {
  [SmartProjectNames.Complete]: completedSmartProject,
  [SmartProjectNames.Trash]: trashProject,
  [SmartProjectNames.Failed]: failedSmartProject,
  [SmartProjectNames.Abstract]: abstractSmartProject,
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
