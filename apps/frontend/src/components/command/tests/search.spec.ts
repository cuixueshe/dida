import { afterEach, beforeEach, describe, expect, it, test, vi } from 'vitest'
import flushPromises from 'flush-promises'
import { inputStateMachine, resetSearch, search } from '../search'
import { resetSearchCommands, searchCommands } from '../searchCommands'
import { resetSearchTasks, searchTasks } from '../searchTasks'

vi.mock('../searchCommands.ts')
vi.mock('../searchTasks.ts')

async function flushWatch() {
  // 这是为了处理 watch
  await flushPromises() // 这是为了处理延迟 500ms
  vi.advanceTimersToNextTimer()
  // 这是为了处理内部的 await
  await flushPromises()
}

describe('Search', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  afterEach(() => {
    resetSearch()
  })

  describe('input state machine', () => {
    it('input state machine change', async () => {
      search.value = 'code'

      await flushPromises()
      vi.advanceTimersToNextTimer()
      expect(inputStateMachine.state.value).toBe('loading')

      await flushPromises()
      expect(inputStateMachine.state.value).toBe('loadCompleted')
    })

    it('should be reset when search value is empty', async () => {
      search.value = 'code'
      await flushWatch()

      search.value = ''
      await flushWatch()

      expect(inputStateMachine.state.value).toBe('waitingForInput')
    })
  })

  test('should search commands when input contain \'>\'  ', async () => {
    search.value = '>主页'

    await flushWatch()

    expect(searchCommands).toBeCalledWith('主页')
  })

  test('should search tasks ', async () => {
    search.value = '吃饭'

    await flushWatch()

    expect(searchTasks).toBeCalledWith('吃饭')
  })

  test('should be reset when reset search', async () => {
    search.value = '吃饭'
    await flushWatch()

    search.value = ''
    await flushWatch()

    expect(resetSearchCommands).toBeCalled()
    expect(resetSearchTasks).toBeCalled()
  })
})
