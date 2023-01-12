import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import Fuse from 'fuse.js'
import { useTaskStore } from './useTaskStore'

interface SearchTaskItem {
  id: string
  title: string
  desc: string
  done: boolean
  from: string
}

export const useSearchStore = defineStore('searchStore', () => {
  const taskStore = useTaskStore()

  const allTasks = ref<SearchTaskItem[]>([])

  const searchTasks = ref<Fuse.FuseResult<SearchTaskItem>[]>([])
  // 还未实现后端的逻辑，这里就暂时模拟先收集所有的数据

  const fuse = new Fuse(allTasks.value, {
    keys: ['title', 'desc'],
  })

  watch(() => allTasks.value, (v) => {
    if (v && v.length)
      fuse.setCollection(v)
  }, { immediate: true })
  function collectAllTasks() {
    allTasks.value = []
    taskStore.projects.forEach((project) => {
      project.tasks.forEach((task) => {
        allTasks.value.push({
          id: task.id,
          title: task.title,
          desc: task.content,
          done: false,
          from: project.name,
        })
      })
    })
  }

  collectAllTasks()

  const handleSearch = (input: string) => {
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
