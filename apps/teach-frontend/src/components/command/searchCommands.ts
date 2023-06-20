import Fuse from 'fuse.js'
import { ref } from 'vue'
import type { Command } from '@/composables/command'
import { useCommand } from '@/composables/command'

const filteredCommands = ref<Command[]>([])
const fuse = new Fuse([] as Command[], {
  keys: ['name'],
})

export function useSearchCommands() {
  const { commands } = useCommand()

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
