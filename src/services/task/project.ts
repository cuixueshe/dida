import type { Task } from './task'
import type { SmartProjectNames } from './smartProject'
import { smartProjectKeys, smartProjects } from './smartProject'
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
  if (smartProjectKeys.includes(name))
    return smartProjects[name as SmartProjectNames]

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
