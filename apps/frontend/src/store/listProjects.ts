import { defineStore } from 'pinia'
import { ref } from 'vue'
import { TaskStatus } from './tasks'
import { TasksSelectorType } from './tasksSelector'
import { fetchAllProjects, fetchAllTasks, fetchCreateProject } from '@/api'
import { useTasksSelectorStore } from '@/store'
import type { ProjectResponse } from '@/api/types'

export interface ListProject {
  id: string
  name: string
  type: TasksSelectorType.listProject
}

export const useListProjectsStore = defineStore('newProjects', () => {
  const tasksSelectorStore = useTasksSelectorStore()
  const projects = ref<ListProject[]>([])

  async function init() {
    const rawProjects = await fetchAllProjects()
    projects.value = rawProjects.map(mapProjectResponseToProject)

    if (projects.value.length > 0)
      tasksSelectorStore.setCurrentSelector(projects.value[0])
  }

  function selectProject(project: ListProject): void
  function selectProject(projectId: ListProject['id']): void
  function selectProject(projectName: ListProject['name']): void
  function selectProject(projectOrNameOrId: ListProject | string): void {
    let project: ListProject | undefined

    if (typeof projectOrNameOrId === 'string')
      project = findProject(projectOrNameOrId)
    else project = projectOrNameOrId

    if (project)
      tasksSelectorStore.setCurrentSelector(project)
  }

  function findProject(projectIdOrName: string): ListProject | undefined {
    return projects.value.find(
      p => p.name === projectIdOrName || p.id === projectIdOrName,
    )
  }

  async function createProject(name: string) {
    if (!name)
      return

    const rawProject = await fetchCreateProject(name)
    const newProject = mapProjectResponseToProject(rawProject)
    projects.value.push(newProject)

    selectProject(newProject)
  }

  function checkProjectIsExist(projectName: string) {
    return projects.value.some((p) => {
      return p.name === projectName
    })
  }

  return {
    projects,
    init,
    createProject,
    selectProject,
    findProject,
    checkProjectIsExist,
  }
})

function mapProjectResponseToProject(rawProject: ProjectResponse): ListProject {
  return {
    id: `${rawProject._id}`,
    name: rawProject.name,
    type: TasksSelectorType.listProject,
  }
}

export async function loadListProjectTasks(pId: string) {
  const rawTasks = await fetchAllTasks({
    pId,
    status: TaskStatus.ACTIVE,
  })

  return rawTasks
}
