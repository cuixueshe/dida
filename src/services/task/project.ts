import type { Task } from './task'
import { TaskState, createTask } from './task'
import type { fetchData } from './data'

export interface Project {
  state: TaskState
  name: string
  tasks: Task[]
}

export enum SpecialProjectNames {
  Complete = '已完成',
  Trash = '垃圾桶',
  Failed = '已放弃',
  Abstract = '摘要',
}

export const projects: Project[] = []

const completedProject = createProject(
  SpecialProjectNames.Complete,
  TaskState.COMPLETED,
)

// 初始化垃圾桶 project
export const trashProject = createProject(
  SpecialProjectNames.Trash,
  TaskState.REMOVED,
)

export const failedProject = createProject(
  SpecialProjectNames.Failed,
  TaskState.REMOVED,
)

export const abstractProject = createProject(
  SpecialProjectNames.Abstract,
  TaskState.REMOVED,
)

function createProject(
  name: string,
  state: TaskState = TaskState.ACTIVE,
): Project {
  return {
    name,
    state,
    tasks: [],
  }
}

export function addTaskToProject(task: Task, project: Project) {
  project.tasks.unshift(task)
  task.project = project
  task.state = project.state
}

export function addTaskToCompleteProject(task: Task) {
  removeTaskFromProject(task, task.project!)
  addTaskToProject(task, completedProject)
}

export function removeTaskToTrashProject(task: Task) {
  removeTaskFromProject(task, task.project!)
  addTaskToProject(task, trashProject)
}

export function removeTaskFromProject(task: Task, project: Project) {
  const index = project.tasks.indexOf(task)
  if (index !== -1) {
    project.tasks.splice(index, 1)
    task.previousProject = task.project
    task.project = undefined
  }
}

export function findProjectByName(projectName: string) {
  switch (projectName) {
    case SpecialProjectNames.Complete:
      return completedProject
    case SpecialProjectNames.Trash:
      return trashProject
    case SpecialProjectNames.Failed:
      return failedProject
    case SpecialProjectNames.Abstract:
      return abstractProject

    default: {
      const project = projects.find((project) => {
        return project.name === projectName
      })
      if (project)
        return project
    }
  }
}

export function initProjects(data: typeof fetchData) {
  data.projectList.forEach((projectListData) => {
    const project = createProject(projectListData.name)
    projectListData.tasks.forEach(({ title, content, state, id }) => {
      // 一个任务只能属于一个 project
      // 所以我们在构建的时候就需要区分出来 当前的 task 应该属于哪个 project
      const task = createTask(title, id)
      task.content = content
      if (state === TaskState.ACTIVE) {
        addTaskToProject(task, project)
      }
      else if (state === TaskState.COMPLETED) {
        // 需要额外设置下 task 之前的 project
        // 用户恢复项目的时候 会基于此来判断恢复到哪里
        task.previousProject = project
        addTaskToProject(task, completedProject)
      }
    })

    projects.push(project)
  })

  data.trash.tasks.forEach(({ title, content, id }) => {
    const task = createTask(title, id)
    task.content = content
    addTaskToProject(task, trashProject)
  })
}
