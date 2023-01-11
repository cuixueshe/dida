import { getGlobalThemeStore } from '@/store'

export enum Theme {
  Dark = 'Dark',
  Light = 'Light',
}

interface ThemeItem {
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
    handler: () => getGlobalThemeStore().toggleDark(false),
  },
  {
    label: '暗色',
    name: Theme.Dark,
    color: '#18181c',
    handler: () => getGlobalThemeStore().toggleDark(true),
  },
]
