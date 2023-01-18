import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  addListProject,
  createListProject,
  findListProjectById,
  findListProjectByName,
  initListProject,
  loadProjects,
} from '../listProject'
import type { ListProject } from '../listProject'

describe('listProject', () => {
  let listProjects: ListProject[]
  let repository: any
  beforeEach(() => {
    listProjects = []
    repository = {}
    initListProject(listProjects, repository)
  })
  it('should get project by project name', () => {
    listProjects.push(
      createListProject('生活', 1),
      createListProject('工作', 2),
    )

    expect(findListProjectByName('生活')?.name).toBeTruthy()
    expect(findListProjectByName('工作')?.name).toBeTruthy()
  })
  it('should get project by project id', () => {
    listProjects.push(
      createListProject('生活', 1),
      createListProject('工作', 2),
    )

    expect(findListProjectById(1)?.name).toBeTruthy()
    expect(findListProjectById(2)?.name).toBeTruthy()
  })
  it('should load projects', async () => {
    repository.loadProjects = vi.fn(() =>
      Promise.resolve([
        {
          name: '生活',
          id: 1,
        },
        {
          id: 2,
          name: '工作',
        },
      ]),
    )

    await loadProjects()

    expect(listProjects.length).toBe(2)
  })

  it('add project', async () => {
    const pIndex = 1
    repository.addProject = vi.fn(() => Promise.resolve(pIndex))
    const listProject = createListProject('过年')

    await addListProject(listProject)

    expect(listProjects.length).toBe(1)
    expect(listProjects[0].id).toBe(pIndex)
  })
})
