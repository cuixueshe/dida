export interface TaskTable {
  id?: number
  title: string
  content: string
  projectId: number
  tagIds: number[]
  state: number
  index: number
}

export interface ProjectTable {
  id?: number
  name: string
}

export interface TagTable {
  id?: number
  color?: string
  parentTagId: number | null
  name: string
}
