import Fuse from 'fuse.js'
import { ref } from 'vue'
import type { Project } from '@/services/task'
import { TaskState, findAllTasksNotRemoved } from '@/services/task'

interface SearchTaskItem {
  id: number
  title: string
  desc: string
  done: boolean
  from: Project | undefined
}

export const filteredTasks = ref<Fuse.FuseResult<SearchTaskItem>[]>([])
const fuse = new Fuse([] as SearchTaskItem[], {
  keys: ['title', 'desc'],
})

export async function searchTasks(input: string) {
  const rawTasks = await findAllTasksNotRemoved()
  const tasks = rawTasks.map((task) => {
    return {
      id: task.id!,
      title: task.title,
      desc: task.content,
      done: task.state === TaskState.COMPLETED,
      from: task.project,
    }
  })
  fuse.setCollection(tasks)

  filteredTasks.value = fuse.search(input)
}

export function resetSearchTasks() {
  filteredTasks.value = []
}
