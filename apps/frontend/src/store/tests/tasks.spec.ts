import { assertType, beforeEach, describe, expect, it, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import type { Task } from '../tasks'
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
  fetchUpdateTaskContent,
  fetchUpdateTaskPosition,
  fetchUpdateTaskTitle,
} from '@/api'
import type { TaskResponse } from '@/api/types'

vi.mock('@/api')

let id = 0
let position = 0
const createTaskResponse = (title: string) => {
  return {
    title,
    content: '我是描述我是描述',
    status: TaskStatus.ACTIVE,
    projectId: '1',
    position: position++,
    _id: String(id++),
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  } as TaskResponse
}

vi.mocked(fetchCreateTask).mockImplementation(async (title) => {
  return createTaskResponse(title)
})

vi.mocked(fetchAllTasks).mockResolvedValue([])

describe('tasks store', () => {
  beforeEach(async () => {
    id = 0
    position = 0
    vi.clearAllMocks()
    setActivePinia(createPinia())

    const tasksSelectorStore = useTasksSelectorStore()
    tasksSelectorStore.currentSelector = liveListProject
  })

  describe('add task', () => {
    it('should add task to the first position', async () => {
      const tasksStore = useTasksStore()
      await tasksStore.addTask('运动')

      const task = await tasksStore.addTask('吃饭')

      expect(task?.title).toBe('吃饭')
      expect(tasksStore.tasks[0]).toEqual(task)
      expect(tasksStore.currentActiveTask).toEqual(task)
    })

    it('should not add task when current selector is undefined', async () => {
      const tasksSelectorStore = useTasksSelectorStore()
      tasksSelectorStore.currentSelector = undefined

      const tasksStore = useTasksStore()
      const task = await tasksStore.addTask('吃饭')

      expect(task).toBeUndefined()
      expect(tasksStore.tasks.length).toBe(0)
    })

    it('should not add task when current selector type is not listProject', async () => {
      const tasksSelectorStore = useTasksSelectorStore()
      tasksSelectorStore.currentSelector = completeSmartProject

      const tasksStore = useTasksStore()
      const task = await tasksStore.addTask('吃饭')

      expect(task).toBeUndefined()
      expect(tasksStore.tasks.length).toBe(0)
    })
  })

  it('should remove task', async () => {
    const tasksStore = useTasksStore()
    const task = (await tasksStore.addTask('吃饭')) as Task

    await tasksStore.removeTask(task)

    expect(tasksStore.tasks.length).toBe(0)
    expect(tasksStore.currentActiveTask).toBeUndefined()
    expect(fetchRemoveTask).toBeCalledWith(task.id)
  })

  it('should complete task', async () => {
    const tasksStore = useTasksStore()
    const task = (await tasksStore.addTask('吃饭')) as Task

    await tasksStore.completeTask(task)

    expect(tasksStore.tasks.length).toBe(0)
    expect(tasksStore.currentActiveTask).toBeUndefined()
    expect(fetchCompleteTask).toBeCalledWith(task.id)
  })

  it('should restore task', async () => {
    const tasksStore = useTasksStore()
    const task = (await tasksStore.addTask('吃饭')) as Task

    await tasksStore.restoreTask(task)

    expect(task.status).toBe(TaskStatus.ACTIVE)
    expect(tasksStore.tasks.length).toBe(0)
    expect(fetchRestoreTask).toBeCalledWith(task.id)
  })

  it('should move task to project', async () => {
    const tasksStore = useTasksStore()
    const task = (await tasksStore.addTask('吃饭')) as Task

    await tasksStore.moveTaskToProject(task, liveListProject.id)

    expect(task.projectId).toBe(liveListProject.id)
    expect(tasksStore.tasks.length).toBe(0)
    expect(fetchMoveTaskToProject).toBeCalledWith(task.id, liveListProject.id)
  })

  it('should update tasks', () => {
    const tasksStore = useTasksStore()

    tasksStore.updateTasks([createTaskResponse('吃饭')])

    const task = tasksStore.tasks[0]
    expect(task.title).toBe('吃饭')
    expect(task).toHaveProperty('id')
    expect(task).toHaveProperty('content')
    expect(task).toHaveProperty('status')
    expect(task).toHaveProperty('projectId')
    expect(task).toHaveProperty('position')
  })

  describe('cancel complete task', () => {
    it('should cancel complete task', async () => {
      const tasksStore = useTasksStore()
      await tasksStore.addTask('吃饭')
      const task = (await tasksStore.addTask('睡觉')) as Task
      await tasksStore.addTask('写代码')
      await tasksStore.completeTask(task)

      await tasksStore.cancelCompleteTask(task)

      expect(tasksStore.tasks[1]).toEqual(task)
    })

    it('cancel the last task', async () => {
      const tasksStore = useTasksStore()
      const lastTask = (await tasksStore.addTask('吃饭')) as Task
      await tasksStore.addTask('睡觉')
      await tasksStore.addTask('写代码')
      await tasksStore.completeTask(lastTask)

      await tasksStore.cancelCompleteTask(lastTask)

      expect(tasksStore.tasks[tasksStore.tasks.length - 1]).toEqual(lastTask)
    })
  })

  describe('update task title', () => {
    it('should update task title', async () => {
      const tasksStore = useTasksStore()
      const task = (await tasksStore.addTask('吃饭')) as Task

      const newTitle = '运动'
      await tasksStore.updateTaskTitle(task, newTitle)

      expect(task.title).toBe(newTitle)
      expect(fetchUpdateTaskTitle).toBeCalledWith(task.id, newTitle)
    })

    it('should not update task title when it does not change', async () => {
      const tasksStore = useTasksStore()
      const task = (await tasksStore.addTask('吃饭')) as Task

      await tasksStore.updateTaskTitle(task, task.title)

      expect(fetchUpdateTaskTitle).not.toBeCalled()
    })
  })

  describe('update task content', () => {
    it('should update task content', async () => {
      const tasksStore = useTasksStore()
      const task = (await tasksStore.addTask('吃饭')) as Task

      const newContent = '这是新的内容'
      await tasksStore.updateTaskContent(task, newContent)

      expect(task.content).toBe(newContent)
      expect(fetchUpdateTaskContent).toBeCalledWith(task.id, newContent)
    })

    it('should not update task content when it does not change', async () => {
      const tasksStore = useTasksStore()
      const task = (await tasksStore.addTask('吃饭')) as Task

      await tasksStore.updateTaskTitle(task, task.content)

      expect(fetchUpdateTaskContent).not.toBeCalled()
    })
  })

  describe('update task position', () => {
    it('should update task position', async () => {
      const tasksStore = useTasksStore()
      const task = (await tasksStore.addTask('吃饭')) as Task

      const newPosition = 2
      await tasksStore.updateTaskPosition(task, newPosition)

      expect(task.position).toBe(newPosition)
      expect(fetchUpdateTaskPosition).toBeCalledWith(task.id, newPosition)
    })

    it('should not update task content when it does not change', async () => {
      const tasksStore = useTasksStore()
      const task = (await tasksStore.addTask('吃饭')) as Task

      await tasksStore.updateTaskPosition(task, task.position)

      expect(fetchUpdateTaskPosition).not.toBeCalled()
    })
  })

  it('should find all tasks that have not been removed', async () => {
    const tasksStore = useTasksStore()

    const tasks = await tasksStore.findAllTasksNotRemoved()

    assertType<Task[]>(tasks)
    expect(fetchAllTasks).toBeCalledWith({ status: TaskStatus.ACTIVE })
    expect(fetchAllTasks).toBeCalledWith({ status: TaskStatus.COMPLETED })
  })

  describe('change active', () => {
    let task: Task
    beforeEach(async () => {
      const tasksStore = useTasksStore()
      task = (await tasksStore.addTask('吃饭')) as Task
    })

    it('should change active task by taskId', async () => {
      const tasksStore = useTasksStore()
      tasksStore.changeActiveTask(task.id)

      expect(tasksStore.currentActiveTask).toEqual(task)
    })

    it('should change active task by task', async () => {
      const tasksStore = useTasksStore()

      tasksStore.changeActiveTask(task)

      expect(tasksStore.currentActiveTask).toEqual(task)
    })
  })

  describe('update title of task', () => {
    it('should update title of task', async () => {
      const tasksStore = useTasksStore()
      const task = (await tasksStore.addTask('吃饭')) as Task

      const newTitle = '写代码'
      await tasksStore.updateTaskTitle(task, newTitle)

      expect(fetchUpdateTaskTitle).toBeCalledWith(task.id, newTitle)
      expect(task.title).toBe(newTitle)
    })

    it('should not update title of task when the title has not changed', async () => {
      const tasksStore = useTasksStore()
      const task = (await tasksStore.addTask('吃饭')) as Task

      const newTitle = '吃饭'
      await tasksStore.updateTaskTitle(task, newTitle)

      expect(fetchUpdateTaskTitle).not.toBeCalled()
      expect(task.title).toBe(newTitle)
    })
  })

  describe('update content of task ', () => {
    it('should update content of task', async () => {
      const tasksStore = useTasksStore()
      const task = (await tasksStore.addTask('吃饭')) as Task

      const newContent = '今天吃什么好呢'
      await tasksStore.updateTaskContent(task, newContent)

      expect(fetchUpdateTaskContent).toBeCalledWith(task.id, newContent)
      expect(task.content).toBe(newContent)
    })

    it('should not update content of task when the content has not changed', async () => {
      const tasksStore = useTasksStore()
      const task = (await tasksStore.addTask('吃饭')) as Task

      await tasksStore.updateTaskTitle(task, task.content)

      expect(fetchUpdateTaskContent).not.toBeCalled()
      expect(task.content).toBe(task.content)
    })
  })

  describe('update position of task ', () => {
    it('should update position of task', async () => {
      const tasksStore = useTasksStore()
      const task = (await tasksStore.addTask('吃饭')) as Task

      const newPosition = 5
      await tasksStore.updateTaskPosition(task, newPosition)

      expect(fetchUpdateTaskPosition).toBeCalledWith(task.id, newPosition)
      expect(task.position).toBe(newPosition)
    })

    it('should not update position of task when the position has not changed', async () => {
      const tasksStore = useTasksStore()
      const task = (await tasksStore.addTask('吃饭')) as Task

      await tasksStore.updateTaskPosition(task, task.position)

      expect(fetchUpdateTaskPosition).not.toBeCalled()
      expect(task.position).toBe(task.position)
    })
  })
})
