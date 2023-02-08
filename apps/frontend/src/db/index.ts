import type { Table } from 'dexie'
import Dexie from 'dexie'
import type { ProjectTable, TagTable, TaskTable } from './types'
import { TaskState } from '@/services/task'

export class DexieDB extends Dexie {
  tasks!: Table<TaskTable, number>
  tags!: Table<TagTable, number>
  projects!: Table<ProjectTable, number>

  constructor() {
    super('dida')
    this.version(1).stores({
      tasks: '++id, title, content, projectId, state, index',
      projects: '++id, name',
      tags: '++id, name, parentTagId, color',
    })
  }
}

let db: DexieDB
export async function setupDB() {
  db = new DexieDB()
  // 临时给用户添加数据
  await initData()
}

export function getDB() {
  return db
}

async function initProjectData() {
  const projects = await db.projects.toArray()
  if (projects.length !== 0)
    return

  await db.tasks.add({
    title: '吃饭',
    content: '',
    projectId: 1,
    tagIds: [],
    state: TaskState.ACTIVE,
    index: 0,
  })
  await db.tasks.add({
    title: '睡觉',
    content: '',
    projectId: 1,
    tagIds: [2],
    state: TaskState.ACTIVE,
    index: 1,
  })
  await db.tasks.add({
    title: '写代码',
    content: '',
    projectId: 1,
    tagIds: [1],
    state: TaskState.ACTIVE,
    index: 2,
  })

  await db.tasks.add({
    title: '摸鱼2个小时',
    content: '',
    projectId: 2,
    tagIds: [1, 2],
    state: TaskState.ACTIVE,
    index: 0,
  })

  await db.projects.add({
    id: 1,
    name: '生活',
  })
  await db.projects.add({
    id: 2,
    name: '工作',
  })
}

async function initData() {
  await initProjectData()
  await initTagData()
}

async function initTagData() {
  const tags = await db.tags.toArray()
  if (tags.length !== 0)
    return
  await db.tags.add({
    id: 1,
    name: '标签1',
    parentTagId: null,
  })
  await db.tags.add({
    id: 2,
    name: '标签2',
    parentTagId: null,
  })
}
