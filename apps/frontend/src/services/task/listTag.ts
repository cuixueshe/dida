import type { Repository } from './dbRepository'
import type { TaskTable } from '@/db/types'

export interface Tag {
  id: number
  name: string
  color: string
  parentTagId: number | null
  loadTasks: () => Promise<TaskTable[]>
}

let repository: Repository | undefined
let listTags: Tag[]

export function initListTag(
  listTagReactive: Tag[] = [],
  _repository: Repository,
) {
  repository = _repository
  listTags = listTagReactive
}

export function createListTag(name: string, id = 0, parentTagId: number | null, color?: string): Tag {
  return {
    id,
    name,
    color: color || '',
    parentTagId,
    loadTasks: () => {
      return repository!.getTasksByTagId(id)
    },
  }
}

export async function loadTags() {
  return repository!.loadTags().then((tags) => {
    tags.forEach((tag: any) => {
      listTags.push(createListTag(tag.name, tag.id, tag.color))
    })
  })
}

export async function addListTag(tag: Tag) {
  const pIndex = await repository?.addTag(tag.name, tag.parentTagId, tag.color)

  if (pIndex)
    tag.id = pIndex

  listTags.push(tag)
}

export function findListTagByName(name: string | undefined) {
  if (!name)
    return

  return listTags.find((tag) => {
    return tag.name === name
  })
}
