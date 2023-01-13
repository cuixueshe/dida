import type { Task } from './task'
import { addTask, createTask } from './task'

export interface FetchTaskData {
  title: string
  content: string
  id: string
  previousProjectName?: string
}

export interface FetchListProjectData {
  name?: string
  tasks?: FetchTaskData[]
}
export interface ListProject {
  name: string
  tasks: Task[]
}

export const listProjects: ListProject[] = []

export function createListProject(name: string): ListProject {
  return {
    name,
    tasks: [],
  }
}

export function addListProject(project: ListProject) {
  listProjects.push(project)
}

export function findListProjectByName(name: string | undefined) {
  if (!name)
    return

  return listProjects.find((project) => {
    return project.name === name
  })
}

export function initListProjects(projectsData: FetchListProjectData[]) {
  listProjects.length = 0

  projectsData.forEach((projectData) => {
    const project = createListProject(projectData.name!)
    addListProject(project)

    // init tasks
    projectData.tasks!.forEach(({ id, title, content }) => {
      const task = createTask(title, id, content)
      addTask(task, project)
    })
  })
}
