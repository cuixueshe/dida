import ContextMenu from '@imengyu/vue3-context-menu'
import { useTaskOperationMessage } from './useTaskOperationMessage'
import { useTaskStore } from '@/store'

export function useTaskRightContextMenu() {
  const taskStore = useTaskStore()
  const { showRemoveMessage } = useTaskOperationMessage()

  function showContextMenu(e: MouseEvent) {
    e.preventDefault()
    ContextMenu.showContextMenu({
      x: e.x,
      y: e.y,
      items: [
        {
          label: 'remove',
          onClick: () => {
            showRemoveMessage(taskStore.currentActiveTask!)
            taskStore.removeTask(taskStore.currentActiveTask!)
          },
        },
      ],
    })
  }

  return {
    showContextMenu,
  }
}
