import type { Table } from 'dexie'
import Dexie from 'dexie'

export interface Task {
  id?: number
  title: string
  content: string
  projectId: number
  state: number
}

export interface Project {
  id?: number
  name: string
}

export class MySubClassedDexie extends Dexie {
  tasks!: Table<Task>
  projects!: Table<Project>

  constructor() {
    super('myDatabase')
    this.version(1).stores({
      tasks: '++id, title, content, projectId, state',
      projects: '++id, name',
    })
  }
}

let db: MySubClassedDexie
export function initDB() {
  db = new MySubClassedDexie()
}

export function getDB() {
  return db
}

// window.initDB = function () {
//   db.tasks.add({
//     title: '吃饭',
//     content: '',
//     projectId: 1,
//     state: TaskState.ACTIVE,
//   })
//   db.tasks.add({
//     title: '睡觉',
//     content: '',
//     projectId: 1,
//     state: TaskState.ACTIVE,
//   })
//   db.tasks.add({
//     title: '写代码',
//     content: '',
//     projectId: 1,
//     state: TaskState.ACTIVE,
//   })

//   db.tasks.add({
//     title: '摸鱼2个小时',
//     content: '',
//     projectId: 2,
//     state: TaskState.ACTIVE,
//   })

//   db.projects.add({
//     id: 1,
//     name: '生活',
//   })
//   db.projects.add({
//     id: 2,
//     name: '工作',
//   })
// }
