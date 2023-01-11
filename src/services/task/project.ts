import type { Task } from './task'
import { abstractSmartProject, completedSmartProject, failedSmartProject, trashProject } from './smartProject'
import { addTask, createTask } from './task'

export interface FetchTaskData {
  title: string
  content: string
  id: string
  previousProjectName?: string
}

export interface FetchProjectData {
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

export function findProjectByName(name: string | undefined) {
  if (!name)
    return

  const targetMap = {
    [completedSmartProject.name]: completedSmartProject,
    [trashProject.name]: trashProject,
    [failedSmartProject.name]: failedSmartProject,
    [abstractSmartProject.name]: abstractSmartProject,
  }

  const target = targetMap[name as keyof typeof targetMap]

  if (target)
    return target

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
