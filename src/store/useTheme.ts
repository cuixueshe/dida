import { defineStore } from 'pinia'
import { ref } from 'vue'
import { isDark } from '@/composable'
import { Theme, Themes } from '@/services/settings/sub'

export const useThemeStore = defineStore(
  'themeStore',
  () => {
    const currentThemeName = isDark.value ? Theme.Dark : Theme.Light
    const currentTheme = ref(Themes.find(item => item.name === currentThemeName))

    function changeTheme(theme: Theme) {
      const themeItem = Themes.find(item => item.name === theme)
      if (themeItem) {
        themeItem.handler()
        currentTheme.value = themeItem
      }
    }

    return {
      currentTheme,
      changeTheme,
    }
  },
)
