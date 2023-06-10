import { http } from './http'

export function fetchAllProjects() {
  return http.get('/projects')
}

export function fetchCreateProject(name: string) {
  return http.post('/projects', {
    name,
  })
}
