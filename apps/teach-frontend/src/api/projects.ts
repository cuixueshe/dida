import { http } from './http'
import type { ProjectResponse } from './types'

export function fetchAllProjects() {
  return http.get<ProjectResponse[], ProjectResponse[]>('/projects')
}

export function fetchCreateProject(name: string) {
  return http.post<ProjectResponse, ProjectResponse>('/projects', {
    name,
  })
}
