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

export function createListTag(name: string, color?: string, parentTagId?: number, id = 0): Tag {
  return {
    id,
    name,
    color: color || '',
    parentTagId: parentTagId || null,
    loadTasks: () => {
      return repository!.getTasksByTagId(id)
    },
  }
}

export async function loadTags() {
  return repository!.loadTags().then((tags) => {
    tags.forEach((tag) => {
      listTags.push(createListTag(tag.name, tag.color, tag.parentTagId || undefined, tag.id))
    })
  })
}

export async function addListTag(tag: Tag) {
  const pIndex = await repository?.addTag(tag.name, tag.parentTagId, tag.color)

  if (pIndex)
    tag.id = pIndex

  listTags.push(tag)
}

export function findListTagByProperty(propertyKey: keyof Omit<Tag, 'loadTasks'>) {
  return (value: Tag[typeof propertyKey] | undefined) => {
    if (!value)
      return
    return listTags.find((tag) => {
      return tag[propertyKey] === value
    })
  }
}

export const findListTagByName = findListTagByProperty('name')
export const findListTagById = findListTagByProperty('id')

// export function findListTagByName(name: string | undefined) {
//   if (!name)
//     return

//   return listTags.find((tag) => {
//     return tag.name === name
//   })
// }

export function updateListTag(tag: Omit<Tag, 'loadTasks'>) {
  repository?.updateTag(tag.id, tag)
}
