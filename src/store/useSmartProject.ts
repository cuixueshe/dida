import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { SmartProjectsType } from '@/services/task/smartProject'
import { smartProjects, toggleStatus } from '@/services/task/smartProject'

export const useSmartProjectStore = defineStore('smartProjectStore', () => {
  const smartProjectList = ref<SmartProjectsType>(smartProjects)
  const checkVisible = (item: SmartProjectsType[keyof SmartProjectsType]) => {
    if (item.status === 'SHOW_WHEN_THERE_IS_CONTENT' && item.tasks.length !== 0)
      return true
    return item.status === 'SHOW'
  }
  return {
    checkVisible,
    toggleStatus,
    smartProjectList,
  }
})
