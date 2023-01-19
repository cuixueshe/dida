export interface TaskTable {
  id?: number
  title: string
  content: string
  projectId: number
  state: number
}

export interface ProjectTable {
  id?: number
  name: string
}
