import { useRouter } from 'vue-router'
import { RouteNames } from '@/router/const'

export function useGoto() {
  const router = useRouter()

  function goToHome() {
    router.push({
      name: RouteNames.HOME,
    })
  }

  function goToSettings() {
    router.push({
      name: RouteNames.SETTINGS,
    })
  }

  return {
    goToHome,
    goToSettings,
  }
}

export const GITHUB_URL = 'https://github.com/cuixueshe/dida'
export function openGithub() {
  window.open(GITHUB_URL)
}
