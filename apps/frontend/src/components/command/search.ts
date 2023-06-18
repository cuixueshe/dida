import { watchDebounced } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useSearchCommands } from './searchCommands'
import { useSearchTasks } from './searchTasks'
import { delay } from '@/utils'

const { resetSearchCommands, searchCommands } = useSearchCommands()
const { resetSearchTasks, searchTasks } = useSearchTasks()

const search = ref('')
const loading = ref(false)
const searchIng = ref(false)
const isSearchCommand = computed(() => {
  return search.value.startsWith('>')
})

watchDebounced(
  () => search.value,
  async (v) => {
    if (v) {
      loading.value = true
      await handleSearch(v)
      loading.value = false
      searchIng.value = true
    }
  },
  { debounce: 500 },
)

watch(
  () => search.value,
  (v) => {
    if (v === '') {
      searchIng.value = false
      resetSearchCommands()
      resetSearchTasks()
    }
  },
)

function resetSearch() {
  search.value = ''
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

export function useSearch() {
  return {
    loading,
    searchIng,
    search,
    isSearchCommand,
    resetSearch,
  }
}
