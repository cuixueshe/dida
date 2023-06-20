import { CommandGoToHome } from './CommandGoToHome'
import { CommandGoToSettingsTheme } from './CommandGotoSettingsTheme'
export interface Command {
  name: string
  execute: () => void
}

let commands: Command[] = []

export function useCommand() {
  function initCommands() {
    commands.push(new CommandGoToHome())
    commands.push(new CommandGoToSettingsTheme())
  }

  function resetCommand() {
    commands = []
  }

  function addCommand(command: Command) {
    commands.push(command)
  }

  return {
    commands,
    initCommands,
    resetCommand,
    addCommand,
  }
}
