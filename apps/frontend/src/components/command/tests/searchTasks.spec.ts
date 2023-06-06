import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { filteredTasks, resetSearchTasks, searchTasks } from '../searchTasks'
import * as TaskService from '@/services/task'

describe('SearchTasks', () => {
  beforeEach(() => {
    vi.spyOn(TaskService, 'findAllTasksNotRemoved').mockResolvedValue([
      createMockTask('吃饭'),
      createMockTask('写代码', '一杯茶，一包烟，一行代码写一天'),
    ])
  })

  afterEach(() => {
    resetSearchTasks()
  })

  it('should be search a task by title', async () => {
    await searchTasks('写代码')

    expect(filteredTasks.value.length).toBe(1)
    expect(filteredTasks.value[0].item.title).toBe('写代码')
  })

  it('should be search a task by doc', async () => {
    await searchTasks('一包烟')

    expect(filteredTasks.value.length).toBe(1)
    expect(filteredTasks.value[0].item.title).toBe('写代码')
  })

  it('should not be found when the task does not exist', async () => {
    await searchTasks('睡觉')

    expect(filteredTasks.value.length).toBe(0)
  })

  it('should reset search result', async () => {
    await searchTasks('一包烟')

    resetSearchTasks()

    expect(filteredTasks.value.length).toBe(0)
  })
})

function createMockTask(title: string, content = '') {
  return {
    id: 0,
    title,
    content,
    state: TaskService.TaskState.ACTIVE,
    project: undefined,
    index: 1,
  }
}
