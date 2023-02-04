import type { Repository } from './dbRepository'
import type { Project } from './listProject'
import { findListProjectById } from './listProject'
import type { Tag } from './listTag'
import { completedSmartProject, trashSmartProject } from './smartProject'

export enum TaskState {
  ACTIVE = 1,
  COMPLETED = 2,
  GIVE_UP = 3,
  REMOVED = 4,
}

export interface Task {
  id: number
  title: string
  state: TaskState
  content: string
  project: Project | undefined
  index: number
}

export function createTask(
  title: string,
  id = 0,
  content = '',
  projectId = 0,
  state = TaskState.ACTIVE,
  index = 0,
): Task {
  const task = {
    id,
    title,
    content,
    state,
    project: getTaskFromProject(projectId, state),
    index,
  }
  return task
}

let repository: Repository | undefined
let tasks: Task[]

export function initTask(tasksReactive: Task[] = [], _repository: Repository) {
  repository = _repository
  tasks = tasksReactive
}

export async function loadTasks(category: Project | Tag) {
  const allTasks = await category.loadTasks()
  tasks.length = 0
  allTasks.forEach(({ id, title, content, projectId, state, index }) => {
    const task = createTask(title, id, content, projectId, state, index)
    tasks.unshift(task)
  })
  tasks.sort(_compareTaskIndex())
}

export async function findAllTasksNotRemoved(): Promise<Task[]> {
  const tasks = (await repository?.getAllTasks()) || []
  return tasks
    .filter(({ state }) => {
      return state !== TaskState.REMOVED
    })
    .map(({ projectId, title, id, content, state, index }) => {
      return createTask(title, id, content, projectId, state, index)
    })
}

export function changeTaskTitle(task: Task, title: string) {
  repository?.updateTask(task.id, { title })
  task.title = title
}

export function updateTaskIndex(task: Task, newIndex: number) {
  repository?.updateTask(task.id, { index: newIndex })
  task.index = newIndex
}

export function changeTaskContent(task: Task, content: string) {
  repository?.updateTask(task.id, { content })
  task.content = content
}

export async function addTask(task: Task, projectId = -1, tags: number[] = []) {
  const tId = await repository?.addTask(
    task.title,
    task.content,
    task.state,
    projectId,
    tags,
    task.index,
  )
  if (tId) {
    task.id = tId
    tasks.unshift(task)
  }
}

export function removeTask(task: Task) {
  repository?.updateTask(task.id, { state: TaskState.REMOVED })

  task.state = TaskState.REMOVED
  _removeTask(task)
}

export function completeTask(task: Task) {
  repository?.updateTask(task.id, { state: TaskState.COMPLETED })
  task.state = TaskState.COMPLETED
  _removeTask(task)
}

export function restoreTask(task: Task) {
  repository?.updateTask(task.id, { state: TaskState.ACTIVE })
  task.state = TaskState.ACTIVE
  _removeTask(task)
}

export async function moveTask(task: Task, targetProjectId: number) {
  const tasks = await findListProjectById(targetProjectId)?.loadTasks()
  repository?.updateTask(task.id, {
    projectId: targetProjectId,
    index: tasks?.length,
  })
  _removeTask(task)
  _updateTaskIndex()
}

function getTaskFromProject(
  projectId: number,
  state: TaskState,
): Project | undefined {
  if (state === TaskState.REMOVED)
    return trashSmartProject
  else if (state === TaskState.COMPLETED)
    return completedSmartProject
  else return findListProjectById(projectId)
}

export function findTaskById(id: number) {
  return tasks.find((task) => {
    return task.id === id
  })
}

function _removeTask(task: Task) {
  const len = tasks.length - 1
  for (let i = len; i >= 0; i--) {
    if (task.id === tasks[i].id)
      tasks.splice(i, 1)
  }
}

function _compareTaskIndex() {
  return function (a: Task, b: Task) {
    return b.index - a.index // desc
  }
}

function _updateTaskIndex() {
  for (let i = 0; i < tasks.length; i++) {
    tasks[i].index = tasks.length - 1 - i
    updateTaskIndex(tasks[i], tasks[i].index)
  }
}
