import type { Task } from './task'
import { completedProject, trashProject } from './smartProject'
import { addTask, createTask } from './task'

interface FetchTaskData {
  title: string
  content: string
  id: string
}

interface FetchProjectData {
  name: string
  tasks: FetchTaskData[]
}
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

export function findProjectByName(name: string) {
  if (name === completedProject.name)
    return completedProject
  else if (name === trashProject.name)
    return trashProject

  return projects.find((project) => {
    return project.name === name
  })
}

export function initProjects(projectsData: FetchProjectData[]) {
  projects.length = 0

  projectsData.forEach((projectData) => {
    const project = createProject(projectData.name)
    addProject(project)

    // init tasks
    projectData.tasks.forEach(({ id, title, content }) => {
      const task = createTask(title, id, content)
      addTask(task, project)
    })
  })
}

// TODO 后面重构成基于配置来初始化 这个就可以干掉了
export function resetTrashProject() {
  trashProject.tasks = []
}

// TODO 后面重构成基于配置来初始化 这个就可以干掉了
export function resetCompletedProject() {
  completedProject.tasks = []
}
