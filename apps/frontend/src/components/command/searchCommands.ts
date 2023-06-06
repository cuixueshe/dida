import Fuse from 'fuse.js'
import { ref } from 'vue'

interface Command {
  id: number
  name: string
  execute: (...args: any[]) => void
}

export const commands: Command[] = [
  {
    id: 0,
    name: '切换皮肤',
    execute: (goto) => {
      goto.gotoSettingsTheme()
    },
  },
  {
    id: 1,
    name: '前往主页',
    execute: (goto) => {
      goto.gotoHome()
    },
  },
]

// 默认显示所有的命令
export const filteredCommands = ref<Command[]>(commands)
const fuse = new Fuse(commands, {
  keys: ['name'],
})

export function searchCommands(input: string) {
  if (!input)
    return
  filteredCommands.value = fuse.search(input).map(i => i.item)
}

export function resetSearchCommands() {
  filteredCommands.value = commands
}
