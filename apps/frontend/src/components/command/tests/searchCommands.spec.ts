import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { useSearchCommands } from '../searchCommands'
import { useCommand } from '@/composables/command'

describe('SearchCommands', () => {
  beforeAll(() => {
    const { addCommand } = useCommand()

    const mockCommand = {
      name: '前往主页',
      execute() {},
    }

    addCommand(mockCommand)
  })

  afterAll(() => {
    const { resetCommand } = useCommand()
    resetCommand()
  })

  it('Should search for the go to home command', () => {
    const { searchCommands, filteredCommands } = useSearchCommands()
    searchCommands('前往主页')

    expect(filteredCommands.value.length).toBe(1)
    expect(filteredCommands.value[0].name).toBe('前往主页')
  })

  it('should be reset filtered commands', () => {
    const { commands } = useCommand()
    const { resetSearchCommands, searchCommands, filteredCommands } = useSearchCommands()

    searchCommands('前往主页')

    resetSearchCommands()

    expect(filteredCommands.value.length).toBe(commands.length)
  })

  it('should return all commands when input is empty', () => {
    const { commands } = useCommand()
    const { searchCommands, filteredCommands } = useSearchCommands()

    searchCommands('')

    expect(filteredCommands.value.length).toBe(commands.length)
  })
})
