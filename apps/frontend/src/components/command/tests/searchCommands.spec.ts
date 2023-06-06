import { beforeEach, describe, expect, it } from 'vitest'
import { commands, filteredCommands, resetSearchCommands, searchCommands } from '../searchCommands'

describe('SearchCommands', () => {
  beforeEach(() => {
    resetSearchCommands()
  })
  it('Should search for the go to home command', () => {
    searchCommands('前往主页')

    expect(filteredCommands.value.length).toBe(1)
    expect(filteredCommands.value[0].name).toBe('前往主页')
  })

  it('should be reset filtered commands', () => {
    searchCommands('前往主页')

    resetSearchCommands()

    expect(filteredCommands.value.length).toBe(commands.length)
  })

  it('should return all commands when input is empty', () => {
    searchCommands('')

    expect(filteredCommands.value.length).toBe(commands.length)
  })
})
