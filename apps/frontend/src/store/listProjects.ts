import { defineStore } from 'pinia'
import { ref } from 'vue'
import { TaskStatus } from './tasks'
import { fetchAllProjects, fetchAllTasks, fetchCreateProject } from '@/api'
import { useTasksSelectorStore } from '@/store'

type ProjectType = 'listProject' | 'smartProject'
export interface Project {
  id: string
  name: string
  type: ProjectType
}

export const useListProjectsStore = defineStore('newProjects', () => {
  const tasksSelectorStore = useTasksSelectorStore()
  const projects = ref<Project[]>([])

  async function init() {
    const rawProjects: any = await fetchAllProjects()
    projects.value = rawProjects.map(normalizeProject)

    if (projects.value.length > 0)
      tasksSelectorStore.setCurrentSelector(projects.value[0])
  }

  function selectProject(project: Project): void
  function selectProject(projectId: Project['id']): void
  function selectProject(projectName: Project['name']): void
  function selectProject(projectOrNameOrId: Project | string): void {
    let project: Project | undefined

    if (typeof projectOrNameOrId === 'string')
      project = findProject(projectOrNameOrId)

    else
      project = projectOrNameOrId

    if (project)
      tasksSelectorStore.setCurrentSelector(project)
  }

  function findProject(projectIdOrName: string): Project | undefined {
    return projects.value.find(p => p.name === projectIdOrName || p.id === projectIdOrName)
  }

  async function createProject(name: string) {
    if (!name)
      return

    const rawProject = await fetchCreateProject(name)
    const newProject = normalizeProject(rawProject)
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

// TODO 需要提供后端返回的  project 的 type shape
function normalizeProject(rawProject: any): Project {
  return {
    id: `${rawProject._id}`,
    name: rawProject.name,
    type: 'listProject',
  }
}

export async function loadListProjectTasks(pId: string) {
  const rawTasks = await fetchAllTasks(
    {
      pId,
      status: TaskStatus.ACTIVE,
    },
  )

  return rawTasks
}
