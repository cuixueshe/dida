import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ListProject, SmartProject } from '@/store'
import { loadListProjectTasks, loadSmartProjectTasks, useTasksStore } from '@/store'

export type TasksSelector = ListProject | SmartProject
export enum TasksSelectorType {
  listProject = 'listProject',
  smartProject = 'smartProject',
}

export const useTasksSelectorStore = defineStore('tasksSelectorStore', () => {
  const tasksStore = useTasksStore()

  const currentSelector = ref<TasksSelector>()

  async function updateTasks() {
    if (!currentSelector.value)
      return

    if (currentSelector.value.type === TasksSelectorType.listProject)
      tasksStore.updateTasks(await loadListProjectTasks(currentSelector.value.id))

    else if (currentSelector.value.type === TasksSelectorType.smartProject)
      tasksStore.updateTasks(await loadSmartProjectTasks(currentSelector.value.name))
  }

  async function setCurrentSelector(selector: TasksSelector) {
    currentSelector.value = selector
    await updateTasks()
  }

  return {
    currentSelector,
    setCurrentSelector,
  }
})
