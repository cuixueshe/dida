import { CommandGoToHome } from './CommandGoToHome'
import { CommandGoToSettingsTheme } from './CommandGotoSettingsTheme'
export interface Command {
  name: string
  execute: () => void
}

const commands: Command[] = []

export function useCommand() {
  function initCommands() {
    commands.push(new CommandGoToHome())
    commands.push(new CommandGoToSettingsTheme())
  }

  return {
    commands,
    initCommands,
  }
}
