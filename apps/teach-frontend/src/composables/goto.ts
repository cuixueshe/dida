import { useRouter } from 'vue-router'

export function useGoto() {
  const router = useRouter()

  function gotoHome() {
    router.push({
      name: 'Home',
    })
  }

  function gotoSettings() {
    router.push({
      name: 'Settings',
    })
  }

  function gotoSettingsTheme() {
    router.push({
      name: 'SettingsTheme',
    })
  }

  function gotoGithub() {
    window.open('https://github.com/cuixueshe/dida')
  }

  return {
    gotoHome,
    gotoSettings,
    gotoGithub,
    gotoSettingsTheme,
  }
}
