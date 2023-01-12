import type { Task } from './task'
import { findSmartProjectByName, trashSmartProject } from './smartProject'
import { addTask, createTask } from './task'
import type { FetchListProjectData } from './listProject'

export interface Project {
  name: string
  tasks: Task[]
}

export const projects: Project[] = []

export function createProject(name: string): Project {
  return {
    name,
    tasks: [],
  }
}

export function addProject(project: Project) {
  projects.push(project)
}

export function findProjectByName(name: string | undefined) {
  if (!name)
    return
  const targetProject = findSmartProjectByName(name)
  if (targetProject)
    return targetProject
  return projects.find((project) => {
    return project.name === name
  })
}

export function initProjects(projectsData: FetchListProjectData[]) {
  projects.length = 0

  projectsData.forEach((projectData) => {
    if (projectData.name === undefined)
      return

    const project = createProject(projectData.name)
    addProject(project)
    // init tasks
    projectData.tasks?.forEach(({ id, title, content }) => {
      const task = createTask(title, id, content)
      addTask(task, project)
    })
  })
}

// TODO 后面重构成基于配置来初始化 这个就可以干掉了
export function resetTrashProject() {
  trashSmartProject.tasks = []
}
