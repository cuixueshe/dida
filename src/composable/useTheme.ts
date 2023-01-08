import { computed } from 'vue'
import { useDark, useLocalStorage, useToggle } from '@vueuse/core'
import { darkTheme } from 'naive-ui'

export const isDark = useDark()
export const toggleDark = useToggle(isDark)
export const naiveTheme = computed(() => (isDark.value ? darkTheme : null))

useLocalStorage('isDark', isDark)
