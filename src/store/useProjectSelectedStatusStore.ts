import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProjectSelectedStatusStore = defineStore(
  'projectSelectedStatus',
  () => {
    const selectedKey = ref([101])
    const preSelectKey = ref([101])
    const listDefaultSelectedKey = ref([100])

    function changeSelectedKey(key: number[]) {
      selectedKey.value = key
    }

    function changePreSelectKey(key: number[]) {
      preSelectKey.value = key
    }

    return {
      selectedKey,
      preSelectKey,
      listDefaultSelectedKey,
      changeSelectedKey,
      changePreSelectKey,
    }
  },
)
