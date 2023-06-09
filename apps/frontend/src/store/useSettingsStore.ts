import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'
import * as settingsService from '@/composables/settings'

export const useSettingsStore = defineStore('settingsStore', () => {
  const settingsSmartProjects = reactive(settingsService.smartProjects)

  const visibleSmartProjects = computed(() => {
    return settingsSmartProjects.filter((smartProject) => {
      return smartProject.option === settingsService.SmartProjectOptionValue.Visible
    })
  })

  return {
    settingsSmartProjects,
    visibleSmartProjects,

    setHideSmartProject: settingsService.setHideSmartProject,
  }
})
