import { defineStore } from 'pinia'
import { TaskStatus } from './tasks'
import { fetchAllTasks } from '@/api'
import { useTasksSelectorStore } from '@/store'

export interface SmartProject {
  name: string
  type: 'smartProject'
}

function createSmartProject(name: string): SmartProject {
  return {
    name,
    type: 'smartProject',
  }
}

export enum SmartProjectName {
  Complete = '已完成',
  Trash = '垃圾桶',
}
export const completeSmartProject = createSmartProject(SmartProjectName.Complete)
export const trashSmartProject = createSmartProject(SmartProjectName.Trash)
export const smartProjects = [completeSmartProject, trashSmartProject]

export const useSmartProjects = defineStore('smartProjects', () => {
  const tasksSelectorStore = useTasksSelectorStore()

  function selectProject(projectName: SmartProjectName) {
    if (projectName === SmartProjectName.Complete)
      tasksSelectorStore.setCurrentSelector(completeSmartProject)

    else if (projectName === SmartProjectName.Trash)
      tasksSelectorStore.setCurrentSelector(trashSmartProject)
  }

  return {
    selectProject,
  }
})

export async function loadSmartProjectTasks(smartProjectName: string) {
  const status = smartProjectName === '已完成' ? TaskStatus.COMPLETED : TaskStatus.REMOVED
  const rawTasks = await fetchAllTasks({
    status,
  })
  return rawTasks
}
