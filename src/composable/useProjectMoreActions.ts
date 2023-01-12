import { useStorage } from '@vueuse/core'
import { ref } from 'vue'

export function useProjectMoreActions() {
  const showMoreIconIndex = ref<number>(-1)
  const showWitchPopover = ref<number>(-1)
  // 通过修改此数组来展示或隐藏taskList里的某一项,以后在设置页面通过修改此数组来控制
  const canShowTaskList = useStorage('canShowTaskList', [1, 2, 3, 4])

  const openPopover = (key: number) => {
    showWitchPopover.value = key
  }

  const hideTaskItem = (key: number) => {
    if (canShowTaskList.value.includes(key)) {
      canShowTaskList.value = canShowTaskList.value.filter(
        item => item !== key,
      )
    }
    showWitchPopover.value = -1
  }

  const showTaskItem = (key: number) => {
    if (canShowTaskList.value.includes(key))
      return

    canShowTaskList.value.push(key)
  }

  const whetherCanShow = (key: number) => {
    return canShowTaskList.value.includes(key)
  }

  return {
    whetherCanShow,
    showMoreIconIndex,
    showWitchPopover,
    canShowTaskList,
    openPopover,
    hideTaskItem,
    showTaskItem,
  }
}
