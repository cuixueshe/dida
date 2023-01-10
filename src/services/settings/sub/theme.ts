import { useThemeStore } from '@/store'

let store: ReturnType<typeof useThemeStore>

// To avoid using store before initializing Pinia.
const getThemeStore = () => {
  if (!store)
    store = useThemeStore()
  return store
}

export enum Theme {
  Dark = 'Dark',
  Light = 'Light',
}

export interface ThemeItem {
  label: string
  name: Theme
  color: string
  handler: () => void
}

export const Themes: ThemeItem[] = [
  {
    label: '亮色',
    name: Theme.Light,
    color: '#f3f4f6',
    handler: () => getThemeStore().toggleDark(false),
  },
  {
    label: '暗色',
    name: Theme.Dark,
    color: '#18181c',
    handler: () => getThemeStore().toggleDark(true),
  },
]
