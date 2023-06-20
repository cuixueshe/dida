import { beforeEach, describe, expect, it, vi } from 'vitest'
import flushPromises from 'flush-promises'
import { useSearch } from '../search'

async function flushWatch() {
  // 这是为了处理 watch
  await flushPromises() // 这是为了处理延迟 500ms
  vi.runAllTimers()
  // 这是为了处理内部的 await
  await flushPromises()
}

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

    await flushPromises()
    vi.runAllTimers()
    expect(loading.value).toBe(true)
  })

  it('should be loading is false when loaded', async () => {
    const { search, loading } = useSearch()

    search.value = '吃饭'

    await flushWatch()

    expect(loading.value).toBe(false)
  })

  it('should be searching is true when loaded', async () => {
    const { search, searchIng } = useSearch()

    search.value = '吃饭'

    await flushWatch()

    expect(searchIng.value).toBe(true)
  })

  it('should be searching is false when search reset', async () => {
    const { search, searchIng } = useSearch()

    search.value = '吃饭'
    await flushWatch()

    search.value = ''
    await flushWatch()

    expect(searchIng.value).toBe(false)
  })

  it('should search commands when input contain \'>\'  ', async () => {
    const { search } = useSearch()

    search.value = '>主页'

    await flushWatch()

    expect(searchCommands).toBeCalledWith('主页')
  })

  it('should search tasks ', async () => {
    const { search } = useSearch()
    search.value = '吃饭'

    await flushWatch()

    expect(searchTasks).toBeCalledWith('吃饭')
  })

  it('should be reset when reset search', async () => {
    const { search } = useSearch()
    search.value = '吃饭'

    await flushWatch()

    search.value = ''
    await flushWatch()

    expect(resetSearchCommands).toBeCalled()
    expect(resetSearchTasks).toBeCalled()
  })
})
