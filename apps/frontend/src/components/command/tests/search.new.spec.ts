import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useSearch } from '../search'
import { useSearchTasks } from '../searchTasks'
import { useSearchCommands } from '../searchCommands'
import { completeSmartProject, useListProjectsStore, useTasksStore } from '@/store'
import { liveListProject, tasks } from '@/tests/fixture'
import { useCommand } from '@/composables/command'

describe('search new ', () => {
  beforeAll(() => {
    const { addCommand } = useCommand()

    addCommand({
      name: '回到主页',
      execute() {},
    })

    addCommand({
      name: '切换皮肤',
      execute() {},
    })
  })
  beforeEach(() => {
    vi.useFakeTimers()

    createTestingPinia({
      createSpy: vi.fn,
    })

    const tasksStore = useTasksStore()
    vi.mocked(tasksStore.findAllTasksNotRemoved).mockImplementation(async () => tasks)

    const listProjectsStore = useListProjectsStore()
    vi.mocked(listProjectsStore.findProject).mockImplementation(() => liveListProject)
  })

  describe('ui state', () => {
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
  })

  describe('search tasks', () => {
    it('should be search a task by title', async () => {
      const { search } = useSearch()
      const { filteredTasks } = useSearchTasks()

      search.value = '吃饭'

      await vi.runAllTimersAsync()

      expect(filteredTasks.value.length).toBe(1)
      const item = filteredTasks.value[0].item
      expect(item.title).toBe('吃饭')
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('desc')
      expect(item).toHaveProperty('done')
      expect(item).toHaveProperty('from')
    })

    it('should be search a task by desc', async () => {
      const { search } = useSearch()
      const { filteredTasks } = useSearchTasks()

      search.value = '吃什么'
      await vi.runAllTimersAsync()

      expect(filteredTasks.value.length).toBe(1)
      expect(filteredTasks.value[0].item.title).toBe('吃饭')
    })

    it('should not be found when the task does not exist', async () => {
      const { search } = useSearch()
      const { filteredTasks } = useSearchTasks()

      search.value = '运动'
      await vi.runAllTimersAsync()

      expect(filteredTasks.value.length).toBe(0)
    })

    it('should be task\'s project is listProject when status is active', async () => {
      const { search } = useSearch()
      const { filteredTasks } = useSearchTasks()

      search.value = '吃饭'
      await vi.runAllTimersAsync()

      expect(filteredTasks.value[0].item.done).toBe(false)
      expect(filteredTasks.value[0].item.from?.name).toBe('生活')
    })
    it('should be task\'s project is completeSmartProject when status is complete', async () => {
      const { search } = useSearch()
      const { filteredTasks } = useSearchTasks()

      search.value = '写代码'
      await vi.runAllTimersAsync()

      expect(filteredTasks.value[0].item.done).toBe(true)
      expect(filteredTasks.value[0].item.from?.name).toBe(completeSmartProject.name)
    })
  })

  describe('search commands', () => {
    it('normal', async () => {
      const { search } = useSearch()
      const { filteredCommands } = useSearchCommands()

      search.value = '>主页'

      await vi.runAllTimersAsync()

      expect(filteredCommands.value.length).toBe(1)
      expect(filteredCommands.value[0].name).toBe('回到主页')
    })

    it('removes the trailing white space', async () => {
      const { search } = useSearch()
      const { filteredCommands } = useSearchCommands()

      search.value = '>主页 '

      await vi.runAllTimersAsync()

      expect(filteredCommands.value.length).toBe(1)
      expect(filteredCommands.value[0].name).toBe('回到主页')
    })

    it('should be search all commands ', async () => {
      const { search } = useSearch()
      const { filteredCommands } = useSearchCommands()

      search.value = '>'

      await vi.runAllTimersAsync()
      expect(filteredCommands.value.length).toBe(2)
    })
  })

  it('should be reset when search is empty', async () => {
    const { search, searching, loading } = useSearch()
    const { filteredTasks } = useSearchTasks()
    const { filteredCommands } = useSearchCommands()

    search.value = '吃饭'
    await vi.runAllTimersAsync()

    search.value = '>主页'
    await vi.runAllTimersAsync()

    search.value = ''
    await vi.runAllTimersAsync()

    expect(searching.value).toBe(false)
    expect(loading.value).toBe(false)
    expect(filteredTasks.value.length).toBe(0)
    expect(filteredCommands.value.length).toBe(2)
  })
})
