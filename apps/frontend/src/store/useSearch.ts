import { defineStore } from 'pinia'
import { ref } from 'vue'
import Fuse from 'fuse.js'
import { TaskState, loadAllTasksNotRemoved } from 'services/task'
import type { Project } from 'services/task'

interface SearchTaskItem {
  id: number
  title: string
  desc: string
  done: boolean
  from: Project | undefined
}

export const useSearchStore = defineStore('searchStore', () => {
  const allTasks = ref<SearchTaskItem[]>([])

  const searchTasks = ref<Fuse.FuseResult<SearchTaskItem>[]>([])

  const fuse = new Fuse(allTasks.value, {
    keys: ['title', 'desc'],
  })

  function collectAllTasks() {
    allTasks.value = []
    return loadAllTasksNotRemoved().then((tasks) => {
      tasks.forEach((task) => {
        allTasks.value.push({
          id: task.id!,
          title: task.title,
          desc: task.content,
          done: task.state === TaskState.COMPLETED,
          from: task.project,
        })
      })
      fuse.setCollection(allTasks.value)
    })
  }

  const handleSearch = async (input: string) => {
    await collectAllTasks()
    searchTasks.value = fuse.search(input)
  }

  const clear = () => {
    searchTasks.value = []
  }

  return {
    searchTasks,
    handleSearch,
    clear,
  }
})
