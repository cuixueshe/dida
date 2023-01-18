import type { Repository } from './dbRepository'

export interface Project {
  id: number
  name: string
  loadTasks: () => any
}

export interface ListProject extends Project {}

let repository: Repository | undefined
let listProjects: ListProject[]

export function initListProject(
  listProjectReactive: ListProject[] = [],
  _repository: Repository,
) {
  repository = _repository
  listProjects = listProjectReactive
}

export function createListProject(name: string, id: number): ListProject {
  return {
    id,
    name,
    loadTasks: () => {
      return repository!.getTasks(id)
    },
  }
}

export async function loadProjects() {
  return repository!.loadProjects().then((projects) => {
    projects.forEach((project: any) => {
      listProjects.push(createListProject(project.name, project.id))
    })
  })
}

export function addListProject(project: ListProject) {
  // TODO 调用 repository
  listProjects.push(project)
}

export function findListProjectByName(name: string | undefined) {
  if (!name)
    return

  return listProjects.find((project) => {
    return project.name === name
  })
}

export function findListProjectById(id: number) {
  return listProjects.find((project) => {
    return project.id === id
  })
}
