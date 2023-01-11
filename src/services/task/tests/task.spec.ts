import { describe, expect, it } from 'vitest'
import {
  createProject,
} from '../project'
import { SmartProjectNames, resetSmartProjectByName, smartProjects } from '../smartProject'
import {
  TaskState,
  addTask,
  completeTask,
  createTask,
  removeTask,
  restoreTask,
} from '../task'

describe('task', () => {
  it('should edit title of task', () => {
    const task = createTask('coding')

    task.title = 'eat'

    expect(task.title).toBe('eat')
  })
  it('should edit content of task', () => {
    const task = createTask('coding')
    task.content = 'hi'

    expect(task.content).toBe('hi')
  })
  it('add task to project ', () => {
    const project = createProject('one')
    const firstTask = createTask('coding')
    addTask(firstTask, project)
    expect(project.tasks[0].title).toEqual('coding')

    const secondTask = createTask('play game')
    addTask(secondTask, project)
    expect(project.tasks[0].title).toEqual('play game')
  })

  it('remove task', () => {
    const project = createProject('one')
    const task = createTask('coding')
    addTask(task, project)

    removeTask(task)

    expect(project.tasks.length).toBe(0)
    expect(smartProjects[SmartProjectNames.Trash].tasks[0].title).toBe('coding')

    resetSmartProjectByName(SmartProjectNames.Trash)
  })

  it('complete task', () => {
    const project = createProject('one')
    const task = createTask('coding')
    addTask(task, project)

    completeTask(task)

    expect(project.tasks.length).toBe(0)
    expect(smartProjects[SmartProjectNames.Complete].tasks[0].title).toBe('coding')

    resetSmartProjectByName(SmartProjectNames.Complete)
  })

  it('restore task', () => {
    const project = createProject('one')
    const task = createTask('coding')
    addTask(task, project)
    completeTask(task)

    restoreTask(task)

    expect(smartProjects[SmartProjectNames.Complete].tasks.length).toBe(0)
    expect(project!.tasks[0].title).toBe('coding')
  })

  it('task state', () => {
    const task = createTask('coding')
    expect(task.state).toEqual(TaskState.ACTIVE)

    const project = createProject('one')
    addTask(task, project)
    expect(task.state).toEqual(TaskState.ACTIVE)

    completeTask(task)
    expect(task.state).toEqual(TaskState.COMPLETED)

    removeTask(task)
    expect(task.state).toEqual(TaskState.REMOVED)
  })
})
