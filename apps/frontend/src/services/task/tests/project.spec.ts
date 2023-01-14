import { describe, expect, it } from 'vitest'
import { findProjectByName, initProjects, projects } from '../project'
import {
  completedSmartProject,
  trashProject,
} from '../smartProject'

describe('project', () => {
  it('initProjects ', () => {
    initProjects([
      {
        name: 'live',
        tasks: [
          {
            title: '吃饭',
            content: '## 吃饭 \n 吃什么好呢',
            id: crypto.randomUUID(),
          },
          {
            title: '睡觉',
            content: '## 睡觉 \n 早睡早起 身体好',
            id: crypto.randomUUID(),
          },
        ],
      },
      {
        name: 'work',
        tasks: [
          {
            title: '不想上班',
            content: '我不想 我不想 我不想上班',
            id: crypto.randomUUID(),
          },
        ],
      },
    ])

    expect(projects.length).toBe(2)

    expect(projects[0].name).toBe('live')
    expect(projects[0].tasks.length).toBe(2)

    expect(projects[1].name).toBe('work')
    expect(projects[1].tasks.length).toBe(1)
  })
  it('should find a project when the project is created', () => {
    initProjects([
      {
        name: 'first',
        tasks: [],
      },
      {
        name: 'second',
        tasks: [],
      },
    ])

    const project = findProjectByName('first')

    expect(project?.name).toBe('first')
    expect(findProjectByName(completedSmartProject.name)).toBeTruthy()
    expect(findProjectByName(trashProject.name)).toBeTruthy()
  })

  it.todo('should exist when project is created', () => {})
})
