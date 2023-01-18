import { TaskState } from './task'
import type { Repository } from './dbRepository'
import type { Project } from './listProject'

export interface SmartProject extends Project {}

export enum SmartProjectNames {
  Complete = '已完成',
  Trash = '垃圾桶',
  Failed = '已放弃',
  Abstract = '摘要',
}

let repository: Repository | undefined

export function initSmartProject(_repository: Repository) {
  repository = _repository
}

export const trashSmartProject = createTrashSmartProject()
export const completedSmartProject = createCompletedSmartProject()

function createCompletedSmartProject(): SmartProject {
  return {
    id: -1,
    name: SmartProjectNames.Complete,
    loadTasks() {
      return repository!.findTasksByState(TaskState.COMPLETED)
    },
  }
}

function createTrashSmartProject(): SmartProject {
  return {
    id: -2,
    name: SmartProjectNames.Trash,
    loadTasks() {
      return repository!.findTasksByState(TaskState.REMOVED)
    },
  }
}

const smartProjects = {
  [SmartProjectNames.Complete]: completedSmartProject,
  [SmartProjectNames.Trash]: trashSmartProject,
}

export function findSmartProjectByName(name: string) {
  return smartProjects[name as keyof typeof smartProjects]
}

export function isSmartProject(projectName: string) {
  return !!smartProjects[projectName as keyof typeof smartProjects]
}
