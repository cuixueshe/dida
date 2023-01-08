import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskStatusStore = defineStore(
  'taskStatus',
  () => {
    const selectedKey = ref([101])
    const listDefaultSelectedKey = ref([100])

    function changeSelectedKey(key: number[]) {
      selectedKey.value = key
    }

    return {
      selectedKey,
      listDefaultSelectedKey,
      changeSelectedKey,
    }
  },
)
