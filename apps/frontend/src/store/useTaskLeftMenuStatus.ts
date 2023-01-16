import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskLeftMenuStatusStore = defineStore(
  'TaskLeftMenuStatus',
  () => {
    const visible = ref<Boolean>(true)

    function toggle() {
      visible.value = !visible.value
    }

    return { visible, toggle }
  },
)
