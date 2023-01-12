import { onBeforeMount, ref } from 'vue'
import { SmartProjectNames } from '@/services/task/smartProject'

type ShowMoreIconIndex = `${SmartProjectNames}` | ''
type ShowWitchPopover = ShowMoreIconIndex
// 这里只是做了隐藏功能，后续可拓展智能清单其他的actions
export function useProjectMoreActions() {
  const showMoreIconIndex = ref<ShowMoreIconIndex>('')
  const showWitchPopover = ref<ShowWitchPopover>('')
  // 通过修改此数组来展示或隐藏taskList里的某一项,以后在设置页面通过修改此数组来控制，现在先默认展示全部
  const shouldShowTaskList = ref<Array<`${SmartProjectNames}`>>(Object.values(SmartProjectNames))

  const openPopover = (key: `${SmartProjectNames}`) => {
    showWitchPopover.value = key
  }

  const hideTaskItem = (name: `${SmartProjectNames}`) => {
    if (shouldShowTaskList.value.includes(name)) {
      shouldShowTaskList.value = shouldShowTaskList.value.filter(
        item => item !== name,
      )
    }
    showWitchPopover.value = ''
  }
  // TODO: 这里以后通过设置页面拿到应该要展示的智能清单数据，然后处理shouldShowTaskList
  onBeforeMount(() => {

  })

  return {
    showMoreIconIndex,
    showWitchPopover,
    shouldShowTaskList,
    openPopover,
    hideTaskItem,
  }
}
