import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createListProject, initListProject } from '../listProject'
import type { Task } from '../task'
import {
  TaskState,
  addTask,
  changeTaskContent,
  changeTaskTitle,
  completeTask,
  createTask,
  initTask,
  removeTask,
  restoreTask,
} from '../task'

describe('task', () => {
  let tasks: Task[]
  let repository: any
  beforeEach(() => {
    repository = {}
    tasks = []
    initTask(tasks, repository)
  })

  it('should have project', () => {
    const projectId = 1
    const liveProject = createListProject('生活', projectId)
    const listProjects = [liveProject]
    initListProject(listProjects, {} as any)

    const task = createTask('test', 1, '', projectId)

    expect(task.project?.name).toBe('生活')
  })

  it('should change title of task', () => {
    repository.updateTask = vi.fn()
    const task = createTask('吃饭')

    changeTaskTitle(task, '睡觉')

    expect(task.title).toBe('睡觉')
  })

  it('should change content of task', () => {
    repository.updateTask = vi.fn()
    const task = createTask('吃饭')

    changeTaskContent(task, '干饭干饭')

    expect(task.content).toBe('干饭干饭')
  })
  it('should add task ', () => {
    repository.addTask = vi.fn()

    addTask(createTask('吃饭'))
    addTask(createTask('睡觉'))

    expect(tasks.length).toBe(2)
    expect(tasks[0].title).toBe('睡觉')
    expect(tasks[1].title).toBe('吃饭')
  })

  it('should remove task', () => {
    repository.updateTask = vi.fn()
    const task = createTask('吃饭')
    tasks.push(task)

    removeTask(task)

    expect(task.state).toBe(TaskState.REMOVED)
    expect(tasks.length).toBe(0)
  })

  it('should complete task', () => {
    repository.updateTask = vi.fn()
    const task = createTask('吃饭')
    tasks.push(task)

    completeTask(task)

    expect(task.state).toBe(TaskState.COMPLETED)
    expect(tasks.length).toBe(0)
  })

  it('should restore task', () => {
    repository.updateTask = vi.fn()
    const task = createTask('吃饭')
    task.state = TaskState.COMPLETED
    tasks.push(task)

    restoreTask(task)

    expect(task.state).toBe(TaskState.ACTIVE)
    expect(tasks.length).toBe(0)
  })
})
