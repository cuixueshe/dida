import type { Table } from 'dexie'
import Dexie from 'dexie'
import type { ProjectTable, TaskTable } from './types'
import { TaskState } from '@/services/task'

export class DexieDB extends Dexie {
  tasks!: Table<TaskTable, number>
  projects!: Table<ProjectTable, number>

  constructor() {
    super('dida')
    this.version(1).stores({
      tasks: '++id, title, content, projectId, state',
      projects: '++id, name',
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

async function initData() {
  const projects = await db.projects.toArray()
  if (projects.length !== 0)
    return

  await db.tasks.add({
    title: '吃饭',
    content: '',
    projectId: 1,
    state: TaskState.ACTIVE,
  })
  await db.tasks.add({
    title: '睡觉',
    content: '',
    projectId: 1,
    state: TaskState.ACTIVE,
  })
  await db.tasks.add({
    title: '写代码',
    content: '',
    projectId: 1,
    state: TaskState.ACTIVE,
  })

  await db.tasks.add({
    title: '摸鱼2个小时',
    content: '',
    projectId: 2,
    state: TaskState.ACTIVE,
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
