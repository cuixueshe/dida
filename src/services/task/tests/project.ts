import type { Task } from './task'

export interface Project {
  name: string
  tasks: Task[]
}

export const trashProject: Project = createProject('trash')

export const projects: Project[] = []

export function createProject(name: string): Project {
  return {
    name,
    tasks: [],
  }
}

export function addTask(task: Task, project: Project) {
  task.project = project
  project.tasks.push(task)
}

export function removeTask(task: Task) {
  const { project } = task
  if (project) {
    project.tasks = project.tasks.filter((item) => {
      return task.id !== item.id
    })
  }

  addTask(task, trashProject)
}

export function resetTrashProject() {
  trashProject.tasks = []
}
