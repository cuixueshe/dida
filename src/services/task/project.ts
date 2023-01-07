import type { Task } from './task'
import { TaskState, createTask } from './task'
import type { fetchData } from './data'
import {
  completedProject,
  findSpecialProjectByName,
  trashProject,
} from './specialProject'

export interface Project {
  state: TaskState
  name: string
  tasks: Task[]
}

export const projects: Project[] = []

export function createProject(
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
  const project = findNormalProjectByName(projectName)
  if (project)
    return project

  return findSpecialProjectByName(projectName)
}

function findNormalProjectByName(projectName: string) {
  return projects.find((project) => {
    return project.name === projectName
  })
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
