import { vi } from 'vitest'
import type { ListProject } from '../listProjects'

export const useListProjectsStore = vi.fn(() => {
  return {
    findProject() {
      return {
        id: '1',
        name: '集草器',
        type: 'listProject',
      } as ListProject
    },
  }
})
