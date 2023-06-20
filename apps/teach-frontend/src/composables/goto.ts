import { useRouter } from 'vue-router'
import { RouteNames } from '@/router/const'

export function useGoto() {
  const router = useRouter()

  function gotoHome() {
    router.push({
      name: RouteNames.HOME,
    })
  }

  function gotoSettings() {
    router.push({
      name: RouteNames.SETTINGS,
    })
  }

  function gotoSettingsTheme() {
    router.push({
      name: RouteNames.SETTINGS_THEME,
    })
  }

  return {
    gotoHome,
    gotoSettings,
    gotoSettingsTheme,
  }
}

export const GITHUB_URL = 'https://github.com/cuixueshe/dida'
export function openGithub() {
  window.open(GITHUB_URL)
}
