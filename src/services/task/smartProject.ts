import type { Project } from './project'

export enum SmartProjectNames {
  Complete = '已完成',
  Trash = '垃圾桶',
  Failed = '已放弃',
  Abstract = '摘要',
}

// Cause every smart list might have different logic,
// we can't initialize them uniformly
interface SmartProjectComplete {
  name: SmartProjectNames.Complete
  tasks: []
}

interface SmartProjectTrash {
  name: SmartProjectNames.Trash
  tasks: []
}

interface SmartProjectFailed {
  name: SmartProjectNames.Failed
  tasks: []
}

interface SmartProjectAbstract {
  name: SmartProjectNames.Abstract
  tasks: []
}

const createSmartProject = (name: SmartProjectNames) => {
  // and in this function, we can use other factory function to create different smart project if needed.
  switch (name) {
    case SmartProjectNames.Complete:
      return {
        name,
        tasks: [],
      } as SmartProjectComplete
    case SmartProjectNames.Trash:
      return {
        name,
        tasks: [],
      } as SmartProjectTrash
    case SmartProjectNames.Failed:
      return {
        name,
        tasks: [],
      } as SmartProjectFailed
    case SmartProjectNames.Abstract:
      return {
        name,
        tasks: [],
      } as SmartProjectAbstract
  }
}

// 智能列表
export const smartProjects: Record<SmartProjectNames, Project> = {
  [SmartProjectNames.Complete]: createSmartProject(SmartProjectNames.Complete),
  [SmartProjectNames.Trash]: createSmartProject(SmartProjectNames.Trash),
  [SmartProjectNames.Failed]: createSmartProject(SmartProjectNames.Failed),
  [SmartProjectNames.Abstract]: createSmartProject(SmartProjectNames.Abstract),
}

export const smartProjectKeys = Object.keys(smartProjects)

export const resetSmartProjectByName = (name: SmartProjectNames) => {
  smartProjects[name].tasks = []
}
