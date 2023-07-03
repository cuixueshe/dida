import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSearch } from '../search'

const searchTasks = vi.fn()
const resetSearchTasks = vi.fn()
vi.mock('../searchTasks.ts', () => {
  return {
    useSearchTasks() {
      return {
        searchTasks,
        resetSearchTasks,
      }
    },
  }
})

const searchCommands = vi.fn()
const resetSearchCommands = vi.fn()
vi.mock('../searchCommands.ts', () => {
  return {
    useSearchCommands() {
      return {
        searchCommands,
        resetSearchCommands,
      }
    },
  }
})

describe('search', () => {
  beforeEach(async () => {
    vi.useFakeTimers()

    const { resetSearch } = useSearch()

    resetSearch()

    await vi.runAllTimersAsync()

    vi.clearAllMocks()
  })
  // 只测试一个关注点
  it('should be loading is true when search is start', async () => {
    const { search, loading } = useSearch()

    search.value = '吃饭'

    await vi.advanceTimersToNextTimerAsync()

    expect(loading.value).toBe(true)
  })

  it('should be loading is false when search is complete', async () => {
    const { search, loading } = useSearch()

    search.value = '吃饭'

    await vi.runAllTimersAsync()

    expect(loading.value).toBe(false)
  })

  it('should be searching is true when search is complete', async () => {
    const { search, searching } = useSearch()

    search.value = '吃饭'

    await vi.runAllTimersAsync()

    expect(searching.value).toBe(true)
  })

  it('search tasks', async () => {
    const { search } = useSearch()

    search.value = '吃饭'

    await vi.runAllTimersAsync()

    expect(searchTasks).toBeCalledWith('吃饭')
  })

  describe('search commands', () => {
    it('normal', async () => {
      const { search } = useSearch()

      search.value = '>主页'

      await vi.runAllTimersAsync()

      expect(searchCommands).toBeCalledWith('主页')
    })

    it('removes the trailing white space', async () => {
      const { search } = useSearch()

      search.value = '>主页 '

      await vi.runAllTimersAsync()

      expect(searchCommands).toBeCalledWith('主页')
    })
  })

  it('should be reset when search is empty', async () => {
    const { search, searching, loading } = useSearch()

    search.value = '吃饭'
    await vi.runAllTimersAsync()

    search.value = ''
    await vi.runAllTimersAsync()

    expect(searching.value).toBe(false)
    expect(loading.value).toBe(false)
    expect(resetSearchCommands).toBeCalled()
    expect(resetSearchTasks).toBeCalled()
  })
})
