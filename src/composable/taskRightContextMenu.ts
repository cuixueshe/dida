import ContextMenu from '@imengyu/vue3-context-menu'
import { useTaskStore } from '@/store'

export function useTaskRightContextMenu() {
  const taskStore = useTaskStore()
  function showContextMenu(e: MouseEvent) {
    e.preventDefault()
    ContextMenu.showContextMenu({
      x: e.x,
      y: e.y,
      items: [
        {
          label: 'remove',
          onClick: () => {
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
