import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSearchTasks } from '../searchTasks'
import { completeSmartProject } from '@/store'

vi.mock('@/store/tasks')
vi.mock('@/store/listProjects')

describe('SearchTasks', () => {
  beforeEach(() => {
    const { resetSearchTasks } = useSearchTasks()
    resetSearchTasks()
  })
  it('should be search a task by title', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks()
    await searchTasks('写代码')

    expect(filteredTasks.value.length).toBe(1)
    expect(filteredTasks.value[0].item.title).toBe('写代码')
  })

  it('should be search a task by doc', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks()
    await searchTasks('一包烟')

    expect(filteredTasks.value.length).toBe(1)
    expect(filteredTasks.value[0].item.title).toBe('写代码')
  })

  it('should not be found when the task does not exist', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks()
    await searchTasks('运动')

    expect(filteredTasks.value.length).toBe(0)
  })

  it('should reset search result', async () => {
    const { resetSearchTasks, searchTasks, filteredTasks } = useSearchTasks()
    await searchTasks('一包烟')

    resetSearchTasks()

    expect(filteredTasks.value.length).toBe(0)
  })

  it('should be task’s project is listProject when status is active', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks()
    await searchTasks('写代码')

    const task = filteredTasks.value[0].item
    expect(task.from!.type).toBe('listProject')
  })

  it('should be task’s project is completeSmartProject when status is completed', async () => {
    const { searchTasks, filteredTasks } = useSearchTasks()
    await searchTasks('睡觉')

    const task = filteredTasks.value[0].item
    expect(task.from!.name).toBe(completeSmartProject.name)
  })
})
