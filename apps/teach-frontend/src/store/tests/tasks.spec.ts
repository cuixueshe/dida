import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { TaskStatus, useTasksStore } from '../tasks'
import { useTasksSelectorStore } from '../tasksSelector'
import { completeSmartProject } from '../smartProjects'
import { liveListProject } from '@/tests/fixture'
import { fetchCompleteTask, fetchCreateTask, fetchMoveTaskToProject, fetchRemoveTask, fetchRestoreTask } from '@/api'

vi.mock('@/api')

vi.mocked(fetchCreateTask).mockImplementation(async (title: string) => {
  return {
    title,
    content: '这是一个内容',
    status: TaskStatus.ACTIVE,
    projectId: '1',
    position: 1,
    _id: '1',
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  }
})

describe('tasks store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())

    const tasksSelectorStore = useTasksSelectorStore()
    tasksSelectorStore.currentSelector = liveListProject

    vi.clearAllMocks()
  })
  describe('add task', () => {
    it('should add task to the first position', async () => {
      const tasksStore = useTasksStore()
      await tasksStore.addTask('运动')

      const task = await tasksStore.addTask('吃饭')

      expect(task?.title).toBe('吃饭')
      expect(tasksStore.tasks[0]).toEqual(task)
      expect(tasksStore.currentActiveTask).toEqual(task)
      expect(fetchCreateTask).toBeCalledWith(task?.title, liveListProject.id)
    })

    it('should not add task when currentActiveTask is undefined', async () => {
      const tasksSelectorStore = useTasksSelectorStore()
      tasksSelectorStore.currentSelector = undefined

      const tasksStore = useTasksStore()

      const task = await tasksStore.addTask('吃饭')

      expect(task).toBeUndefined()
      expect(tasksStore.tasks.length).toBe(0)
      expect(tasksStore.currentActiveTask).toBeUndefined()
      expect(fetchCreateTask).not.toBeCalled()
    })

    it('should not add task when the type of currentActiveTask is smartProject', async () => {
      const tasksSelectorStore = useTasksSelectorStore()
      tasksSelectorStore.currentSelector = completeSmartProject

      const tasksStore = useTasksStore()

      const task = await tasksStore.addTask('吃饭')

      expect(task).toBeUndefined()
      expect(tasksStore.tasks.length).toBe(0)
      expect(tasksStore.currentActiveTask).toBeUndefined()
      expect(fetchCreateTask).not.toBeCalled()
    })
  })

  it('should remove task', async () => {
    const tasksStore = useTasksStore()
    const task = (await tasksStore.addTask('吃饭'))!

    await tasksStore.removeTask(task)

    expect(tasksStore.tasks.length).toBe(0)
    expect(tasksStore.currentActiveTask).toBeUndefined()
    expect(fetchRemoveTask).toBeCalledWith(task.id)
  })

  it('should complete task', async () => {
    const tasksStore = useTasksStore()
    const task = (await tasksStore.addTask('吃饭'))!

    await tasksStore.completeTask(task)

    expect(tasksStore.tasks.length).toBe(0)
    expect(tasksStore.currentActiveTask).toBeUndefined()
    expect(fetchCompleteTask).toBeCalledWith(task.id)
  })

  it('should restoreTask task', async () => {
    const tasksStore = useTasksStore()
    const task = (await tasksStore.addTask('吃饭'))!

    await tasksStore.restoreTask(task)

    expect(tasksStore.tasks.length).toBe(0)
    expect(tasksStore.currentActiveTask).toBeUndefined()
    expect(fetchRestoreTask).toBeCalledWith(task.id)
  })

  it('should move task to project', async () => {
    const tasksStore = useTasksStore()
    const task = (await tasksStore.addTask('吃饭'))!

    const projectId = '2'
    await tasksStore.moveTaskToProject(task, projectId)

    expect(tasksStore.tasks.length).toBe(0)
    expect(tasksStore.currentActiveTask).toBeUndefined()
    expect(fetchMoveTaskToProject).toBeCalledWith(task.id, projectId)
  })
})
