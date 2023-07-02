import { watchDebounced } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useSearchCommands } from './searchCommands'
import { useSearchTasks } from './searchTasks'
import { delay } from '@/utils'

const search = ref('')
const loading = ref(false)
const searching = ref(false)

let isInitialized = false

export function useSearch() {
  const { resetSearchCommands, searchCommands } = useSearchCommands()
  const { resetSearchTasks, searchTasks } = useSearchTasks()

  function init() {
    if (!isInitialized) {
      isInitialized = true

      watchDebounced(
        () => search.value,
        async (v) => {
          if (v) {
            loading.value = true
            await handleSearch(v)
            loading.value = false
            searching.value = true
          }
        },
        { debounce: 500 },
      )

      watch(
        () => search.value,
        (v) => {
          if (v === '') {
            resetSearch()
            resetSearchCommands()
            resetSearchTasks()
          }
        },
      )
    }
  }

  const isSearchCommand = computed(() => {
    return search.value.startsWith('>')
  })

  function resetSearch() {
    search.value = ''
    loading.value = false
    searching.value = false
  }

  async function handleSearch(input: string) {
    if (isSearchCommand.value) {
      searchCommands(input.trimEnd().slice(1))
    }
    else {
      await delay()
      await searchTasks(input)
    }
  }

  init()

  return {
    loading,
    searching,
    search,
    isSearchCommand,
    resetSearch,
  }
}
