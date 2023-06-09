import Fuse from 'fuse.js'
import { ref } from 'vue'
import { TaskStatus, completeSmartProject, useListProjectsStore, useTasksStore } from '@/store'
import type { TasksSelector } from '@/store'

interface SearchTaskItem {
  id: string
  title: string
  desc: string
  done: boolean
  from: TasksSelector
}

export const filteredTasks = ref<Fuse.FuseResult<SearchTaskItem>[]>([])
const fuse = new Fuse([] as SearchTaskItem[], {
  keys: ['title', 'desc'],
})

export async function searchTasks(input: string) {
  const tasksStore = useTasksStore()
  const projectsStore = useListProjectsStore()
  const rawTasks = await tasksStore.findAllTasksNotRemoved()
  const tasks = rawTasks.map((task) => {
    const done = task.status === TaskStatus.COMPLETED
    const from = done ? completeSmartProject : projectsStore.findProject(task.projectId)
    return {
      id: task.id!,
      title: task.title,
      desc: task.content,
      done,
      from,
    }
  })
  fuse.setCollection(tasks)

  filteredTasks.value = fuse.search(input)
}

export function resetSearchTasks() {
  filteredTasks.value = []
}
