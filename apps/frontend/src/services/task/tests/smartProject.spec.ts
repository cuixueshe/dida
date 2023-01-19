import { beforeEach, describe, expect, it, vi } from 'vitest'
import { completedSmartProject, initSmartProject, trashSmartProject } from '../smartProject'
import { TaskState } from '../task'
describe('smartProject', () => {
  let repository: any
  beforeEach(() => {
    repository = {}
    initSmartProject(repository)
  })
  it('should load tasks with completed project ', async () => {
    repository.findTasksByState = vi.fn(() => {
      return Promise.resolve([
        {
          id: 1,
          title: '吃饭',
          content: '',
          projectId: 1,
          state: TaskState.COMPLETED,
        },
      ])
    })

    const tasks = await completedSmartProject.loadTasks()

    expect(tasks.length).toBe(1)
    expect(repository.findTasksByState).toBeCalledWith(TaskState.COMPLETED)
  })

  it('should load tasks with trash project ', async () => {
    repository.findTasksByState = vi.fn(() => {
      return Promise.resolve([
        {
          id: 1,
          title: '吃饭',
          content: '',
          projectId: 1,
          state: TaskState.REMOVED,
        },
      ])
    })

    const tasks = await trashSmartProject.loadTasks()

    expect(tasks.length).toBe(1)
    expect(repository.findTasksByState).toBeCalledWith(TaskState.REMOVED)
  })
})
