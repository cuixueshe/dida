import Fuse from 'fuse.js'
import { ref } from 'vue'
import type { Command } from '@/composables/command'
import { useCommand } from '@/composables/command'

const { commands } = useCommand()

const filteredCommands = ref<any[]>()
const fuse = new Fuse([] as Command[], {
  keys: ['name'],
})

export function useSearchCommands() {
  function searchCommands(input: string) {
    if (!input) {
      resetSearchCommands()
      return
    }

    fuse.setCollection(commands)
    filteredCommands.value = fuse.search(input).map(i => i.item)
  }

  function resetSearchCommands() {
    filteredCommands.value = commands
  }
  return {
    filteredCommands,
    searchCommands,
    resetSearchCommands,
  }
}
