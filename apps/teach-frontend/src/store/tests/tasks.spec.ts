import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { TaskStatus, useTasksStore } from '../tasks'
import { useTasksSelectorStore } from '../tasksSelector'
import { completeSmartProject } from '../smartProjects'
import { liveListProject } from '@/tests/fixture'
import {
  fetchAllTasks,
  fetchCompleteTask,
  fetchCreateTask,
  fetchMoveTaskToProject,
  fetchRemoveTask,
  fetchRestoreTask,
} from '@/api'

vi.mock('@/api')

let id = 0
let position = 0
function createTaskResponse(title: string) {
  return {
    title,
    content: '这是一个内容',
    status: TaskStatus.ACTIVE,
    projectId: '1',
    position: position++,
    _id: String(id++),
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  }
}

vi.mocked(fetchCreateTask).mockImplementation(async (title: string) =>
  createTaskResponse(title),
)

// vi.mocked(fetchAllTasks).mockResolvedValue([createTaskResponse('吃饭')])
vi.mocked(fetchAllTasks).mockResolvedValue([])

describe('tasks store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    id = 0
    position = 0

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

  it('should update tasks ', async () => {
    const tasksStore = useTasksStore()

    tasksStore.updateTasks([createTaskResponse('吃饭')])

    expect(tasksStore.tasks.length).toBe(1)
    // expectTaskDataStructure(tasksStore.tasks[0])
  })

  describe('change active', () => {
    it('should change active task by id', async () => {
      const tasksStore = useTasksStore()
      const task = (await tasksStore.addTask('吃饭'))!

      tasksStore.changeActiveTask(task.id)

      expect(tasksStore.currentActiveTask).toEqual(task)
    })

    it('should change active task by task', async () => {
      const tasksStore = useTasksStore()
      const task = (await tasksStore.addTask('吃饭'))!

      tasksStore.changeActiveTask(task)

      expect(tasksStore.currentActiveTask).toEqual(task)
    })
  })

  it('should find all tasks not removed', async () => {
    const tasksStore = useTasksStore()

    await tasksStore.findAllTasksNotRemoved()

    expect(fetchAllTasks).toBeCalledWith({ status: TaskStatus.ACTIVE })
    expect(fetchAllTasks).toBeCalledWith({ status: TaskStatus.COMPLETED })

    // expectTaskDataStructure(tasks[0])
  })

  describe('cancel complete task', () => {
    it('should cancel complete task', async () => {
      const tasksStore = useTasksStore()

      await tasksStore.addTask('吃饭')
      const task = (await tasksStore.addTask('睡觉'))!
      await tasksStore.addTask('写代码')
      await tasksStore.completeTask(task)

      await tasksStore.cancelCompleteTask(task)

      expect(tasksStore.tasks[1]).toEqual(task)
      expect(tasksStore.tasks[1].status).toBe(TaskStatus.ACTIVE)
      expect(fetchRestoreTask).toBeCalledWith(task.id)
    })

    it('should cancel complete the last task ', async () => {
      const tasksStore = useTasksStore()

      const task = (await tasksStore.addTask('吃饭'))!
      await tasksStore.addTask('睡觉')
      await tasksStore.addTask('写代码')
      await tasksStore.completeTask(task)

      await tasksStore.cancelCompleteTask(task)

      expect(tasksStore.tasks[2]).toEqual(task)
      expect(tasksStore.tasks[2].status).toBe(TaskStatus.ACTIVE)
      expect(fetchRestoreTask).toBeCalledWith(task.id)
    })

    it('should cancel complete task when only one', async () => {
      const tasksStore = useTasksStore()

      const task = (await tasksStore.addTask('吃饭'))!
      await tasksStore.completeTask(task)

      await tasksStore.cancelCompleteTask(task)

      expect(tasksStore.tasks[0]).toEqual(task)
      expect(tasksStore.tasks[0].status).toBe(TaskStatus.ACTIVE)
      expect(fetchRestoreTask).toBeCalledWith(task.id)
    })
  })
})

// function expectTaskDataStructure(task: any) {
//   expect(task.title).toBe('吃饭')
//   expect(task).toHaveProperty('id')
//   expect(task).toHaveProperty('content')
//   expect(task).toHaveProperty('status')
//   expect(task).toHaveProperty('position')
//   expect(task).toHaveProperty('projectId')
// }
