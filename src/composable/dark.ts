import { useDark, useLocalStorage, usePreferredDark, useToggle } from '@vueuse/core'

export const isDark = useDark()
export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()

useLocalStorage('isDark', isDark)
