import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSearch } from '../search'

const resetSearchCommands = vi.fn()
const searchCommands = vi.fn()
vi.mock('../searchCommands.ts', () => {
  return {
    useSearchCommands() {
      return {
        resetSearchCommands,
        searchCommands,
      }
    },
  }
})

const resetSearchTasks = vi.fn()
const searchTasks = vi.fn().mockResolvedValue('')
vi.mock('../searchTasks.ts', () => {
  return {
    useSearchTasks() {
      return {
        resetSearchTasks,
        searchTasks,
      }
    },
  }
})

describe('search', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    resetSearchCommands.mockClear()
    searchCommands.mockClear()
    resetSearchTasks.mockClear()
    searchTasks.mockClear()

    const { resetSearch } = useSearch()

    resetSearch()
  })
  it('should be loading is true when searching', async () => {
    const { search, loading } = useSearch()

    search.value = '吃饭'

    await vi.advanceTimersToNextTimerAsync()

    expect(loading.value).toBe(true)
  })

  it('should be loading is false when loaded', async () => {
    const { search, loading } = useSearch()

    search.value = '吃饭'

    await vi.runAllTimersAsync()

    expect(loading.value).toBe(false)
  })

  it('should be searching is true when loaded', async () => {
    const { search, searchIng } = useSearch()

    search.value = '吃饭'

    await vi.runAllTimersAsync()

    expect(searchIng.value).toBe(true)
  })

  it('should be searching is false when search reset', async () => {
    const { search, searchIng } = useSearch()
    search.value = '吃饭'
    await vi.runAllTimersAsync()

    search.value = ''
    await vi.runAllTimersAsync()

    expect(searchIng.value).toBe(false)
  })

  it('should search commands when input contain \'>\'  ', async () => {
    const { search } = useSearch()

    search.value = '>主页'

    await vi.runAllTimersAsync()

    expect(searchCommands).toBeCalledWith('主页')
  })

  it('should search commands when input contain blank character  ', async () => {
    const { search } = useSearch()

    search.value = '>主页 '

    await vi.runAllTimersAsync()

    expect(searchCommands).toBeCalledWith('主页')
  })

  it('should search tasks ', async () => {
    const { search } = useSearch()
    search.value = '吃饭'

    await vi.runAllTimersAsync()

    expect(searchTasks).toBeCalledWith('吃饭')
  })

  it('should be reset when reset search', async () => {
    const { search, loading, searchIng } = useSearch()
    search.value = '吃饭'

    await vi.runAllTimersAsync()

    search.value = ''
    await vi.runAllTimersAsync()

    expect(loading.value).toBe(false)
    expect(searchIng.value).toBe(false)
    expect(resetSearchCommands).toBeCalled()
    expect(resetSearchTasks).toBeCalled()
  })
})
