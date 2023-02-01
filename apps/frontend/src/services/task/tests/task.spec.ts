import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Project } from '../listProject'
import { createListProject, initListProject } from '../listProject'
import type { Task } from '../task'
import {
  TaskState,
  addTask,
  changeTaskContent,
  changeTaskTitle,
  completeTask,
  createTask,
  findAllTasksNotRemoved,
  initTask,
  loadTasks,
  removeTask,
  restoreTask,
} from '../task'

describe('task', () => {
  let tasks: Task[]
  let repository: any
  let project: Project
  const projectId = 1
  let projectRepository: any
  beforeEach(() => {
    repository = {}
    tasks = []
    initTask(tasks, repository)

    projectRepository = {}
    project = createListProject('生活', projectId)
    const listProjects = [project]
    initListProject(listProjects, projectRepository)
  })

  it('should have project', () => {
    const task = createTask('test', 1, '', projectId)

    expect(task.project?.name).toBe('生活')
  })
  it('should load all tasks', async () => {
    projectRepository.getTasks = vi.fn(() => {
      return Promise.resolve([
        {
          id: 1,
          title: '吃饭',
          content: '',
          projectId,
          state: TaskState.ACTIVE,
        },
        {
          id: 2,
          title: '睡觉',
          content: '',
          projectId,
          state: TaskState.ACTIVE,
        },
      ])
    })

    await loadTasks(project)
    expect(tasks.length).toBe(2)

    // length 2 when load task again
    await loadTasks(project)
    expect(tasks.length).toBe(2)
  })

  it('should load all task of not removed', async () => {
    repository.getAllTasks = vi.fn(() => {
      return Promise.resolve([
        {
          id: 1,
          title: '吃饭',
          content: '',
          projectId,
          state: TaskState.ACTIVE,
        },
        {
          id: 2,
          title: '睡觉',
          content: '',
          projectId,
          state: TaskState.REMOVED,
        },

      ])
    })

    const tasks = await findAllTasksNotRemoved()

    expect(tasks.length).toBe(1)
    expect(tasks[0].title).toBe('吃饭')
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
  it('should add task ', async () => {
    let i = 0
    repository.addTask = vi.fn(() => ++i)

    await addTask(createTask('吃饭'))
    await addTask(createTask('睡觉'))

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
