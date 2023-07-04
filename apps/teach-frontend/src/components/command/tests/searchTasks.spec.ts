import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { useSearchTasks } from '../searchTasks'
import { completeSmartProject, useListProjectsStore, useTasksStore } from '@/store'
import { liveListProject, tasks } from '@/tests/fixture'

describe('search tasks', () => {
  beforeEach(() => {
    createTestingPinia({
      createSpy: vi.fn,
    })

    const tasksStore = useTasksStore()
    vi.mocked(tasksStore.findAllTasksNotRemoved).mockImplementation(
      async () => tasks,
    )

    const listProjectsStore = useListProjectsStore()
    vi.mocked(listProjectsStore.findProject).mockImplementation(() => liveListProject)

    const { resetSearchTasks } = useSearchTasks()

    resetSearchTasks()
  })
  it('should be search a task by title', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks()

    await searchTasks('吃饭')

    expect(filteredTasks.value.length).toBe(1)
    const item = filteredTasks.value[0].item
    expect(item.title).toBe('吃饭')
    expect(item).toHaveProperty('id')
    expect(item).toHaveProperty('desc')
    expect(item).toHaveProperty('done')
    expect(item).toHaveProperty('from')
  })

  it('should be search a task by desc', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks()

    await searchTasks('吃什么')

    expect(filteredTasks.value.length).toBe(1)
    expect(filteredTasks.value[0].item.title).toBe('吃饭')
  })

  it('should not be found when the task does not exist', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks()

    await searchTasks('运动')

    expect(filteredTasks.value.length).toBe(0)
  })

  it('should be task\'s project is listProject when status is active', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks()

    await searchTasks('吃饭')

    expect(filteredTasks.value[0].item.done).toBe(false)
    expect(filteredTasks.value[0].item.from?.name).toBe('生活')
  })
  it('should be task\'s project is completeSmartProject when status is complete', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks()

    await searchTasks('写代码')

    expect(filteredTasks.value[0].item.done).toBe(true)
    expect(filteredTasks.value[0].item.from?.name).toBe(completeSmartProject.name)
  })

  it('should be reset tasks', async () => {
    const { searchTasks, filteredTasks, resetSearchTasks } = useSearchTasks()

    await searchTasks('吃饭')

    resetSearchTasks()

    expect(filteredTasks.value.length).toBe(0)
  })
})
