import { defineStore } from 'pinia'
import type { Router } from 'vue-router'
import Fuse from 'fuse.js'
import { ref } from 'vue'

interface CommandItem {
  id: number
  name: string
  handler: (...args: any[]) => void
}

const commands: CommandItem[] = [
  {
    id: 0,
    name: '切换皮肤',
    handler: (router: Router) => {
      router.push({
        name: 'SettingsTheme',
      })
    },
  },
  {
    id: 1,
    name: '前往主页',
    handler: (router: Router) => {
      router.push({
        path: '/',
      })
    },
  },
]

export const useCommandStore = defineStore('commandStore', () => {
  const searchCommands = ref<CommandItem[]>(commands)
  const fuse = new Fuse(commands, {
    keys: ['name'],
  })

  const handleSearch = (input: string) => {
    searchCommands.value = fuse.search(input).map(i => i.item)
  }
  const reset = () => {
    searchCommands.value = commands
  }

  return {
    commands,
    handleSearch,
    reset,
    searchCommands,
  }
})
